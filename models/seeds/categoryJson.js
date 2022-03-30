function Category(id, name) {
  this.id = Number(id)
  this.name = name
}

let home = new Category(1, '家居物業')
let traffic = new Category(2, '交通出行')
let recreation = new Category(3, '休閒娛樂')
let food = new Category(4, '餐飲食品')
let other = new Category(5, '其他')

let categoryList = [home, traffic, recreation, food, other]

const categoryJson = JSON.stringify(categoryList)

module.exports = categoryJson