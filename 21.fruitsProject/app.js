const mongoose = require('mongoose');

main().catch(err=>console.log(err));

async function main(){

  await mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  // ? Creating new schema
  
  const fruitSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String
  });
  const Fruit = mongoose.model("Fruit", fruitSchema);//mongoose converts the 'Fruit" to 'fruits' to name our collection and this is done using _lodash
  const fruit = new Fruit ({
    name: "Apple",
    rating: 7,
    review: "Pretty solid"
  });

  const kiwi = new Fruit ({
    name: "Kiwi",
    rating: 10,
    review: "The best"
  })
  const orange = new Fruit ({
    name: "Orange",
    rating: 9,
    review: "OK OK!!"
  })
  const banana = new Fruit ({
    name: "Banana",
    rating: 8,
    review: "Good"
  })
  // await kiwi.save();
  // await orange.save();
  // await banana.save();

  Fruit.insertMany([kiwi, orange, banana], (err)=>{
    if(err)
      console.log(err);
    else
      console.log("Success")
  })

  const peopleSchema = new mongoose.Schema({
    name: String,
    age: Number
  })
  const People = mongoose.model("People", peopleSchema);
  const people = new People({
    name: "Shubham",
    age: 19
  })
  await people.save();
  
  //await fruit.save() // whenever we run this it will save the same apple to the database
}