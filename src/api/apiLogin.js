async function cargar(app, cliente, jwt) {
    app.post('/login', (req, res) => {
        cliente.query('select * from tblusers u inner join tblusertype t on t.id=u.idtype_id where u.email=$1 and password=$2', [req.body.email, req.body.password])
            .then(response => {
                if (response.rows.length > 0) {
                    const payload = {
                        id_user: response.rows[0].id,
                        user: response.rows[0].name,
                        type: response.rows[0].idtype_id,
                        typeString: response.rows[0].description,
                    };
                    const token = jwt.sign(payload, app.get('llave'), {
                        expiresIn: 1440
                    });
                    res.json({
                        login: true,
                        mensaje: 'Autenticación correcta',
                        token: token
                    });
                } else {
                    res.json({ login: false, mensaje: "Usuario o contraseña incorrectos" });
                }
                //cliente.end()
            })
            .catch(err => {
                res.json({ login: false, mensaje: "Error de base de datos" });
                //cliente.end()
            })
    });

}

module.exports = {
    cargar: cargar
}