// app.js
// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser') // 引用 body-parser
const methodOverride = require('method-override')// 載入 method-override
const session = require('express-session')
const usePassport = require('./config/passport')
const flash = require('connect-flash')
const routes = require('./routes')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


require('./config/mongoose')


app.use(methodOverride('_method'))// 設定每一筆請求都會透過 methodOverride 進行前置處理

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))


// setting static files
app.use(express.static('public'))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

usePassport(app)

app.use(flash())  // 掛載套件
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
    res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
    next()
})


// 將 request 導入路由器
app.use(routes)



// start and listen on the Express server
app.listen(process.env.PORT, () => {
    console.log(`Express is listening on localhost:${process.env.PORT}`)
})