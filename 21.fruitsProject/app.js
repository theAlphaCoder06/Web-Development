const mongoose = require('mongoose');

main().catch(err=>console.log(err));

async function main(){

  await mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const fruitSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Why no name?']
    },
    rating: {
      type: Number,
      min: 1,
      max: 10
    },
    review: String
  });
  const Fruit = mongoose.model("Fruit", fruitSchema);//mongoose converts the 'Fruit" to 'fruits' to name our collection and this is done using _lodash

  const peopleSchema = new mongoose.Schema({
    name: String,
    age: Number
  })
  const People = mongoose.model("People", peopleSchema);

  mongoose.connection.close();
}