var jwt = require('jsonwebtoken');

const isToken = async (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    const UNIQUE_KEY = 'Darshan9970' 
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, UNIQUE_KEY);
        req.user = data;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}


module.exports = isToken;