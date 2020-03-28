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
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

app.use(cors({
    origin: [
        'https://facial-detective.herokuapp.com',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
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