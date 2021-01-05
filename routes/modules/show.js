const express = require('express')
const router = express.Router()
// 引用 Todo model
const restaurantList = require('../../models/restaurant')
// 定義首頁路由
router.get('/:restaurant_id', (req, res) => {
    const id = req.params.restaurant_id
    return restaurantList.findById(id)
        .lean()
        .then((restaurant) => res.render('show', { restaurant }))
        .catch(error => console.log(error))
})

router.get('/:restaurant_id/edit', (req, res) => {
    const id = req.params.restaurant_id
    return restaurantList.findById(id)
        .lean()
        .then((restaurant) => res.render('edit', { restaurant }))
        .catch(error => console.log(error))

})

router.put('/:restaurant_id', (req, res) => {
    const id = req.params.restaurant_id
    const elements = req.body
    return restaurantList.findById(id)
        .then((restaurant) => {
            // console.log(elements)
            // res.render('edit', { restaurant })
            for (const element in elements) {//找不到從物件取出每個值的方法，先用這種方式代替
                restaurant[element] = elements[element]
            }

            return restaurant.save()
        })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

router.delete('/:restaurant_id', (req, res) => {
    const id = req.params.restaurant_id
    return restaurantList.findById(id)
        .then(restaurant => restaurant.remove())
        // .then(restaurant => console.log(restaurant))
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router







