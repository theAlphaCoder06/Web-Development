const express = require("express");
const bodyParser = require("body-parser");

const port = 3000;
const app = express();
// The below line of code tells the app which is build using express to view in ejs system
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  let today = new Date();
  let currentDay = today.getDay();
  let day = "";

  // if(today.getDay() === 6 || today.getDay === 0){
  //     day = "Weekend";
  // }
  // else{
  //     day = "Weekday";
  // }

  switch (currentDay) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
      default:
        console.log("Error: Current Day = " + currentDay);
  }

  res.render("list", { day: day });
});

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
