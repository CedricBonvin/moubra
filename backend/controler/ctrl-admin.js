const AboBase = require("../model/model-abo-base")
const NewAbo = require("../model/model-abo")
const User = require("../model/model-users")
const Planning = require("../model/model-planning")




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

exports.allAbo = (req,res) => {

    console.log(req.body)
    NewAbo.find(
        { 'titulaire.prenom': req.body.query.prenom }
    )   
    .then(response => {
        if (response.length === 0){
           NewAbo.find()
            .then(response => res.status(200).json(response))
        }else
        res.status(200).json(response)
    })
    .catch(err => console.log(err))

}

exports.getPlanning = (req,res) => {
   console.log(req.body)
  Planning.find({
      $and : [
          {date : {$gt : req.body.dateDebut}},
          {date : {$lte : req.body.dateFin}},
      ]
  })
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json(err))
}

exports.ajouterDate = async (req,res) => {

    //RECUP DATE-END ACTUEL DU PLANNING
    let planning = await Planning.find()
    let reversePlanning = planning.reverse()
    let dateActualEnd = new Date(reversePlanning[0].date) 
    let dateEnd = new Date(req.body.dateEnd) 

    while(dateActualEnd < dateEnd){
      dateActualEnd.setDate(dateActualEnd.getDate() + 1)
      let newDate = new Planning({
         date : dateActualEnd,
         collaborateur1 : "",
         collaborateur2 : "",
         remarque : ""
      })
    await newDate.save()
    }

    let newPlanning = await Planning.find()

     res.status(200).json(newPlanning)
   
  
}

exports.updatePlanning = async (req,res) => {
    for (let item of req.body.dateUpdate){
         await Planning.updateOne(
            { _id : item.idToUpdate},
            {...item.item}
        )
    }
    res.status(200).json({message : "Le planning à bien été mis à jour"})
}