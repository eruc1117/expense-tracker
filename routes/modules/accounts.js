const express = require('express')
const router = express.Router()
const Record = require('../../models/RecordModel')
const Category = require('../../models/categoryModel')

//載入自定義function
const customize = require('../../function/constructor')

//新增頁面物件
const index = new customize.PageCss('index')
const edit = new customize.PageCss('edit')
const create = new customize.PageCss('new')//new命名會造成衝突，變數改為create

router.get('/home', (req, res) => {
  async function totalexpense() {
    try {
      let totalItem = await Record.find().lean()
      newTotalItem = totalItem.map(item => {
        //修正日期格式
        let date = item.date.toString().split(" ")
        date.splice(0, 1)
        date.splice(3, 6)
        date.reverse().pop()
        let month = `0${(item.date.getMonth() + 1).toString()}`
        date.splice(1, 0, month)
        newDate = date.join('/')
        item.date = newDate
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

router.get('/edit', (req, res) => {
  res.render(edit.view, { cssStyle: edit.cssStyle() })
})

router.get('/new', (req, res) => {
  res.render(create.view, { cssStyle: create.cssStyle() })
})

module.exports = router
