require('dotenv').config();
const md5 = require('md5');
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const port = 3000;
const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
const secret = process.env.SECRET;
mongoose.connect("mongodb://127.0.0.1:27017/userDB", {useNewUrlParser: true});
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});
const User = new mongoose.model("User", userSchema);

app.get('/', (req, res)=>{
    res.render('home');
});
app.get('/login', (req, res)=>{
    res.render('login');
});
app.get('/register', (req, res)=>{
    res.render('register');
});

app.post('/register', (req, res)=>{

    const newUser = new User({
        email: req.body.username,
        password: md5(req.body.password)
    });
    newUser.save((err)=>{
        if(err)
            console.log(err);
        else{
            res.render('secrets')
        }
    });
})

app.post('/login', (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email:username}, (err, foundUser)=>{
        if(err)console.log(err);
        else{
            if(foundUser){
                if(foundUser.password === md5(password)){
                    res.render('secrets');
                }
            }
        }
    })
})

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
})