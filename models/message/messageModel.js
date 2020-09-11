const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  user: {
    type: String,
    unique: true
  },
  text: {
    type: String,
    required: [true, 'You can\'t send an empty message!']
  }
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message;
