const {Schema, model} = require('mongoose')

module.exports = model("WarningsDB", new Schema ({
  GuildId : String,
  UserId: String,
  UserTag: String,
  Content: Array,
}))