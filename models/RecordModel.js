const mongoose = require('mongoose')
const schema = mongoose.Schema

const RecordSchema = new schema({
  id: {
    type: Number
  },
  name: {
    type: String
  },
  date: {
    type: Date
  },
  amount: {
    type: Number
  },
  categoryId: {  // 加入關聯設定
    type: Number,
    ref: 'categories'
  }
})

module.exports = mongoose.model('Record', RecordSchema)