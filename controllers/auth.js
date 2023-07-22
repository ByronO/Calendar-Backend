const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const createUser = async (req, res = response) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).send({
                ok: false,
                msg: "Email already exists",
            });
        }

        user = new User(req.body);

        //Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        res.status(201).send({
            ok: true,
            uid: user.id,
            name: user.name,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            ok: false,
            msg: "Email already exists",
        });
    }
};

const login = (req, res = response) => {
    const { email, password } = req.body;

    res.send({
        ok: true,
        msg: "login",
        email,
        password,
    });
};

const renewToken = (req, res = response) => {
    res.send({ ok: true, msg: "renew" });
};

module.exports = { createUser, login, renewToken };
