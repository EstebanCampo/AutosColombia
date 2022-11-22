const { Schema, model } = require('mongoose');
//Se definen los atributos que contendrá la tabla o modelo Usuarios en la base de datos 
const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required: true,
    },
    cedula:{
        type: Number,
        required: true,
        unique: true
    },
    contraseña:{
        type: String,
        required: true,
    },
    cargo:{
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

module.exports = model('Usuario', UsuarioSchema);