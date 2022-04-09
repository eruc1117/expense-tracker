const express = require('express')
const router = express.Router()
const Record = require('../../models/RecordModel')
const Category = require('../../models/CategoryModel')
const User = require('../../models/UserModel')
const PORT = process.env.PORT || 3000

//載入自定義function
const customize = require('../../function/constructor')
const customizeFun = require('../../function/customizeFun')

//新增頁面物件
const index = new customize.PageCss('index', PORT)

router.get('/home', (req, res) => {
  async function totalexpense() {
    try {
      const userId = req.user._id
      const userInfo = await User.findOne({ _id: userId }).lean()
      const totalItem = await Record.find({ userId: userInfo.id }).lean()
      newTotalItem = totalItem.map(item => {
        //修正日期格式
        const rowDate = item.date
        const newDate = customizeFun.changeDateFormat(rowDate)
        item.date = newDate.join('/')
        return item
      })
      icon(newTotalItem).then(newTotalItem =>
        res.render('index', {
          cssStyle: index.css, newTotalItem, categoryName: '類別'
        }))
    } catch (err) {
      console.log(err)
    }
  }
  async function icon(newTotalItem) {
    try {
      const CATEGORY = {
        家居物業: "https://fontawesome.com/icons/home?style=solid",
        交通出行: "https://fontawesome.com/icons/shuttle-van?style=solid",
        休閒娛樂: "https://fontawesome.com/icons/grin-beam?style=solid",
        餐飲食品: "https://fontawesome.com/icons/utensils?style=solid",
        其他: "https://fontawesome.com/icons/pen?style=solid"
      }
      for (let index = 0; index < newTotalItem.length; index++) {
        const category = await Category.findOne({ id: newTotalItem[index].categoryId })
        const url = CATEGORY[category.name]
        const urlArray = url.split('/')
        const iconPart = urlArray.pop()
        const icon = iconPart.split('?')[0]
        newTotalItem[index].iconHtml = icon
      }
      return newTotalItem
    } catch (err) {
      console.log(err)
    }
  }
  totalexpense()
})


module.exports = router
