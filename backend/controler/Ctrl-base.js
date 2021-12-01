const abo = require("../model/model-cours")

exports.getAllCours = (req,res) => {
    abo.find()
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json({erreur : err, message : "impossible de trouvée les cours...!"}))
}