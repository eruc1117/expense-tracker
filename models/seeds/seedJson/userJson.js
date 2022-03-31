const { template } = require("handlebars")

function User(id, email, name, password) {
  this.id = id
  this.email = email
  this.name = name
  this.password = password
}

let userOne = new User(1, 'userOne@test.com', '廣志', 'password')
let userTwo = new User(2, 'userTwo@test.com', '小新', 'password')
const userList = [userOne, userTwo]
const userJson = JSON.stringify(userList)

module.exports = userJson