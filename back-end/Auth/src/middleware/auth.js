const {verifyToken} = require("../utils/auth");

// Apply authorization
module.exports = (req, res, next) =>{
    const authHeader = req.header("Authorization");
    //check if auth header exist
    if (!authHeader){
        return res.status(401).send({
            error: "No authorization header"
        });
    }

    const authHeaderContent = authHeader.split(" ");
    //check if auth header content correct
    if (authHeaderContent.length !== 2 || authHeaderContent[0] !== "Bearer"){
        return res.status(401).send({
            error: "Authorization header invalid"
        });
    }

    const decode = verifyToken(authHeaderContent[1]);
    //check if token can be decode correctly
    if (!decode){
        return res.status(401).send({
            error: "Token verification failed"
        });
    }

    //decoded payload attached to request for further user role checking
    req.user = decode;
    next();
};
