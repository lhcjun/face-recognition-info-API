const jwt = require('jsonwebtoken');
const redis = require('redis');

// setup Redis
const redisClient = redis.createClient(process.env.REDIS_URI);

const handleSignIn = (db, bcrypt, req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return Promise.reject('Incorrect form submission');
  }
  return db
    .select('email', 'hash')
    .from('login')
    .where('email', '=', email)
    .then((data) => {
      // check password
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select('*')
          .from('users')
          .where('email', '=', email)
          .then(user => user[0])
          .catch(err => Promise.reject('Unable to get user'));
      } else {
        Promise.reject('Wrong credentials');
      }
    })
    .catch(err => Promise.reject('Wrong credentials'));
};

const getAuthTokenId = (req, res) => {
  const { authorization } = req.headers;
  console.log(authorization)                        
  return redisClient.get(authorization, (err, reply) => {   // key, callback
    if(err || !reply){
      return res.status(401).json('Unauthorized');
    }
    return res.json({ id: reply })
  })
};

const signToken = email => {
  // create JWT token
  const jwtPayload = { email };
  return jwt.sign(jwtPayload, 'JWT_SECRET', { expiresIn: '2 days' });
};

const setToken = (token, id) => Promise.resolve(redisClient.set(token, id));  // key value

const createSessions = user => {
  // JWT token, return user data
  const { email, id } = user;
  const token = signToken(email);
  // set token into Redis
  return setToken(token, id)
    .then(() => {
      return { success: 'true', userId: id, token, user }
    })
    .catch(console.log)
};

const signInAuthentication = (db, bcrypt) => (req, res) => {
  // check if auth header is set by the client (client can pass JWT token with auth header)
  const { authorization } = req.headers;
  return authorization
    ? getAuthTokenId(req, res) // no need to sign in if user already has token
    : handleSignIn(db, bcrypt, req, res) // return promise
        .then(user => {
          return user.id && user.email
            ? createSessions(user)
            : Promise.reject(user);
        }) // user[0]
        .then(session => res.json(session))
        .catch(err => res.status(400).json(err));
};

module.exports = { signInAuthentication, redisClient };
