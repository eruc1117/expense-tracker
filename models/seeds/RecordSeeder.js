const db = require('../../config/mongoose')
const User = require('../userModel')
const Record = require('../RecordModel')
const bcrypt = require('bcryptjs')
const userList = JSON.parse(require('./seedJson/userJson'))
const recordList = JSON.parse(require('./seedJson/recordJson'))

try {
  userList.forEach(user => {
    createUser(user)
  })
  recordList.forEach(item => {
    switch (item.id) {
      case 4:
        item.userId = 2
        break;
      default:
        item.userId = 1
        break;
    }
  })
  Record.create(recordList).then(() => {
    process.exit()
  })
} catch (err) {
  console.log(err)
}


process.exit

process.on('exit', () => {
  console.log('Record done!')
})

async function createUser(user) {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(user.password, salt)
  user['password'] = hash
  await User.create(user)
}

