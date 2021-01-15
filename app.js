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

// 引用路由器
const routes = require('./routes')



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
    secret: 'ThisIsMySecret',
    resave: false,
    saveUninitialized: true
}))

usePassport(app)

// 將 request 導入路由器
app.use(routes)



// start and listen on the Express server
app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})