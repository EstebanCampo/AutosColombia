//Importamos express para servidor web
const express = require('express');

//Importamos dependencias para autenticacion
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');

//definimos puerto de servidor web
const port = 3000;

//definimos conexión con base de datos
const { getConnection } = require('./db/db-connection');

//Importamos cors
const cors = require('cors');

//Inicando servidor web
const app = express();

app.use(session({
    secret: "API AutosColombia",
    resave: true,
    saveUninitialized: true
}))

//Middlewares

//Implementamos cors
app.use(cors());
//Parseo JSON
app.use(express.json());
app.use(methodOverride());
app.use(bodyParser.urlencoded({ extended: false }))

//Definiendo rutas modelos
app.use('/conductores', require('./router/conductores'));
app.use('/vehiculos', require('./router/vehiculos'));
app.use('/reservas', require('./router/reservas'));
app.use('/usuarios', require('./router/usuarios'));
app.use('/login', require('./router/user-auth'));

//Subiendo servidor web
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

//Iniciando conexión con base de datos
getConnection();

