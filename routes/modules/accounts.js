const express = require('express')
const router = express.Router()

router.get('/home', (req, res) => {
  res.render('index', { cssStyle: "http://localhost:3000/stylesheets/index.css" })
})

router.get('/edit', (req, res) => {
  res.render('edit', { cssStyle: "http://localhost:3000/stylesheets/edit.css" })
})

router.get('/new', (req, res) => {
  res.render('new', { cssStyle: "http://localhost:3000/stylesheets/new.css" })
})

module.exports = router