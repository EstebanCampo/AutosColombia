//Se importa el servidor web con sus rutas y los modelos correspondientes
const { Router } = require('express');
const  { jwtValidate } = require("../middlewares/jwt-validator");
const router = Router();
const Reservas = require('../models/Reserva');
const Conductor = require('../models/Conductores');
const Vehiculo = require('../models/Vehiculos');
//contador numero de factura
let factura = 1;
//contador cupodisponible
let cupodisponible = 40;

//Método para crear una nueva reserva
router.post('/', [jwtValidate], async function (req, res) {


    try {
        //Se valida que el numero de factura no exista
        const existefactura = await Reservas.findOne({ factura: req.body.factura });
        if (existefactura) {
            return res.status(400).send('Error, el número de factura  ya existe');
        }

        //Se setean los valores que vienen en el body de reserva
        let reserva = new Reservas();
        reserva.factura = factura;
        reserva.cupodispo = cupodisponible-1;
        reserva.conductor = req.body.conductor;
        reserva.vehiculo = req.body.vehiculo;
        reserva.valorXminuto = req.body.valorXminuto;
        reserva.fechaIngreso = new Date();
    

        //Se guardan los valores en la base de datos
        reserva = await reserva.save();

        res.send('Reserva registrada correctamente');
        factura = factura + 1;
        cupodisponible = cupodisponible - 1;

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al registrar la reserva');

    }

});

//Método para listar reservas
router.get('/', [jwtValidate], async function (req, res) {
    //Se utiliza un bloque try catch para manejo o control de excepciones
    try {
        //Se buscan todas las reservas
        const reservas = await Reservas.find();
        //Se listan todas las reservas
        res.send(reservas);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al consultar las reservas');

    }
});

//Método para actualizar/finalizar una reserva
router.put('/:reservaId', [jwtValidate], async function (req, res) {

    //Se usa un try catch para manejo de errores o excepciones
    try {

        //Se valida que la reserva a actualizar por factura si exista
        let reserva = await Reservas.findById(req.params.reservaId);
        if (!reserva) {
            return res.status(400).send('Error, la reserva a actualizar no existe');
        }

        //Se setean los valores que vienen en el body
        reserva.factura = reserva.factura;
        reserva.cupodispo = cupodisponible+1;
        reserva.conductor = req.body.conductor;
        reserva.vehiculo = req.body.vehiculo;
        reserva.valorXminuto = req.body.valorXminuto;
        reserva.pago = req.body.pago;
        reserva.fechaIngreso = reserva.fechaIngreso;
        reserva.fechaSalida = new Date();

        //funcion para mostrar fecha ingreso y salida
        tiempoIngreso = reserva.fechaIngreso.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
         }); 
         tiempoSalida = reserva.fechaSalida.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
         }); 

         //calculando diferencia de tiempo en minutos
        let dif = (reserva.fechaSalida-reserva.fechaIngreso);        
        dif = ((dif/1000)/60)

        //guardando tiempo total en minutos
        reserva.tiempoTotal = Math.round(dif);

        console.log(dif);
        console.log(reserva.tiempoTotal);

        //calculando valor a pagar
        let total = (reserva.tiempoTotal * reserva.valorXminuto);

        reserva.valorPagar = total;

        console.log(reserva.valorPagar);

        //calculando cambio
        let cambio = (reserva.pago - reserva.valorPagar);
        console.log(cambio);
        //validando pago suficiente
        if (cambio < 0) {
            //se multiplica por -1para indicar cuanto falta por pagar
            cambio = cambio * -1
            return res.status(400).send('Error, pago insuficiente, faltan ' + cambio + ' ya que el total son: ' + total  );
            
        }
        reserva.cambio = cambio;

        res.send('Reserva finalizada con exito, el cambio a devolver es: ' + cambio);
        //res.send('Reserva finaliza correctamente');

        //Se guardan los valores en la base de datos
        reserva = await reserva.save();
        cupodisponible = cupodisponible + 1;

    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrió un error al actualizar la reserva");

    }
});
module.exports = router;