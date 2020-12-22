// app.js
// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser') // 引用 body-parser
const restaurantList = require('./models/restaurant')
const mongoose = require('mongoose') // 載入 mongoose



mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
    console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
    console.log('mongodb connected!')
})


// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))


// setting static files
app.use(express.static('public'))
app.use('/sylesheets/css', express.static('css'));

// routes setting
app.get('/', (req, res) => {

    /////
    restaurantList.find() // 取出 Todo model 裡的所有資料
        .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
        .then(restaurants => res.render('index', { restaurants })) // 將資料傳給 index 樣板
        .catch(error => console.error(error)) // 錯誤處理
    //////////
})





//detail
app.get('/restaurants/:resturant_id', (req, res) => {
    const id = req.params.resturant_id
    return restaurantList.findById(id)
        .lean()
        .then((restaurant) => res.render('show', { restaurant }))
        .catch(error => console.log(error))
})

//search
app.get('/search', (req, res) => {
    const keyword = req.query.keyword
    // const keyword = "Sababa"

    return restaurantList.find({ 'name': { '$regex': keyword, '$options': 'i' } })
        .lean()
        .then((restaurants) => res.render('index', { restaurants }))
        .catch(error => console.log(error))

})
//create
app.get('/create', (req, res) => {


    res.render('createRestaurant')
})

app.post('/create', (req, res) => {
    const restaurant = req.body
    return restaurantList.create(restaurant)
        .then(() => res.redirect('/'))


})


//edit
app.get('/restaurants/:resturant_id/edit', (req, res) => {
    const id = req.params.resturant_id
    return restaurantList.findById(id)
        .lean()
        .then((restaurant) => res.render('edit', { restaurant }))
        .catch(error => console.log(error))

})

app.post('/restaurants/:resturant_id/edit', (req, res) => {
    const id = req.params.resturant_id
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
        .then(() => res.redirect(`/restaurants/${id}/edit`))
        .catch(error => console.log(error))
})

app.post('/restaurants/:resturant_id/delete', (req, res) => {
    const id = req.params.resturant_id
    return restaurantList.findById(id)
        .then(restaurant => restaurant.remove())
        // .then(restaurant => console.log(restaurant))
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})


// start and listen on the Express server
app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})