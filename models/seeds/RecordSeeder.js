const db = require('../../config/mongoose')
const Category = require('../RecordModel')

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  Category.create({
    id: 1,
    name: '午餐',
    data: '2019.4.23',
    amount: 60
  })
  Category.create({
    id: 2,
    name: '晚餐',
    data: '2019.4.23',
    amount: 60
  })
  Category.create({
    id: 3,
    name: '捷運',
    data: '2019.4.23',
    amount: 120
  })
  Category.create({
    id: 4,
    name: '電影：驚奇隊長',
    data: '2019.4.23',
    amount: 220
  })
  Category.create({
    id: 5,
    name: '租金',
    data: '2015.4.01',
    amount: 25000
  })
  console.log('create Record seed data')
})