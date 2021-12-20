const mongoose = require("mongoose");

const aboSchema = mongoose.Schema({
    abo : {type : String, required : true},
    type : {type : String , required : true},
    prix : { type : Number, required : true},
    entreRestante : { type : Number, required : false},
    dateEmission : { type : Date, required : true},
    dateEcheance : { type : Date, required : false},
    dureeMois : { type : Number, required : false},
    actif : { type : Boolean, default : true},
    class : { type : String, required : true},
    ageCat : { type : String, required : true},
    remarque : { type : String, required : false},
    titulaire : { type : Object, required : true},
})
module.exports = mongoose.model("abos",aboSchema)