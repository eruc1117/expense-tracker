const express = require('express')
const router = express.Router()
const Record = require('../../models/RecordModel')
const Category = require('../../models/CategoryModel')
const User = require('../../models/UserModel')

//載入自定義function
const customize = require('../../function/constructor')
const customizeFun = require('../../function/customizeFun')


//新增頁面物件
const page = new customize.PageCss('newAndEdit')


router.get('/edit/:id', (req, res) => {
  const id = req.params.id
  const userId = req.user._id
  async function getInfo(id) {
    const userInfo = await User.findOne({ _id: userId })
    const info = (await Record.find({ id, userId: userInfo.id }).lean())[0]
    const dateArray = customizeFun.changeDateFormat(info.date)
    info.date = dateArray.join('-')
    const category = await Category.findOne({ id: info.categoryId })
    info.categoryName = category.name
    res.render('edit', { cssStyle: page.css, info })
  }
  getInfo(id)
})
router.post('/edit/:id', (req, res) => {
  async function editAccount() {
    try {
      const id = req.params.id
      const userId = req.user._id
      const userInfo = await User.findOne({ _id: userId })
      await Record.findOneAndUpdate({ id, userId: userInfo.id }, req.body)
      res.redirect('/accounts/home')
    } catch (err) {
      console.log(err)
    }
  }
  editAccount()
})

router.get('/new', (req, res) => {
  res.render('new', { cssStyle: page.css })
})

router.post('/new', (req, res) => {
  async function createAccount() {
    try {
      const newAccount = req.body
      const userId = req.user._id
      const userInfo = await User.findOne({ _id: userId })
      const totalInfo = await Record.find({ userId: userInfo.id })
      totalInfo.length !== 0 ?
        newAccount['id'] = Number(totalInfo[totalInfo.length - 1].id) + 1 :
        newAccount['id'] = 1
      newAccount['userId'] = userInfo.id
      await Record.create(newAccount)
      res.redirect('/accounts/home')
    } catch (err) {
      console.log(err)
    }
  }
  createAccount()
})

router.get('/delete/:id', (req, res) => {
  async function deleteAccount() {
    try {
      const id = req.params.id
      const userId = req.user._id
      const userInfo = await User.findOne({ _id: userId })
      await Record.findOneAndDelete({ id, userId: userInfo.id })
      res.redirect('/accounts/home')
    } catch (err) {
      console.log(err)
    }
  }
  deleteAccount()
})

module.exports = router
