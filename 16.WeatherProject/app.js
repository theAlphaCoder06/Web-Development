const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
const port = 3000;

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res)=>{

    const query = req.body.cityName;
    const apiKey = "bc295a4bc8727b69c6df749ba9cc88be";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url,(response)=>{
        // console.log(response.statusCode);

        response.on("data", (data)=>{
            // console.log(data.toString());
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png";

            // console.log(weatherDescription);
            // console.log(temp);

            // We can also add res.write which supports multiple res.write

            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celsius.</h1>");
            res.write("<p> The weather description is " + weatherDescription + ".</p>");
            res.write("<img src=" + imageURL + ">");
            res.send();

            // console.log(weatherData);
            // const object = {
            //     name: "Shubham",
            //     class: "2nd"
            // }
            // console.log(JSON.stringify(object));
        });

    });

//401 is the status code for wrong API key(unauthorized)

    // res.send("Server is running.");
    // We can't make multiple res.send in same app.get. If done so, we will get an error called [ERR_HTTP_HEADER_SENT]
});

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
});