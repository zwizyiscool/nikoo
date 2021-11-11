const {Schema, model} = require('mongoose')

module.exports = model("DatesDB", new Schema ({
    UserID: String,
    Name: String,
    Day:Number,
    Month:Number,
    Content:Array,
}))