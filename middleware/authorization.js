const redisClient = require('../Controllers/signIn').redisClient;

const requireAuth = (req, res, next) => {
    const { authorization } = req.headers;
    // no auth headers > block the request for going to the next step
    if(!authorization){
        return res.status(401).json('Unauthorized');
    }
    // check redis if there's JWT token >  next step
    return redisClient.get(authorization, (err, reply) => {
        if(err || !reply){
            return res.status(401).json('Unauthorized');
        }
        // get the endpoints user needs
        return next();
    })
}

module.exports = { requireAuth };