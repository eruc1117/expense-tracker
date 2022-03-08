const express = require('express')
const router = express.Router()
const customize = require('../../function/constructor')
const User = require('../../models/userModel')
const passport = require('passport')
const bcrypt = require('bcryptjs')

const loginUrl = new customize.PageCss('login')
const rigsterUrl = new customize.PageCss('rigster')

router.get('/login', (req, res) => {
  res.render(loginUrl.view, { cssStyle: loginUrl.cssStyle() })
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/accounts/home',
  failureRedirect: '/user/login'
}))

router.get('/rigster', (req, res) => {
  res.render(rigsterUrl.view, { cssStyle: rigsterUrl.cssStyle() })
})

router.post('/rigster', (req, res) => {
  const { name, password, confirmPassword } = req.body
  if (password !== confirmPassword) {
    return res.redirect('/user/rigster')
  }
  async function rigster(name, password) {
    const userInfo = await User.findOne({ name })
    const lastId = await User.find()
    let newUser = { name }
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
    await User.create(newUser)
    return res.redirect('/')
  }
  rigster(name, password)
})


router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router



