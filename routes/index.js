const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const accounts = require('./modules/accounts')
const crud = require('./modules/crud')
const sort = require('./modules/sort')

router.use('/', home)
router.use('/accounts', accounts)
router.use('/crud', crud)
router.use('/sort', sort)

module.exports = router