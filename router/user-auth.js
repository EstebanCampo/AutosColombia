const { Router } = require('express');
const router = Router();
const Usuarios = require('../models/Usuarios');
const session = require ('express-session');
const { jwtGenerator } = require('../helpers/JWT');

router.post('/', async function(req, res){

    try {
        //validamos que el usuario (cedula) exista
        const userFound = await Usuarios.findOne({ cedula: req.body.cedula });
        if(!userFound){
            return res.status(404).json({message: "Cedula o contraseña incorrecta"})
        }
        //valilamos que la clave sea correcta
        if(req.body.contraseña != userFound.contraseña){
            return res.status(404).json({ message: "Cedula o contraseña incorrecta" })
        }

        const token = jwtGenerator(userFound);   
        //Seteando atributos
        session.user = userFound;
        session.nombre = req.body.nombre;
        session.cargo = req.body.cargo;
        session.id = userFound._id;
        
        res.json({
            _id:userFound._id,
            cedula: userFound.cedula,
            nombre: userFound.nombre,
            cargo: userFound.cargo,
            accessToken: token
        });
    } catch (error) {

        console.log(error);
        res.status(500).json({ message: "Internal server error..."})
        
    }

});
module.exports = router;