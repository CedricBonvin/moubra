const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    mail : {type : String, required : true},
    password : { type : String, required : true},
    nom : { type : String, required : true},
    prenom : { type : String, required : true},
    newsLetter : {type : Boolean, required : true},
    abonnement: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'abos'
      }]
})
module.exports = mongoose.model("users",userSchema)