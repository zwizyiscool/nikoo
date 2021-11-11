const {Schema, model} = require('mongoose')

module.exports = model("CurrencyDB", new Schema ({
  UserId: String,
  Content: Array,
  GuildID: String,
}))