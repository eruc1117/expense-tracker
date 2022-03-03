const express = require('express')
const router = express.Router()

//載入自定義function
const customize = require('../../function/constructor')

//新增頁面物件
const index = new customize.PageCss('index')
const edit = new customize.PageCss('edit')
const create = new customize.PageCss('new')//new命名會造成衝突，變數改為create

router.get('/home', (req, res) => {
  res.render(index.view, { cssStyle: index.cssStyle() })
})

router.get('/edit', (req, res) => {
  res.render(edit.view, { cssStyle: edit.cssStyle() })
})

router.get('/new', (req, res) => {
  res.render(create.view, { cssStyle: create.cssStyle() })
})

module.exports = router