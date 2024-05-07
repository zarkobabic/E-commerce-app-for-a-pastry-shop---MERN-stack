const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  id:{
    type: Number,
    required: [true, 'User ID must be provided'],
  },
  firstName: {
    type: String,
    required: [true, 'User first name must be provided'],
  },
  lastName: {
    type: String,
    required: [true, 'User last name must be provided'],
  },
  contact: {
    type: String,
    required: [true, 'User contact must be provided'],
  },
  address: {
    type: String,
    required: [true, 'User address must be provided'],
  },
  type: {
    type: String,
    required: [true, 'User type must be provided'],
  },
  username: {
    type: String,
    required: [true, 'User username must be provided'],
  },
  password: {
    type: String,
    required: [true, 'User password must be provided'],
  }
})

module.exports = mongoose.model('users', UserSchema);
