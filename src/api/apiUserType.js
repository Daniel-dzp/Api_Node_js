async function cargar(app, cliente, jwt) {
    app.get('/UserType', (req, res) => {
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
                    cliente.query('select * from tblusertype')
                        .then(response => {
                            res.json({
                                usertype: response.rows,
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

    app.get('/UserType/:id', (req, res) => {
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
                    cliente.query('select * from tblusertype where id=$1', [req.params.id])
                        .then(response => {
                            if (response.rowCount == 1) {
                                res.json({
                                    usertype: response.rows[0],
                                    login: true
                                });
                            } else {
                                res.json({
                                    usertype: null,
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

    app.delete('/UserType/:id', (req, res) => {
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
                    cliente.query('delete from tblusertype where id=$1', [req.params.id])
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


    app.post('/UserType', (req, res) => {
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
                    cliente.query('insert into tblusertype (description) values($1);', [req.body.description])
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

    app.put('/UserType', (req, res) => {
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
                    cliente.query('update tblusertype set description=$1 where id=$2', [req.body.description, req.body.id])
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