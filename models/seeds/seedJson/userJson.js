function User(id, name, password) {
  this.id = id
  this.name = name
  this.password = password
}

let userOne = new User(1, '廣志', 'password')
let userTwo = new User(2, '小新', 'password')
const userList = [userOne, userTwo]
const userJson = JSON.stringify(userList)

module.exports = userJson