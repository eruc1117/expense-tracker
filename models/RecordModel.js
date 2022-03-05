const mongoose = require('mongoose')
const schema = mongoose.Schema

const RecordSchema = new schema({
  id: {
    type: Number
  },
  name: {
    type: String
  },
  data: {
    type: Date
  },
  amount: {
    type: Number
  }
})

module.exports = mongoose.model('Record', RecordSchema)