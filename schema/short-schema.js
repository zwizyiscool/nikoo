const {Schema, model} = require('mongoose')

module.exports = model("ShortsDB", new Schema ({
  GuildId : String,
  Name: String,
  Content: Array,
}))