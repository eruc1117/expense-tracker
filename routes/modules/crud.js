const express = require('express')
const router = express.Router()
const Record = require('../../models/RecordModel')
const Category = require('../../models/categoryModel')

//載入自定義function
const customize = require('../../function/constructor')
const customizeFun = require('../../function/customizeFun')


//新增頁面物件
const edit = new customize.PageCss('edit')
const create = new customize.PageCss('new')//new命名會造成衝突，變數改為create

router.get('/edit/:id', (req, res) => {
  const id = req.params.id
  async function getInfo(id) {
    const info = await Record.findOne({ id }).lean()
    const dateArray = customizeFun.changeDateFormat(info.date)
    info.date = dateArray.join('-')
    const category = await Category.findOne({ id: info.categoryId })
    info.categoryName = category.name
    res.render(edit.view, { cssStyle: edit.cssStyle(), info })
  }
  getInfo(id)
})
router.post('/edit/:id', (req, res) => {
  const id = req.params.id
  Record.findOneAndUpdate({ id }, req.body)
    .then((element =>
      res.redirect('/accounts/home')
    )).catch(err => {
      console.log(err)
    })
})

router.get('/new', (req, res) => {
  res.render(create.view, { cssStyle: create.cssStyle() })
})

module.exports = router
