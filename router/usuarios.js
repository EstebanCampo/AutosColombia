//Se importa el servidor web con sus rutas y el modelo correspondiente
const { Router } = require('express');
const  { jwtValidate } = require("../middlewares/jwt-validator");
const Usuario = require('../models/Usuarios');
const router = Router();

//Método para crear Usuario
router.post('/', async function (req, res) {
    //Se utiliza un bloque try catch para manejo o control de excepciones
    try { 
        //Se valida que la cedula del usuario no exista
        const existecedula = await Usuario.findOne({ cedula: req.body.cedula });
        if (existecedula) {
            return res.status(400).send('Error, la cedula del usuario ya existe');}

        //Se setean los valores que vienen en el body
        let usuario = new Usuario();
        usuario.nombre = req.body.nombre;
        usuario.cedula = req.body.cedula;
        usuario.contraseña = req.body.contraseña;
        usuario.cargo = req.body.cargo;
        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();

         //Se guardan los valores en la base de datos
         usuario = await usuario.save();
         res.send('Usuario creado correctamente')

        } catch (error) {
            console.log(error);
            res.status(500).send('Ocurrió un error al crear el usuario');
    
        }

    });

//Método para obtener o listar usuarios
router.get('/', [jwtValidate], async function (req, res) {
    //Se usa un try catch para manejo de errores o excepciones
    try {
        //Se buscan todos los usuarios
        const usuarios = await Usuario.find();
        //Se listan todos los usuarios
        res.send(usuarios);

    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrió un error al listar los usuarios");
    }
});

//Método para actualizar un usuario
router.put('/:usuarioId', [jwtValidate], async function (req, res) {

    //Se usa un try catch para manejo de errores o excepciones
    try {

        //Se valida que el usuario a actualizar por id si exista
        let usuario = await Usuario.findById(req.params.usuarioId );
        if (!usuario) {
            return res.status(400).send('Error, el usuario a actualizar no existe');
        }

        //Se valida que el usuario por el que se va a ctualizar no exista ya
        const existecedula = await Usuario.findOne({ cedula: req.body.cedula, _id: { $ne: usuario.id } });
        if (existecedula) {
            return res.status(400).send('Error, la cedula ingresada ya existe');
        }

        //Se setean los valores que vienen en el body
        usuario.nombre = req.body.nombre;
        usuario.cedula = req.body.cedula;
        usuario.contraseña = req.body.contraseña;
        usuario.cargo = req.body.cargo;
        usuario.fechaActualizacion = new Date();

        //Se guardan los valores en la base de datos
        usuario = await usuario.save();

        res.send('Usuario actualizado correctamente');

    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrió un error al actualizar el usuario");

    }
});
module.exports = router;