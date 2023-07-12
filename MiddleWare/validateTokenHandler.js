const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    var authHeader = req.headers.Authorization || req.headers.authorization;

    if (
        authHeader &&
        (authHeader.startsWith("Bearer") || authHeader.startsWith("bearer"))
    ) {
        var token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, decodeInformation) => {
            if (err) {
                res.status(401);
                throw new Error("User not authorized");
            }

            req.user = decodeInformation.user;
            next();
        });

    } else {
        res.status(401);
        throw new Error("User not authorized");
    }

});

module.exports = validateToken;
