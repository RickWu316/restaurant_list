const express = require('express')
const router = express.Router()
// 引用 Todo model
const restaurantList = require('../../models/restaurant')
// 定義首頁路由
router.get('/', (req, res) => {

    const sortType = req.query.sortType
    const sort = {  //設定排序邏輯
        AtoZ: { name: 'asc' },
        ZtoA: { name: 'desc' },
        location: { location: 'asc' },
        category: { category: 'asc' },
    }

    // console.log(sort[sortType])

    restaurantList.find() // 取出 Todo model 裡的所有資料
        .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
        .sort(sort[sortType])
        .then(restaurants => res.render('index', { restaurants })) // 將資料傳給 index 樣板
        .catch(error => console.error(error)) // 錯誤處理

})



//search
router.get('/search', (req, res) => {
    const keyword = req.query.keyword


    console.log(req.query)
    return restaurantList.find({ 'name': { '$regex': keyword, '$options': 'i' } })
        .lean()
        .then((restaurants) => res.render('index', { restaurants }))
        .catch(error => console.log(error))

})
// 匯出路由模組
module.exports = router




