const express = require('express')
const app = express()
const port = 3000

app.get('/',(req,res)=>{
    res.send('Hello World!')
})

app.get('/contact',(req,res)=>{
    res.send('contact me at shubhamsinghmau2@gmail.com')
})

app.get('/about',(req,res)=>{
    res.send('<h1>Shubham singh</h1><br><p>I am a computer Geek.</p>')
})

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})