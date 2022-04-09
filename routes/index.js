const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const user = require('./modules/user')
const accounts = require('./modules/accounts')
const recordController = require('./modules/recordController')
const category = require('./modules/category')
// middleware驗證登入
const { authenticator } = require('../middleware/auth')

router.use('/user', user)
router.use('/accounts', authenticator, accounts)
router.use('/recordCrud', authenticator, recordController)
router.use('/category', authenticator, category)
router.use('/', home)

module.exports = router