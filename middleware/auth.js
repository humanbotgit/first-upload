const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        return next(error);
    }

    const token = authHeader.split(' ')[1];
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, 'secretfortoken');
    } catch (err) {
        err.statusCode = 500;
        return next(err);
    }

    if (!decodedToken) {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        return next(error);
    }

    
    req.jwtDecodedToken = decodedToken;

    req.isLoggedIn = true;
    req.DNI_Docente = decodedToken.DNI_Docente;
    req.Correo = decodedToken.Correo;
    next();
};
