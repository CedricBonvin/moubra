const AboBase = require("../model/model-abo-base")
const NewAbo = require("../model/model-abo")
const User = require("../model/model-users")




exports.newAbo = async (req,res) => {
    let abo =  await AboBase.findById(req.body.idAbo)
    delete abo._doc._id
    const newAbo = await new NewAbo(abo._doc)
    newAbo.remarque = req.body.remarque
    newAbo.titulaire = req.body.titulaire

   // push idNewAbo dans les abonnements du User
    User.updateOne(
        {_id : req.body.client._id}, 
        { $push : { abonnement : newAbo._id}}
    )
    .then(() => console.log("l'id du nouvel abonnement à bien été injecter dans les abonnements du User"))
    .catch(err => res.status(500).json(err))

    // save newAbo dans abos
    newAbo.save()
    .then(() => res.status(200).json({message : "L'abonnement à bien été créer !"}))
    .catch(err => res.status(500).json(err))
}

exports.updateAbo = (req,res) => {

    console.log(req.body)
    NewAbo.updateOne(
        {_id : req.body.updateAbo._id},
        {...req.body.updateAbo}     
    )
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => console.log(err))

}