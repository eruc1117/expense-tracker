const express = require('express')
const router = express.Router()
const customize = require('../../function/constructor')
const User = require('../../models/userModel')
const passport = require('passport')
const bcrypt = require('bcryptjs')

const style = new customize.PageCss('rigsterAndLogin')

router.get('/login', (req, res) => {
  res.render('login', { cssStyle: style.css })
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/accounts/home',
  failureRedirect: '/user/login'
}))

router.get('/rigster', (req, res) => {
  res.render('rigster', { cssStyle: style.css })
})

router.post('/rigster', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  if (password !== confirmPassword) {
    return res.redirect('/user/rigster')
  }
  async function rigster(name, email, password) {
    const userInfo = await User.findOne({ email })
    const lastId = await User.find()
    let newUser = { email }
    if (userInfo) {
      return res.redirect('/user/rigster')
    }
    if (!userInfo && !lastId[lastId.length - 1]) {//[lastId.length - 1]，在node v16後可以用 .at(-1)替代 
      newUser.id = 1
    } else {
      newUser.id = Number(lastId[lastId.length - 1].id) + 1
    }
    const salt = await bcrypt.genSalt(10)
    newUser.password = await bcrypt.hash(password, salt)
    newUser.name = name
    await User.create(newUser)
    return res.redirect('/')
  }
  rigster(name, email, password)
})


router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router



