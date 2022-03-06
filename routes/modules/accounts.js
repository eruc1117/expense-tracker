const express = require('express')
const router = express.Router()
const Record = require('../../models/RecordModel')
const Category = require('../../models/categoryModel')

//載入自定義function
const customize = require('../../function/constructor')
const customizeFun = require('../../function/customizeFun')

//新增頁面物件
const index = new customize.PageCss('index')

router.get('/home', (req, res) => {
  async function totalexpense() {
    try {
      let totalItem = await Record.find().lean()
      newTotalItem = totalItem.map(item => {
        //修正日期格式
        const rowDate = item.date
        const newDate = customizeFun.changeDateFormat(rowDate)
        item.date = newDate.join('/')
        return item
      })

      let totalAmount = 0
      newTotalItem.forEach(element => {
        totalAmount += element.amount
      })
      icon(newTotalItem).then(newTotalItem =>
        res.render(index.view, {
          cssStyle: index.cssStyle(), newTotalItem, totalAmount
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
