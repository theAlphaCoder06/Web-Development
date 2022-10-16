const mongoose = require('mongoose')
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const ejs = require('ejs');
const { mainModule } = require('process');
const port = 3000;

const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.set('view engine', 'ejs');



const uri = "mongodb+srv://<username>:<password>@cluster0.pw1yofw.mongodb.net/<dbName>?retryWrites=true&w=majority";

async function run() {
    try {
        await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
            console.log("Connected")
        }).catch((err)=>{
            console.log(err);
        })
      } catch (error) {
        console.log(error);
      }
}
run().catch(console.dir);

const userSchema = new mongoose.Schema({
    email: String,
    password: String
})
const User = mongoose.model('User', userSchema);


app.get("/", (req, res)=>{
    res.render("index")
})

app.post("/", (req, res)=>{
    const useremail = req.body.useremail;
    const password = req.body.password;
    const user1 = new User({
        email: useremail,
        password: password
    })
    user1.save();
    res.redirect("/");
    res.end();
})

app.listen(port, ()=>{
    console.log(`Server is listening on ${port}`);
})