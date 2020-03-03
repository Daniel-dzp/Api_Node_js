async function cargar(app, cliente, jwt) {
    app.get('/Delivery', (req, res) => {
        var token = req.headers['authorization'];

        if (token) {
            token = token.replace('Bearer ', '');
            jwt.verify(token, app.get('llave'), function(err, user) {
                if (err) {
                    res.status(401).send({
                        error: 'Token inválido',
                        login: false
                    });
                } else {
                    cliente.query('select * from tbldelivery')
                        .then(response => {
                            res.json({
                                delivery: response.rows,
                                login: true
                            });
                        })
                        .catch(err => {
                            res.json({ login: true, mensaje: "Error" });
                        })
                }
            });

        } else {
            res.status(401).send({
                error: "Es necesario el token de autenticación"
            });
        }
    });

    app.get('/Delivery/:id', (req, res) => {
        var token = req.headers['authorization'];

        if (token) {
            token = token.replace('Bearer ', '');
            jwt.verify(token, app.get('llave'), function(err, user) {
                if (err) {
                    res.status(401).send({
                        error: 'Token inválido',
                        login: false
                    });
                } else {
                    cliente.query('select * from tbldelivery where id=$1', [req.params.id])
                        .then(response => {
                            if (response.rowCount == 1) {
                                res.json({
                                    delivery: response.rows[0],
                                    login: true
                                });
                            } else {
                                res.json({
                                    delivery: null,
                                    login: true
                                });
                            }
                        })
                        .catch(err => {
                            res.json({ login: true, mensaje: "Error" });
                        })
                }
            });

        } else {
            res.status(401).send({
                login: false,
                error: "Es necesario el token de autenticación"
            });
        }
    });

    app.delete('/Delivery/:id', (req, res) => {
        var token = req.headers['authorization'];

        if (token) {
            token = token.replace('Bearer ', '');
            jwt.verify(token, app.get('llave'), function(err, user) {
                if (err) {
                    res.status(401).send({
                        error: 'Token inválido',
                        login: false
                    });
                } else {
                    cliente.query('delete from tbldelivery where id=$1', [req.params.id])
                        .then(response => {
                            res.json({
                                mensaje: "Eliminado correctamente.",
                                login: true
                            });
                        })
                        .catch(err => {
                            res.json({ login: true, mensaje: "Error" });
                        })
                }
            });

        } else {
            res.status(401).send({
                login: false,
                error: "Es necesario el token de autenticación"
            });
        }
    });


    app.post('/Delivery', (req, res) => {
        var token = req.headers['authorization'];

        if (token) {
            token = token.replace('Bearer ', '');
            jwt.verify(token, app.get('llave'), function(err, user) {
                if (err) {
                    res.status(401).send({
                        error: 'Token inválido',
                        login: false
                    });
                } else {
                    cliente.query('insert into tbldelivery (file, datdelivery,idstudent_id,idactiviti_id) values($1,$2,$3,$4);', [req.body.file, req.body.datdelivery, req.body.idstudent_id, req.body.idactiviti_id])
                        .then(response => {
                            res.json({
                                mensaje: "Insertado correctamente.",
                                login: true
                            });
                        })
                        .catch(err => {
                            res.json({ login: true, mensaje: "Error" });
                        })
                }
            });

        } else {
            res.status(401).send({
                login: false,
                error: "Es necesario el token de autenticación"
            });
        }
    });

    app.put('/Delivery', (req, res) => {
        var token = req.headers['authorization'];

        if (token) {
            token = token.replace('Bearer ', '');
            jwt.verify(token, app.get('llave'), function(err, user) {
                if (err) {
                    res.status(401).send({
                        error: 'Token inválido',
                        login: false
                    });
                } else {
                    cliente.query('update tbldelivery set file=$1, datdelivery=$2,idstudent_id=$3,idactiviti_id=$4 where id=$5', [req.body.file, req.body.datdelivery, req.body.idstudent_id, req.body.idactiviti_id, req.body.id])
                        .then(response => {
                            res.json({
                                mensaje: "Actualizado correctamente.",
                                login: true
                            });
                        })
                        .catch(err => {
                            res.json({ login: true, mensaje: "Error" });
                        })
                }
            });

        } else {
            res.status(401).send({
                login: false,
                error: "Es necesario el token de autenticación"
            });
        }
    });

}

module.exports = {
    cargar: cargar
}