const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const { urlencoded } = require('body-parser');
const port = 3000;

const app = express();
// app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.set('view engine', 'ejs');


app.get("/", (req, res)=>{
    res.render("index")
})

app.post("/", (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    console.log(username)
    console.log(password)
    req.end();
})



app.listen(port, ()=>{
    console.log(`Server is listening on ${port}`);
})