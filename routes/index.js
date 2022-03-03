const express = require('express')
const router = express.Router()

const accounts = require('./modules/accounts')

router.use('/accounts', accounts)

module.exports = router