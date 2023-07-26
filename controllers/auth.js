const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
    const { email, password } = req.body;

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

        //Generate JWT
        const token = await generateJWT(user.id, user.name);

        res.status(201).send({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            ok: false,
            msg: "Error creating user",
        });
    }
};

const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({
                ok: false,
                msg: "User and password do not match",
            });
        }

        //Confirm password
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).send({
                ok: false,
                msg: "User and password do not match",
            });
        }

        //Generate JWT
        const token = await generateJWT(user.id, user.name);

        res.send({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            ok: false,
            msg: "Error logging in",
        });
    }
};

const renewToken = async (req, res = response) => {
    const {uid, name} = req;

    //Generate JWT
    const token = await generateJWT(uid, name);

    res.send({ 
        ok: true,
        token
    });
};

module.exports = { createUser, login, renewToken };
