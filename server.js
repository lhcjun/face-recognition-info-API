const express = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 10
const cors = require('cors');


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
        res.json("Success");
    } else {
        res.status(400).json("Error logging in");
    }
});

app.post("/register", (req, res) => {
    const { email, password, name } = req.body;
    bcrypt.hash(password, saltRounds).then(hash => console.log(hash));
    database.users.push({
        id: "125",
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    });
    res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === Number(id)) {
            found = true;
            res.json(user);
        }
    });
    if (!found) {
        res.status(400).json("Not found");
    }
});

app.put("/image", (req, res) => {
    const { id } = req.params;
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