const express = require("express")
const app = express()
const mongoose = require("mongoose")
// const history = require("connect-history-api-fallback")
const path = require('path')

require('dotenv').config();

 const RouteAbo = require("./router/route-base")
// const RouteLivre = require("./router/routeLivre")
// const RouteInscription = require("./router/routeNewInscription")
// const RoutePlaceRestante = require("./router/routePlaceRestante")
// const routeAdmin= require("./router/routeAdmin")

//***************************************
// CONNECTION A MONGO ATLAS   ***********
//***************************************

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.xgq9p.mongodb.net/moubraDB?retryWrites=true&w=majority`,
{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connexion à MongoDB réussie !')
  })
  .catch(err => {
      console.log('Connexion à MongoDB échouée et oui c est la merde !')
      console.log(err)
    });


app.use((req, res, next) => {                              
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//***************************************
// PARSE DU BODY REQUEST   **************
//***************************************

//  app.use(bodyParser.json())  body-parser est déprécié utiliser les 2 lignes suivantes---
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

app.use("/test", (req,res) => {
    res.status(200).json({message : "ok pour la route test"})
})
2

//***************************************
// ECOUTE   *****************************
//***************************************
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port,()=>console.log("serveur écoute sur le port : " + port));


//***************************************
// ROUTES UTILISES  *********************
//***************************************


// app.use(express.static(__dirname + "/public_html"));
// app.use(express.static(path.join(__dirname, '..', 'public_html'))); 

// app.use(express.static(__dirname + "/router"));

 app.use("/", RouteAbo)
// app.use("/", RouteLivre)
// app.use("/", RouteInscription)
// app.use("/", RoutePlaceRestante)
// app.use("/", routeAdmin)

// app.use(express.static(__dirname))


// app.use(history({
//   disableDotRule: true,  // pour le reload !!! important de servir le dossier static avant ce middleware et après !!!!!!!
//   verbose: true
// }));
//  app.use(express.static(__dirname + "/public_html"));



//  app.use(express.static(path.join(__dirname, '..', 'public_html'))); 





