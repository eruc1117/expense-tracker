function Record(id, name, date, amount, categoryId) {
  this.id = id
  this.name = name
  this.date = date
  this.amount = amount
  this.categoryId = categoryId
}

let item1 = new Record(1, '午餐', '2019.4.23', 60, 4)
let item2 = new Record(2, '晚餐', '2019.4.23', 60, 4)
let item3 = new Record(3, '捷運', '2019.4.23', 120, 2)
let item4 = new Record(4, '電影：驚奇隊長', '2019.4.23', 220, 3)
let item5 = new Record(5, '租金', '2015.4.01', 25000, 1)

const recordList = []

for (let num = 1; num <= 5; num++) {
  recordList.push(eval(`item${num}`))
  //eval在查資料中說最好別用，不過這樣只要按照相同規則命名，就很容易擴充
}
const recordJson = JSON.stringify(recordList)

module.exports = recordJson
