const express = require('express')
const router = express.Router()
// 引用 Todo model

// 引入 home 模組程式碼
const create = require('./modules/new')
const users = require('./modules/users')
const restaurants = require('./modules/restaurants')
const { authenticator } = require('../middleware/auth')  // 掛載 middleware



// 將網址結構符合 / 字串的 request 導向 home 模組 
router.use('/new', authenticator, create) //出現字串過長的問題"must be a single String of 12 bytes or a string of 24 hex characters" 無法併入restaurants裡

router.use('/restaurants', authenticator, restaurants)
router.use('/users', users)
router.use('/', authenticator, (req, res) => res.redirect("./restaurants")) // 預設restaurants為首頁

// 匯出路由模組
module.exports = router

