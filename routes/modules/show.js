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
    const userAuthority = req.user.authority
    const id = req.params.restaurant_id
    const elements = req.body
    return restaurantList.findById(id)
        .then((restaurant) => {
            for (const element in elements) {//找不到從物件取出每個值的方法，先用這種方式代替
                restaurant[element] = elements[element]
            }
            if (userAuthority.find(element => element === restaurant.id) || userAuthority.find(element => element === restaurant._id.toString())) { //因為種子資料創造時沒有辦法提前知道_id, 所以多做一層判斷
                restaurant.save()
                    .then(() => res.redirect(`/`))
            } else {
                req.flash('warning_msg', '你沒有修改的權限！')
                res.redirect(`${id}/edit`)
            }
        })
        .catch(error => console.log(error))
})

router.delete('/:restaurant_id', (req, res) => {
    const userAuthority = req.user.authority
    const id = req.params.restaurant_id
    return restaurantList.findById(id)
        .then((restaurant) => {
            if (userAuthority.find(element => element === restaurant.id) || userAuthority.find(element => element === restaurant._id.toString())) {
                return restaurant.remove()
            } else {
                req.flash('warning_msg', '你沒有刪除的權限！')
                // res.redirect(`/`)
            }
        })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router







