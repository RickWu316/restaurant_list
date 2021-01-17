const express = require('express')
const router = express.Router()
// 引用 Todo model
const restaurantList = require('../../models/restaurant')

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

//show
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

//search
router.get('/search', (req, res) => {
    const keyword = req.query.keyword


    console.log(req.query)
    return restaurantList.find({ 'name': { '$regex': keyword, '$options': 'i' } })
        .lean()
        .then((restaurants) => res.render('index', { restaurants }))
        .catch(error => console.log(error))

})


//create
router.get('/new', (req, res) => {
    const restaurant = req.body
    res.render('createRestaurant')
})

router.post('/new', (req, res) => {  //把物件ID跟User關聯
    const userId = req.user._id
    const restaurant = req.body
    User.findById(userId)
        .then((user) => {
            restaurantList.create(restaurant)
                .then(restaurant => {
                    user.authority.push(restaurant._id.toString())
                    user.save()
                })
        })
        .then(() => res.redirect('/'))
})




module.exports = router