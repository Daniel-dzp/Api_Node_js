const express = require('express'),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    config = require('./src/config/config.js'),
    app = express(),
    db = require('./src/DB.js'),

    apiLogin = require('./src/api/apiLogin.js'),
    apiUserType = require('./src/api/apiUserType.js');

app.set('llave', config.llave);

// Iniciar servidor
app.use(bodyParser.urlencoded({ extended: true })); // 3
app.use(bodyParser.json()); // 4
app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');

    // iniciar db
    var cliente = db.conexion();
    cliente.connect()

    // cargar
    apiLogin.cargar(app, cliente, jwt);
    apiUserType.cargar(app, cliente, jwt);
});