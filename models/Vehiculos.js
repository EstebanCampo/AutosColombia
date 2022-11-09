const { Schema, model } = require('mongoose');
//Se definen los atributos que contendrá la tabla o modelo Vehiculos en la base de datos 
const VehiculoSchema = Schema({
    placa:{
        type: String,
        required: true,
        unique: true
    },
    marca:{
        type: String,
        required: true,
    },
    color:{
        type: String,
        required: true,
    },
    fechaCreacion:{
        type: Date,
        required: true,
    },
    fechaActualizacion:{
        type: Date,
        required: true,
    }

});

module.exports = model('Vehiculo', VehiculoSchema);