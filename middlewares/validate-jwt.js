const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req, res = response, next) => {
    const token = req.header("x-token");
    if (!token) {
        return res.status(401).send({
            ok: false,
            msg: "The token doesn't exist, authorization denied",
        });
    }

    try {
        const { uid, name } = jwt.verify(
            token, 
            process.env.SECRET_JWT_SEED
        );

        req.uid = uid;
        req.name = name;

    } catch (error) {
        return res.status(401).send({
            ok: false,
            msg: "The token is invalid",
        });
    }

    next();
};

module.exports = {
    validateJWT,
};
