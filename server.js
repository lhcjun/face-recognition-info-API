const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const bodyParser = require('body-parser');

const register = require('./Controllers/register');
const signIn = require('./Controllers/signIn');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }

    // local
    // connection:{
    //     host: '127.0.0.1',
    //     user: 'database_user',
    //     password: 'database_password',
    //     database: 'database_name'
    // }
});

const app = express();

app.use(express.json()); // parse JSON > obj
app.use(cors());
// CORS
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
})
// Data URI : PayloadTooLargeError
app.use(bodyParser.json({ limit: '10000kb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10000kb', extended: true }));

app.get('/', (req, res) => res.send('It is working!'));
app.post('/signIn', signIn.handleSignIn(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.get('/profile/:id', profile.handleProfileGet(db));
app.put('/image', image.handleImage(db));
// image.handleImage(db)(req, res)  >  automatically pass (req, res)
app.post('/imageUrl', (req, res) => image.handleApiCall(req, res));

app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on port ${process.env.PORT}`);
});