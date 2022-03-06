const express = require('express')
const router = express.Router()

const accounts = require('./modules/accounts')
const crud = require('./modules/crud')

router.use('/accounts', accounts)
router.use('/crud', crud)

module.exports = router