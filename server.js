const express = require('express')
const bodyParser = require('body-parser')


const app = express();

app.use(bodyParser.json())
const database = {
    users: [
        {id: "123", name: 'Dusty', email: 'contact@dustingraham.tech', password: 'cookies', entries: 0, joined: new Date()},
        {id: "1235", name: 'Sally', email: 'sally@gmail.com', password: 'bananas', entries: 0, joined: new Date()} 
    ]
}

app.get('/', (req, res) => {
    res.send(database.users)
})


//SIGN IN
app.post('/signin', (req, res) => {
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json('success')
    }
    res.status(400).json('error logging in')
})


//REGISTAR
app.post('/registar', (req, res) => {
    const { email, name, password } = req.body;
    database.users.push({
        id: '12123',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1]);
})


//User Profile
app.get('/profile/:id', (req, res) => {
    const id = req.params.id;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id) {
           found = true;
           return res.json(user);
        }
    })
    if(!found) {
        res.status(400).json('not found')
    }
})

//image count
app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id) {
           found = true;
           user.entries++
           return res.json(user.entries);
        }
    })
    if(!found) {
        res.status(400).json('not found')
    }
})

app.listen(3000, () => {
    console.log('connected')
})


/*
/ -> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT = count/user 
*/