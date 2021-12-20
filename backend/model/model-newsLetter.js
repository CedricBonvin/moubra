const mongoose = require("mongoose");

const newsLetterSchema = mongoose.Schema({
    IdUser : { type : String, required : true},
    mail : { type : String, required : true},
})
module.exports = mongoose.model("news-letters",newsLetterSchema)