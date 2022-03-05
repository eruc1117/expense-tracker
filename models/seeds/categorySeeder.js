const db = require('../../config/mongoose')
const Category = require('../categoryModel')

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  Category.create({
    id: 1,
    name: '家居物業'
  })
  Category.create({
    id: 2,
    name: '交通出行'
  })
  Category.create({
    id: 3,
    name: '休閒娛樂'
  })
  Category.create({
    id: 4,
    name: '餐飲食品'
  })
  Category.create({
    id: 5,
    name: '其他'
  })
  console.log('create category seed data')
})