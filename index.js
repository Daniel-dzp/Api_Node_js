const express = require('express'),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    config = require('./src/config/config.js'),
    app = express(),
    db = require('./src/DB.js'),

    apiLogin = require('./src/api/apiLogin.js'),
    apiUserType = require('./src/api/apiUserType.js'),
    apiUsers = require('./src/api/apiUsers.js'),
    apiCommentadvertisement = require('./src/api/apiCommentadvertisement.js'),
    apiCommentactivity = require('./src/api/apiCommentactivity.js'),
    apiDelivery = require('./src/api/apiDelivery.js'),
    apiActivities = require('./src/api/apiActivities.js'),
    apiAdvertisement = require('./src/api/apiAdvertisement.js'),
    apiCourse = require('./src/api/apiCourse.js'),
    apiShedule = require('./src/api/apiShedule.js');

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
    apiUsers.cargar(app, cliente, jwt);
    apiCommentadvertisement.cargar(app, cliente, jwt);
    apiCommentactivity.cargar(app, cliente, jwt);
    apiDelivery.cargar(app, cliente, jwt);
    apiActivities.cargar(app, cliente, jwt);
    apiAdvertisement.cargar(app, cliente, jwt);
    apiCourse.cargar(app, cliente, jwt);
    apiShedule.cargar(app, cliente, jwt);
});