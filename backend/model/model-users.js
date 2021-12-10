const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    mail : {type : String},
    password : { type : String},
    nom : { type : String},
    prenom : { type : String},
    abonnement: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'abos'
      }]
})
module.exports = mongoose.model("users",userSchema)