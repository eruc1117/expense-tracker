const mongoose = require('mongoose')
const schema = mongoose.Schema

const categorySchema = new schema({
  id: {
    type: Number
  },
  name: {
    type: String
  }
})

module.exports = mongoose.model('Category', categorySchema)