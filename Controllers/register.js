const handleRegister = (db, bcrypt) => (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json('Incorrect form submission');
    }
    // hash password
    const hash = bcrypt.hashSync(password, 10)
    //  table: login   email > table: users  email
    db.transaction(trx => {
            trx
                .insert({
                    hash: hash,
                    email: email
                })
                .into('login')
                .returning('email')
                .then(loginEmail => {
                    return trx('users')
                        .returning('*')
                        .insert({
                            email: loginEmail[0],
                            name: name,
                            joined: new Date()
                        })
                        .then(user => res.json(user[0])) // only the returned user, not an array
                })
                .then(trx.commit)
                .catch(trx.rollback);
        })
        // for front end
        .catch(err => res.status(400).json('Unable to register'));
}

module.exports = {
    handleRegister: handleRegister
};