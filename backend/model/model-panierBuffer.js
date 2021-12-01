const mongoose = require("mongoose");

const panierBufferSchema = mongoose.Schema({

    id_user : {type : String},
    panier : {type : Array},
})
module.exports = mongoose.model("panier-buffers",panierBufferSchema)