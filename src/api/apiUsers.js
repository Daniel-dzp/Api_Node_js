async function cargar(app, cliente, jwt) {
    app.get('/Users', (req, res) => {
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
                    cliente.query('select * from tblusers')
                        .then(response => {
                            res.json({
                                users: response.rows,
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

    app.get('/Users/:id', (req, res) => {
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
                    cliente.query('select * from tblusers where id=$1', [req.params.id])
                        .then(response => {
                            if (response.rowCount == 1) {
                                res.json({
                                    users: response.rows[0],
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

    app.delete('/Users/:id', (req, res) => {
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
                    cliente.query('delete from tblusers where id=$1', [req.params.id])
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


    app.post('/Users', (req, res) => {
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
                    cliente.query('insert into tblusers (name, lastname, birdate, password, email,idtype_id) values($1,$2,$3,$4,$5,$6);', [req.body.name, req.body.lastname, req.body.birdate, req.body.password, req.body.email, req.body.idtype_id])
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

    app.put('/Users', (req, res) => {
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
                    cliente.query('update tblusers set name=$1, lastname=$2, birdate=$3, password=$4, email=$5,idtype_id=$6 where id=$7', [req.body.name, req.body.lastname, req.body.birdate, req.body.password, req.body.email, req.body.idtype_id, req.body.id])
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