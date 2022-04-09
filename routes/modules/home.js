const express = require('express')
const router = express.Router()
const customize = require('../../function/constructor')
const PORT = process.env.PORT || 3000

const home = new customize.PageCss('home', PORT)
console.log(home.css)

router.get('/', (req, res) => {
  res.render('home', { cssStyle: home.css })
})



module.exports = router