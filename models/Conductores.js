const { Schema, model } = require('mongoose');
//Se definen los atributos que contendrá la tabla o modelo Conductores en la base de datos 
const ConductorSchema = Schema({
    nombre:{
        type: String,
        required: true,
    },
    cedula:{
        type: Number,
        required: true,
        unique: true
    },
    correo:{
        type: String,
        required: true,
        unique: true
    },
    celular:{
        type: Number,
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

module.exports = model('Conductor', ConductorSchema);