async function cargar(app, cliente, jwt) {
    app.get('/Commentactivity', (req, res) => {
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
                    cliente.query('select * from tblcommentactivity')
                        .then(response => {
                            res.json({
                                commentactivity: response.rows,
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

    app.get('/Commentactivity/:id', (req, res) => {
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
                    cliente.query('select * from tblcommentactivity where id=$1', [req.params.id])
                        .then(response => {
                            if (response.rowCount == 1) {
                                res.json({
                                    commentactivity: response.rows[0],
                                    login: true
                                });
                            } else {
                                res.json({
                                    commentactivity: null,
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

    app.delete('/Commentactivity/:id', (req, res) => {
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
                    cliente.query('delete from tblcommentactivity where id=$1', [req.params.id])
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


    app.post('/Commentactivity', (req, res) => {
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
                    cliente.query('insert into tblcommentactivity (comment, datcomactivity,idactiviti_id,idstudent_id) values($1,$2,$3,$4);', [req.body.comment, req.body.datcomactivity, req.body.idactiviti_id, req.body.idstudent_id])
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

    app.put('/Commentactivity', (req, res) => {
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
                    cliente.query('update tblcommentactivity set comment=$1, datcomactivity=$2,idactiviti_id=$3,idstudent_id=$4 where id=$5', [req.body.comment, req.body.datcomactivity, req.body.idactiviti_id, req.body.idstudent_id, req.body.id])
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