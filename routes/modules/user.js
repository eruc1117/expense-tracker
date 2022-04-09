const express = require('express')
const router = express.Router()
const customize = require('../../function/constructor')
const User = require('../../models/UserModel')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const nodemailer = require("nodemailer");
const PORT = process.env.PORT || 3000

const style = new customize.PageCss('rigsterAndLogin', PORT)

router.get('/login', (req, res) => {
  res.render('login', { cssStyle: style.css })
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/accounts/home',
  failureRedirect: '/user/login',
  failureMessage: true
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
    let newUser = { name, email }
    if (userInfo) {
      const errorMsg = `這個 Email 已經註冊過了。`
      return res.render('rigster', { userInfo: newUser, error_msg: errorMsg, cssStyle: style.css })
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

router.get('/forgetPassword', (req, res) => {
  res.render('forgetPassword', { cssStyle: style.css })
})

router.post('/forgetPassword', (req, res) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: '************',
      pass: '************',
    },
  });
  transporter.verify().then(console.log).catch(console.error);

  const randerNum = Math.floor(Math.random() * 1000) + 1
  const userEmail = req.body.email
  transporter.sendMail({
    from: 'eruc11111@gmail.com', // sender address
    to: userEmail, // list of receivers
    subject: "Reset Password", // Subject line
    text: `verification code is ${randerNum}` // plain text body
  }).then(info => {
    console.log({ info });
  }).catch(console.error);
  res.cookie('email', userEmail)
  res.render('resetPassword', { cssStyle: style.css, randerNum })
})

router.post('/resetPassword', (req, res) => {
  const email = req.cookies.email
  const password = req.body.password
  async function updatePassword(email, password) {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    await User.findOneAndUpdate({ email }, { password: hash })
  }
  updatePassword(email, password)
  res.redirect('/user/login')
})

module.exports = router



