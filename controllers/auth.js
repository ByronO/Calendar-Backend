const { response } = require('express');

const createUser = (req, res = response) => {

    const { name, email, password } = req.body;

    res.send({ 
        ok: true, 
        msg: 'register', 
        name, 
        email, 
        password 
    });
}

const login = (req, res = response) => {

    const { email, password } = req.body;

    res.send({ 
        ok: true, 
        msg: 'login', 
        email, 
        password 
    });
}

const renewToken = (req, res = response) => {
    res.send({ ok: true, msg: 'renew' });
}

module.exports = { createUser, login, renewToken }