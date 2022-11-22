const JWT = require('jsonwebtoken');

const jwtGenerator = (user) =>{
    const payload = {
        _id: user._id,
        nombre: user.nombre,
        cedula: user.cedula,
        cargo: user.cargo
    };

    const token = JWT.sign(payload,
                        '4UT0SC-V1',
                        {expiresIn: '1h' });

    return token;
}

module.exports = {jwtGenerator};