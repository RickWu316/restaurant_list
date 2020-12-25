
const express = require('express')
const router = express.Router()
// 引用 Todo model
const restaurantList = require('../../models/restaurant')
// 定義首頁路由
router.get('/', (req, res) => {


    res.render('createRestaurant')
})

router.post('/', (req, res) => {
    const restaurant = req.body
    return restaurantList.create(restaurant)
        .then(() => res.redirect('/'))


})
// 匯出路由模組
module.exports = router



