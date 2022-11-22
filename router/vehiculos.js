//Se importa el servidor web con sus rutas y el modelo correspondiente
const { Router } = require('express');
const  { jwtValidate } = require("../middlewares/jwt-validator");
const Vehiculo = require('../models/Vehiculos');
const router = Router();

//Método para crear vehiculo
router.post('/', [jwtValidate], async function (req, res) {
    //Se utiliza un bloque try catch para manejo o control de excepciones
    try {
        //Se valida que el vehciulo no exista
        const existeplaca = await Vehiculo.findOne({ placa: req.body.placa });
        if (existeplaca) {
            return res.status(400).send('Error, la placa del vehiculo ya existe');
        }

        //Se setean los valores que vienen en el body
        let vehiculo = new Vehiculo();
        vehiculo.placa = req.body.placa;
        vehiculo.marca = req.body.marca;
        vehiculo.color = req.body.color;
        vehiculo.fechaCreacion = new Date();
        vehiculo.fechaActualizacion = new Date();

        //Se guardan los valores en la base de datos
        vehiculo = await vehiculo.save();

        res.send('Vehiculo creado correctamente');

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear vehiculo');

    }

});


//Método para obtener o listar vehiculos
router.get('/', [jwtValidate], async function (req, res) {
    //Se usa un try catch para manejo de errores o excepciones
    try {
        //Se buscan todos los vehiculos
        const vehiculos = await Vehiculo.find();
        //Se listan todos los vehiculos
        res.send(vehiculos);

    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrió un error al listar los vehiculos");
    }
});

//Método para actualizar un vehiculo
router.put('/:vehiculoId', [jwtValidate], async function (req, res) {

    //Se usa un try catch para manejo de errores o excepciones
    try {

        //Se valida que el vehiculo a actualizar por id si exista
        let vehiculo = await Vehiculo.findById(req.params.vehiculoId);
        if (!vehiculo) {
            return res.status(400).send('Error, el vehiculo a actualizar no existe');
        }

        //Se valida que el vehiculo por el que se va a ctualizar no exista ya
        const existevehiculo = await Vehiculo.findOne({ placa: req.body.placa, _id: { $ne: vehiculo.id } });
        if (existevehiculo) {
            return res.status(400).send('Error, la placa ingresada ya existe');
        }

        //Se setean los valores que vienen en el body
        vehiculo.placa = req.body.placa;
        vehiculo.marca = req.body.marca;
        vehiculo.color = req.body.color;
        vehiculo.fechaActualizacion = new Date();

        //Se guardan los valores en la base de datos
        vehiculo = await vehiculo.save();

        res.send('Vehiculo actualizado correctamente');

    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrió un error al actualizar el vehiculo");

    }
});
module.exports = router;