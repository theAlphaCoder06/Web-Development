const express = require("express");
const bodyParser = require("body-parser");
const date = require( __dirname + "/date.js")

let newItems = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];
const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static("public"))
// The below line of code tells the app which is build using express to view in ejs system
app.set("view engine", "ejs");

app.get("/", function (req, res) {

  day = date();

  // if(today.getDay() === 6 || today.getDay === 0){
  //     day = "Weekend";
  // }
  // else{
  //     day = "Weekday";
  // }

  // switch (currentDay) {
  //   case 0:
  //     currentDay = "Sunday";
  //     break;
  //   case 1:
  //     currentDay = "Monday";
  //     break;
  //   case 2:
  //     currentDay = "Tuesday";
  //     break;
  //   case 3:
  //     currentDay = "Wednesday";
  //     break;
  //   case 4:
  //     currentDay = "Thursday";
  //     break;
  //   case 5:
  //     currentDay = "Friday";
  //     break;
  //   case 6:
  //     currentDay = "Saturday";
  //     break;
  //     default:
  //       console.log("Error: Current Day = " + currentDay);
  // }

  res.render("list", { listTitle: day, newItems: newItems });
});


app.post("/", (req, res)=>{
  console.log(req.body)

  let newItem = req.body.newItem; 
  if(req.body.list === "Work"){
      workItems.push(newItem);
      res.redirect("/work")
  }
  else{
    newItems.push(newItem);
    res.redirect("/");
  }

});

app.get("/work", (req, res)=>{
  res.render("list", {listTitle: "Work List", newItems: workItems})
});


app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
