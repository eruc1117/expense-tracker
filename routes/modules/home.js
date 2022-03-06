const express = require('express')
const router = express.Router()
const customize = require('../../function/constructor')

const home = new customize.PageCss('home')

router.get('/', (req, res) => {
  res.render(home.view, { cssStyle: home.cssStyle() })
})



module.exports = router