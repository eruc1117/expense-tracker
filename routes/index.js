const express = require('express')
const router = express.Router()

const accounts = require('./modules/accounts')
const crud = require('./modules/crud')
const sort = require('./modules/sort')

router.use('/accounts', accounts)
router.use('/crud', crud)
router.use('/sort', sort)

module.exports = router