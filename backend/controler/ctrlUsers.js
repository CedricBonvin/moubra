const Users = require("../model/model-users")
const PanierBuffer = require("../model/model-panierBuffer")
const Abo = require("../model/model-abo-base")
const NewsLetter = require("../model/model-newsLetter")

const jwt = require("jsonwebtoken")

exports.userIscription = async (req,res) => {
    let user = new Users({...req.body})
    let err = false
    let saveUser = true
    console.log(req.body)
    try {
        await user.save()    
    } catch  { err = true ; saveUser = false}

    if (req.body.newsLetter){
        if (saveUser){
            try {          
                let itemNewsLetter = new NewsLetter({ IdUser : user._id, mail : user.mail})
                    await itemNewsLetter.save()
            } catch { err = true }
        }
    }

    err === false ? res.status(200).json(user) : res.status(500).json({message : "problème pour enregister le user ou la news-letter"})  
}

exports.userConnection = (req,res) => {
    Users.findOne({mail : req.body.mail})
    .then(user => {
        if (!user){
            res.status(400).json({message : "limpossiblde de se connecter .. Mail non trouvé !"})
        }else{
            if (user.password === req.body.password){
                res.status(200).json({
                    user : user,
                    token: jwt.sign(    
                        { userId: user._id },
                        `clef de malade`,
                        { expiresIn: '24h' }
                    )
                })
            } else if (!user.password || user.password !==req.body.password){
                res.status(400).json({message : "Mot de passe incorrect !"})
            }
        }
    })
    .catch(err => res.status(500).json({erreur : err, message : "impossible de trouvé l'utilisateur..!"}))
}

exports.userUpload = (req,res) => {
    Users.updateOne(
        {_id : req.body.user._id},
        {...req.body.user}     
    )
    .then(() => res.status(200).json({message : "user update succès"}))
    .catch(err => res.status(500).json({erreur : err, message : "impossible de trouvé l'utilisateur..!"}))
}

exports.userRecherche = (req,res) => {
     Users.find(req.body.query).populate("abonnement")
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json({erreur : err, message : "impossible de trouvé l'utilisateur..!"}))
}

exports.userRefresh = (req,res) => {  
    Users.find({ _id : req.body.user._id})
    .then(response => res.status(200).json(response) )   
}

exports.userPanierBuffer = (req,res) => {
    PanierBuffer.updateOne(
        {id_user : req.body.user._id},
        { 
            id_users : req.body.user._id,
            $push: { panier : req.body.idAbo } 
        },
        {upsert : true}
    )
    .then(() => res.status(200).json({message : "ajouter dans le buffer"}))
    .catch(err => res.status(500).json({erreur : err, message : "impossible de rajouter le buffer panier" }))   
}

exports.getPanierBuffer = async (req,res) => {  
    let panierBuffer = await PanierBuffer.find({id_user : req.body.user._id})
    let panierSend = []
    for(let idAbo of panierBuffer[0].panier){
           let abo = await Abo.findById(idAbo)
            panierSend.push(abo)
    }
    res.status(200).json(panierSend)

    // PanierBuffer.find({id_user : req.body.user._id})
    // .then( response => {
    //     let panier = []
    //     for(let idAbo of response[0].panier){
    //         Abo.findById(idAbo)
    //         .then(abo => panier.push(abo))
    //         .catch(err => console.log(err))
    //     }
    //     console.log(panier)
    //     res.status(200).json(panier)
    // })
    // .catch(err => res.status(500).json({erreur : err, message : "impossible de rajouter le buffer panier" }))   
}

exports.userUpdateFromAdmin = (req,res) => {
    Users.updateOne(
        {_id : req.body.userToUpdate},
        {...req.body.userUpdate}     
    )
    .then(() => {
        Users.findById(req.body.userToUpdate)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
    })
    .catch(err => res.status(500).json({erreur : err, message : "impossible de trouvé l'utilisateur..!"}))
}

exports.deleteUser = (req,res) => {
    Users.remove({_id : req.body.userToDelete})
    .then(() => res.status(200).json({message : "utilisateur supprimé"}))
    .catch(err => res.status(500).json({erreur : err, message : "impossible de supprimer l'utilisateur..!"}))
}