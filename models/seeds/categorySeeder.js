const db = require('../../config/mongoose')
const CategoryModel = require('../CategoryModel')

const categoryJson = require('./seedJson/categoryJson')
const categoryList = JSON.parse(categoryJson)


try {
  require('../../config/mongoose')
  for (let index = 0; index < categoryList.length; index++) {
    CategoryModel.create(categoryList[index])
      .then(() => {
        if ((index + 1) === categoryList.length) {
          db.close()
        }
      })
  }
} catch (err) {
  console.log(err)
}
process.exit

process.on('exit', () => {
  console.log('Category done!')
})