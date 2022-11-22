const { Schema, model } = require('mongoose');
//Se definen los atributos que contendrá la tabla o modelo Reserva en la base de datos 
const ReservaSchema = Schema({
    factura:{
        type: Number,
        required: true,
        unique: true
    },
    valorXminuto:{
        type: Number,
        required: true,
    },
    valorPagar:{
        type: Number,
    },
    tiempoTotal:{
        type: Number,
    },
    cupodispo:{
        type: Number,
        require: true,
    },
    fechaIngreso:{
        type: Date,
        required: true,
    },
    fechaSalida:{
        type: Date,
    },
     //Los siguientes son atributos referenciados de otros modelos
     conductor:{
        type: Schema.Types.ObjectId,
        ref: 'Conductores',
        required: true,
    },
    vehiculo:{
        type: Schema.Types.ObjectId,
        ref: 'Vehiculos',
        required: true,
    }

});

module.exports = model('Reserva', ReservaSchema);