const jwt = require('jsonwebtoken');
const verifyJWT = (req, res, next) => {
   try {
    console.log(req);
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader) {
        return res.status(401).json({error: 'No token provided'});
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log(err.message);
            return res.status(403).json({error: 'Invalid token', message: err.message});
        }
        console.log("user: " + user);
        req.user = user;
        next();
    });
   }
   catch (err) {
       console.log(err.message);
       return res.status(500).json({error: 'Internal server error', message: err.message});
   }
};

module.exports = verifyJWT;