
const express = require('express')
const router = express.Router()
// 引用 Todo model
const restaurantList = require('../../models/restaurant')
const User = require('../../models/user')
// 定義首頁路由
router.get('/', (req, res) => {
    const restaurant = req.body
    res.render('createRestaurant')
})

router.post('/', (req, res) => {  //把物件ID跟User關聯
    const userId = req.user._id
    const restaurant = req.body
    User.findById(userId)
        .then((user) => {
            user.authority.push(userId)
            user.save()
        })
        .then(() => restaurantList.create(restaurant))
        .then(() => res.redirect('/'))
})
// 匯出路由模組
module.exports = router



