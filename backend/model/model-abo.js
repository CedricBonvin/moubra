const mongoose = require("mongoose");

const aboSchema = mongoose.Schema({
    abo : {type : String},
    prix : { type : Number},
    entreRestante : { type : Number},
    titulaire : { type : Object},
    dateEmission : { type : String},
    remarque : { type : String},
})
module.exports = mongoose.model("abos",aboSchema)