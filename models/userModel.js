const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema({
  id: {
    type: Number
  },
  email: {
    type: String
  },
  name: {
    type: String
  },
  password: {
    type: String
  }
})

module.exports = mongoose.model('User', userSchema)