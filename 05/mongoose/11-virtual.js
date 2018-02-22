// Один-ко-многим: Вывод юзера с детьми

const mongoose = require('mongoose');
mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/test');

const userSchema = new mongoose.Schema({
  email: {
    type:     String,
    required: 'Укажите email', // true for default message
    unique:   true
  },
  name: String,
  surname: String,
  _passwordhash: String,
});

userSchema.virtual('password')
  .get(function() {
    // return this.name + ' ' + this.surname
    return this._plainpassword;
  })
  .set(function(value) {
    // [this.name, this.surname] = value.trim().split(/\s+/);
    this._passwordhash = generateHash(value);
    this._plainpassword = value;
  });

const user = new User({
  password: 123123
});

user.password // 123123

const User = mongoose.model('User', userSchema);

let user = new User({
  name: "Vasya",
  surname: "Petrov"
});

console.log(user.fullName); // Vasya Petrov

user.fullName = "Petya Ivanov";

console.log(user.fullName);
