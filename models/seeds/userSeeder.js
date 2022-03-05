const db = require('../../config/mongoose')
const User = require('../userModel')

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  User.create({
    id: 1,
    name: '廣志'
  })
  User.create({
    id: 2,
    name: '小新'
  })
  console.log('create user seed data)')
})