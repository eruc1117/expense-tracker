const mongoose = require('mongoose')
const schema = mongoose.Schema

const RecordSchema = new schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  categoryId: {  // 加入關聯設定
    type: Number,
    required: true,
    ref: 'categories'
  },
  userId: {  // 加入關聯設定
    type: Number,
    required: true,
    ref: 'users'
  }
})

module.exports = mongoose.model('Record', RecordSchema)