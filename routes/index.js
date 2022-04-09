const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const user = require('./modules/user')
const accounts = require('./modules/accounts')
const recordCrud = require('./modules/recordCrud')
const sort = require('./modules/category')
// middleware驗證登入
const { authenticator } = require('../middleware/auth')

router.use('/', home)
router.use('/user', user)
router.use('/accounts', authenticator, accounts)
router.use('/crud', authenticator, recordCrud)
router.use('/sort', authenticator, sort)

module.exports = router