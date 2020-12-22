const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
    // id: {
    //     type: Number, // 資料型別是字串
    //     required: false // 這是個必填欄位
    // },
    name: {
        type: String, // 資料型別是字串
        required: true // 這是個必填欄位
    },
    name_en: {
        type: String, // 資料型別是字串
        required: false
    },
    category: {
        type: String, // 資料型別是字串
        required: false //
    },
    image: {
        type: String, // 資料型別是字串
        required: false
    },
    location: {
        type: String, // 資料型別是字串
        required: false
    },
    phone: {
        type: String, // 資料型別是字串
        required: false
    },
    google_map: {
        type: String, // 資料型別是字串
        required: false
    },
    rating: {
        type: Number, // 資料型別是數字
        required: false
    },

    description: {
        type: String, // 資料型別是字串
        required: false
    }



})
module.exports = mongoose.model('retaurant', restaurantSchema)
