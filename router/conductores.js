//Se importa el servidor web con sus rutas y el modelo correspondiente
const { Router } = require('express');
const  { jwtValidate } = require("../middlewares/jwt-validator");
const Conductor = require('../models/Conductores');
const router = Router();

//Método para crear conductor
router.post('/', [jwtValidate], async function (req, res) {
    //Se utiliza un bloque try catch para manejo o control de excepciones
    try {
        //conductor 
        //Se valida que el conductor no exista
        const existecedula = await Conductor.findOne({ cedula: req.body.cedula });
        const existecorreo = await Conductor.findOne({ correo: req.body.correo });
        if (existecedula) {
            return res.status(400).send('Error, la cedula del conductor ya existe');
        } if (existecorreo) {
            return res.status(400).send('Error, el correo ingresado ya existe');
        }

        //Se setean los valores que vienen en el body
        let conductor = new Conductor();
        conductor.nombre = req.body.nombre;
        conductor.cedula = req.body.cedula;
        conductor.correo = req.body.correo;
        conductor.celular = req.body.celular;
        conductor.fechaCreacion = new Date();
        conductor.fechaActualizacion = new Date();

         //Se guardan los valores en la base de datos
         conductor = await conductor.save();
         res.send('Conductor creado correctamente')

        } catch (error) {
            console.log(error);
            res.status(500).send('Ocurrió un error al crear conductor');
    
        }

    });

//Método para obtener o listar conductores
router.get('/', [jwtValidate], async function (req, res){
    //Se usa un try catch para manejo de errores o excepciones
    try {
        //Se buscan todos los conductores
        const conductores = await Conductor.find();
        //Se listan todos los conductores
        res.send(conductores);

    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrió un error al listar los conductores");
    }
});

//Método para actualizar un conductor
router.put('/:conductorId',[jwtValidate], async function (req, res) {

    //Se usa un try catch para manejo de errores o excepciones
    try {

        //Se valida que el conductor a actualizar por id si exista
        let conductor = await Conductor.findById(req.params.conductorId );
        if (!conductor) {
            return res.status(400).send('Error, el conductor a actualizar no existe');
        }

        //Se valida que el conductor por el que se va a ctualizar no exista ya
        const existecedula = await Conductor.findOne({ cedula: req.body.cedula, _id: { $ne: conductor.id } });
        const existecorreo = await Conductor.findOne({ correo: req.body.correo, _id: { $ne: conductor.id } });
        if (existecedula) {
            return res.status(400).send('Error, la cedula ingresada ya existe');
        } if (existecorreo) {
            return res.status(400).send('Error, el correo ingresado ya existe');
        }

        //Se setean los valores que vienen en el body
        conductor.nombre = req.body.nombre;
        conductor.cedula = req.body.cedula;
        conductor.correo = req.body.correo;
        conductor.celular = req.body.celular;
        conductor.fechaActualizacion = new Date();

        //Se guardan los valores en la base de datos
        conductor = await conductor.save();

        res.send('Conductor actualizado correctamente');

    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrió un error al actualizar el conductor");

    }
});
module.exports = router;