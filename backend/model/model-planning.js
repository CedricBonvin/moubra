const mongoose = require("mongoose");

const planningSchema = mongoose.Schema({
    date : {type : Date},
    collaborateur1 : {type : String, default : ""},
    collaborateur2 : {type : String, default : ""},
    remarque : { type : String, default : ""},
})
module.exports = mongoose.model("plannings",planningSchema)