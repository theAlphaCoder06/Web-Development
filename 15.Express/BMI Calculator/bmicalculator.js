const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

const port = 3000;

app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/bmiCalculator.html")
})

app.post('/',(req,res)=>{
    let height = parseFloat(req.body.height);
    let weight = parseFloat(req.body.weight);

    let bmi = weight/(height*height);
    res.send("Your BMI is " + bmi);
})

app.listen(port,function(){
    console.log(`Server is listening on ${port}`)
})