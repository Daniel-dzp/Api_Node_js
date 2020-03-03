async function cargar(app, cliente, jwt) {
    app.get('/Advertisement', (req, res) => {
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
                    cliente.query('select * from tbladvertisement')
                        .then(response => {
                            res.json({
                                advertisement: response.rows,
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

    app.get('/Advertisement/:id', (req, res) => {
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
                    cliente.query('select * from tbladvertisement where id=$1', [req.params.id])
                        .then(response => {
                            if (response.rowCount == 1) {
                                res.json({
                                    advertisement: response.rows[0],
                                    login: true
                                });
                            } else {
                                res.json({
                                    advertisement: null,
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

    app.delete('/Advertisement/:id', (req, res) => {
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
                    cliente.query('delete from tbladvertisement where id=$1', [req.params.id])
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


    app.post('/Advertisement', (req, res) => {
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
                    cliente.query('insert into tbladvertisement (notice,datadvertisement,idcourse_id) values($1,$2,$3);', [req.body.notice, req.body.datadvertisement, req.body.idcourse_id])
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

    app.put('/Advertisement', (req, res) => {
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
                    cliente.query('update tbladvertisement set notice=$1,datadvertisement=$2,idcourse_id=$3 where id=$4', [req.body.notice, req.body.datadvertisement, req.body.idcourse_id, req.body.id])
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