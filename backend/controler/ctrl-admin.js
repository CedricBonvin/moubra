const AboBase = require("../model/model-abo-base")
const NewAbo = require("../model/model-abo")
const User = require("../model/model-users")
const Planning = require("../model/model-planning")

const hbs = require("nodemailer-express-handlebars")
const nodemailer = require("nodemailer")


exports.newAbo = async (req,res) => {
    let abo
    try {
         abo =  await AboBase.findOne({ _id :req.body.idAbo}, {_id : 0})
    } catch (error) {
        res.status(500).json(error)
    }
     
     let newAbo = abo._doc
    
     newAbo.dateEmission = new Date(Date.now())
     newAbo.titulaire = req.body.titulaire
     newAbo.remarque = req.body.remarque

    // type mois
     if (newAbo.type === "mois"){
         let duree = newAbo.dureeMois
             dateActuel = new Date(Date.now())
             newAbo.dateEcheance = new Date(dateActuel.setMonth(dateActuel.getMonth() + duree))
     }

     let saveAbo = new NewAbo(
        { ...newAbo }
    )
 
 

//    // push idNewAbo dans les abonnements du User
   await User.updateOne(
        {_id : req.body.client._id}, 
        { $push : { abonnement : saveAbo._id}}
    )
    saveAbo.save()
    .then(response => res.status(200).json(response))
    .catch(response => res.status(500).json(response))
    // .then(() => console.log("l'id du nouvel abonnement à bien été injecter dans les abonnements du User"))
    // .catch(err => res.status(500).json(err))

//     // save newAbo dans abos
//     newAbo.save()
//     .then(() => res.status(200).json({message : "L'abonnement à bien été créer !"}))
//     .catch(err => res.status(500).json(err))
}

exports.updateAbo = (req,res) => {
    // si l'abo est au MOIS check pour actif
    if (req.body.updateAbo.dateEcheance){
        if (new Date(req.body.updateAbo.dateEcheance) < Date.now()){
            req.body.updateAbo.actif = false
        }else { req.body.updateAbo.actif = true}
    }
    // si l'abo est type ENTREE => check pour actif 
    if(req.body.updateAbo.entreRestante){
        if (req.body.updateAbo.entreRestante <= 0){
            req.body.updateAbo.actif = false
        }else{ req.body.updateAbo.actif = true }
    }
  

    NewAbo.updateOne(
        {_id : req.body.updateAbo.idAboUpdate},
        { $set : {
            ...req.body.updateAbo
        }}    
    )
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => console.log(err))

}

exports.allAbo = (req,res) => {
    console.log(req.body)

    if (req.body.query.allAbo){
        NewAbo.find()
        .then(response => {res.status(200).json(response)})
        .catch(err => res.status(500).json({message : "impossible d'afficher tous les abonnements !"}))
    }else{
        NewAbo.find(    
            {  $or : [
                  {"titulaire.nom" : req.body.query.nom},
                  {"titulaire.prenom" : req.body.query.prenom},
                  {"titulaire.mail" : req.body.query.mail},          
              ]}
        )     
        .then(response => {res.status(200).json(response)})
        .catch(err => console.log(err))
    }
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

exports.sendNewsLetter = (req,res) => {
    let transporter = nodemailer.createTransport({
        host: "devise.o2switch.net",
        port: 587,
        secure: false,
        service: "o2switch",
        auth: {
            user: "info@monkey-school.ch",
            pass: process.env.MAIL_PW
        },
        debug: false,
        logger: true 
    });
    // POUR LE TEMPLATE
    transporter.use("compile", hbs({
        viewEngine : "express-handlebars",
        viewPath : "mail-template",
        extName: ".hbs"
        })
    )

    // Message object
    const messageFrom = "info@monkey-school.ch"
    // const messageTo = req.body.mail

    let mailToClient = {
        from: messageFrom,
        to: "c.bonvin@yahoo.fr",
        subject: "test fondation",
        template : "hero-min",
        context: {          
                nom : req.body.user.nom,                   
                prenom: req.body.prenom,                   
                text : req.body.mail.text,                      
        },
        // attachments: [{           
        //         filename: 'monkey-logo.jpeg',
        //         path: __dirname +'/images-mail/monkey-logo.jpeg',
        //         cid: 'monkey-logo',
        //     },
        //     {
        //         filename: 'monkey-logo.jpeg',
        //         path: __dirname +'/images-mail/monkey-logo.jpeg',
        //         content: 'le super logo',
        //         contentType: 'text/plain' 
        //     }
        // ],
        
    };

    transporter.sendMail(mailToClient, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            res.status(500).json( {mesage : "impossible d'envoyer le mail au client", error : err})
        } else{
            console.log("mail envoyé" + info)
            res.status(200).json("les mails ont été envoyé avec succès")
        }                
    })
}



