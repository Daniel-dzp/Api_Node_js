const { Client } = require('pg');

const connectionData = {
    user: 'postgres',
    host: 'localhost',
    database: 'api_moviles_db',
    password: '1234',
    port: 5432,
}

function conexion() {
    return new Client(connectionData);
}

module.exports = {
    conexion: conexion,
}