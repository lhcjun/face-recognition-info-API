const express = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 10
const cors = require('cors');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'txduik',
        database: 'facedetect'
    }
});

const database = {
    users: [{
            id: "123",
            name: "Harry",
            email: "Harry@gmail.com",
            password: "potter",
            entries: 0,
            joined: new Date()
        },
        {
            id: "124",
            name: "Hermione",
            email: "Hermione@gmail.com",
            password: "chocolate",
            entries: 0,
            joined: new Date()
        }
    ]
};

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("It is working!");
});

app.post("/signIn", (req, res) => {
    bcrypt.compare('potter', hash).then(res => console.log('first guess', res));
    bcrypt.compare('apple', hash).then(res => console.log('second guess', res));
    if (
        req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password
    ) {
        res.json(database.users[0]);
    } else {
        res.status(400).json("Error logging in");
    }
});

app.post("/register", (req, res) => {
    const { email, password, name } = req.body;
    bcrypt.hash(password, saltRounds).then(hash => console.log(hash));
    db('users')
        .returning('*')
        .insert({
            email: email,
            name: name,
            joined: new Date()
        })
        .then(user => res.json(user[0]))
        .catch(err => res.status(400).json('Unable to register'));
});

app.get("/profile/:id", (req, res) => {
    const { id } = req.params;
    db.select('*').from('users')
        .where({ id: id }) // or {id}
        .then(user => res.json(user[0]))
});

app.put("/image", (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === Number(id)) {
            found = true;
            user.entries++;
            res.json(user.entries);
        }
    });
    if (!found) {
        res.status(400).json("Not found");
    }
});

app.listen(3001, () => {
    console.log("App is running on port 3001");
});