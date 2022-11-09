//Importamos express para servidor web
const express = require ('express');
//definimos puerto de servidor web
const port = 3000;

//definimos conexión con base de datos
const {getConnection} = require('./db/db-connection');

//Importamos cors
const cors = require('cors');

//Inicando servidor web
const app = express();

//Parseo JSON
app.use(express.json());

//Implementamos cors
app.use(cors());

//Definiendo rutas modelos
app.use('/conductores', require ('./router/conductores'));
app.use('/vehiculos', require ('./router/vehiculos'));
app.use('/reservas', require ('./router/reservas'));

//Subiendo servidor web
app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`);
})

//Iniciando conexión con base de datos
getConnection();