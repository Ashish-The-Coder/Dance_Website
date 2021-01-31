const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ashish', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

const kittySchema = new mongoose.Schema({
    name: String,
    subject: String,
    roll: String
});

kittySchema.methods.speak = function () {
  const intro = "My name is " + this.name;
  const sub = "I'm learning " + this.subject;
  console.log(intro);
  console.log(sub);
}

const Kitten = mongoose.model('mongoose', kittySchema);

const Ashish_Data1 = new Kitten({ name: "Ashish", subject: "Mongoose", roll: 8});
// console.log(Ashish_Data1);
// Ashish_Data1.speak()

Ashish_Data1.save(function (err, given) {
  if (err) return console.error(err);
  // given.speak();
});

Kitten.find({roll: {$gte:7} }, function (err, given) {
  if (err) return console.error(err);
  console.log(given);
})