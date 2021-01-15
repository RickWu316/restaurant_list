const express = require('express')
const router = express.Router()
// 引用 Todo model

// 引入 home 模組程式碼
const home = require('./modules/home')
const show = require('./modules/show')
const create = require('./modules/create')
const search = require('./modules/search')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')  // 掛載 middleware



// 將網址結構符合 / 字串的 request 導向 home 模組 
// router.use('/create', authenticator, create)
// router.use('/search', authenticator, search)
router.use('/users', users)
router.use('/restaurants', authenticator, show) // 加入驗證程序
router.use('/', authenticator, home) // 加入驗證程序

// 匯出路由模組
module.exports = router

