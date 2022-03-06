const db = require('../../config/mongoose')
const Category = require('../RecordModel')

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  Category.create({
    id: 1,
    name: '午餐',
    date: '2019.4.23',
    amount: 60,
    categoryId: 4
  })
  Category.create({
    id: 2,
    name: '晚餐',
    date: '2019.4.23',
    amount: 60,
    categoryId: 4
  })
  Category.create({
    id: 3,
    name: '捷運',
    date: '2019.4.23',
    amount: 120,
    categoryId: 2
  })
  Category.create({
    id: 4,
    name: '電影：驚奇隊長',
    date: '2019.4.23',
    amount: 220,
    categoryId: 3
  })
  Category.create({
    id: 5,
    name: '租金',
    date: '2015.4.01',
    amount: 25000,
    categoryId: 1
  }).then(() => {
    console.log('create record seed data')
    process.exit()
  })
})