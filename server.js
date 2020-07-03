const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const register = require('./Controllers/register');
const signIn = require('./Controllers/signIn');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');
const auth = require('./middleware/authorization');

const db = knex({
    client: 'pg',
    // production (heroku)
    // connection: {
    //     connectionString: process.env.DATABASE_URL,
    //     ssl: true
    // }

    // development - docker
    connection: process.env.POSTGRES_URI

    // development - non docker
    // connection:{
    //     host: '127.0.0.1',
    //     user: 'database_user',
    //     password: 'database_password',
    //     database: 'database_name'
    // }
});

const app = express();

app.use(morgan('combined')); // HTTP req logger   
app.use(cors());
// Data URI : PayloadTooLargeError
app.use(bodyParser.json({ limit: '10000kb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10000kb', extended: true }));
// parse JSON > obj
app.use(express.json()); // must place AFTER bodyParser, or 413 error！
// CORS
// const corsOptions = {
//     origin: 'https://facial-detective.herokuapp.com/',
//     methods: 'GET, POST, PUT',
//     credentials: true,
//     allowedHeaders: 'Content-Type,Authorization',
//     exposedHeaders: 'Content-Range,X-Content- Range'
// };
// app.options('/imageUrl', cors(corsOptions));

app.get('/', (req, res) => res.send('It is working!'));
app.post('/signIn', signIn.signInAuthentication(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.get('/profile/:id', auth.requireAuth, profile.handleProfileGet(db));
app.post('/profile/:id', auth.requireAuth, profile.handleProfileUpdate(db));
app.put('/image', auth.requireAuth, image.handleImage(db));
// image.handleImage(db)(req, res)  >  automatically pass (req, res)
app.post('/imageUrl', auth.requireAuth, (req, res) => image.handleApiCall(req, res));

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});