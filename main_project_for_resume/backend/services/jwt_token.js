const jwt = require("jsonwebtoken");
const secret = "pokemon" ;
const cookie = require("cookies");

function createToken(user){
    const payload = {
        _id : user.id ,
        email : user.email ,
    }

    const token  = jwt.sign(payload,secret);

    return token ;
}

function verifyToken(token){
    const payload = jwt.verify(token,secret);
    return payload ;
}

module.exports = {
    createToken,
    verifyToken,
}
