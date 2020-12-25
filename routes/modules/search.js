const express = require('express')
const router = express.Router()
// 引用 Todo model
const restaurantList = require('../../models/restaurant')
// 定義首頁路由

//search
router.get('/search', (req, res) => {
    const keyword = req.query.keyword
    // const keyword = "Sababa"

    return restaurantList.find({ 'name': { '$regex': keyword, '$options': 'i' } })
        .lean()
        .then((restaurants) => res.render('index', { restaurants }))
        .catch(error => console.log(error))

})
// 匯出路由模組
module.exports = router

