const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

const port = 3000;

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", (req,res)=>{
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.Email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);
    const url = "https://us9.api.mailchimp.com/3.0/lists/64f50a8124";
    const options = {
        method: "POST",
        auth: "shubham:b81c21cca79244c2c3a5e00ce8b5191c-us9"
    }
    const request = https.request(url, options, function(response){
      
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", (data)=>{
            console.log(JSON.parse(data));
        });

    });

    request.write(jsonData);
    request.end();

});

app.post("/failure", (req, res)=>{
    res.redirect("/");
});

app.listen(process.env.PORT || port, ()=>{
    console.log(`Server is listening on ${port}`);
})

// API key
// b81c21cca79244c2c3a5e00ce8b5191c-us9

// Audience ID
// 64f50a8124