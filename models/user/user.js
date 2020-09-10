const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'A name is required!']
  },
  room : {
    type: String,
    required: [true, 'A name is required!']
  }
})


const User = mongoose.model('User', userSchema)

module.exports = User;
