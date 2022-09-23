const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({extended: true}));

const port = 3000;

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/calculator.html')
})

app.post('/',(req,res)=>{
    let num1 = Number(req.body.num1);
    let num2 = Number(req.body.num2);

    var result = num1 + num2;
    res.send("The result of the calculation is " + result)
})

app.listen(port,()=>{
console.log(`Listening on port ${port}`)
})