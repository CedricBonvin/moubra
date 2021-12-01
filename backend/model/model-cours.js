const mongoose = require("mongoose");

const abonnementSchema = mongoose.Schema({
    abo : {type : String},
    prix : { type : Number},
})
module.exports = mongoose.model("abonnements",abonnementSchema)