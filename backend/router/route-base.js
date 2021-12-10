const express = require("express")
const router = express.Router()
const ctrlUsers = require("../controler/ctrlUsers")
const ctrlBase = require("../controler/Ctrl-base")
const ctrlAdmin = require("../controler/ctrl-admin")

const auth = require("../middleware/auth")

router.get("/all-cours", ctrlBase.getAllCours);
router.post("/user/create", ctrlUsers.userIscription);
router.post("/user/connection", ctrlUsers.userConnection);
router.post("/user/upload",auth, ctrlUsers.userUpload )
router.post("/user/recherche",auth, ctrlUsers.userRecherche )

router.post("/user/panierBuffer",auth, ctrlUsers.userPanierBuffer )
router.post("/user/getPanierBuffer",auth, ctrlUsers.getPanierBuffer )

router.post("/admin/updateUser", auth, ctrlUsers.userUpdateFromAdmin)
router.post("/admin/deleteUser", auth, ctrlUsers.deleteUser)
router.post("/admin/update-abonnement", auth, ctrlAdmin.updateAbo)

// ADMIN
router.post("/admin/new-abo", auth, ctrlAdmin.newAbo)

//REFRESH
router.post("/refresh", auth, ctrlUsers.userRefresh)


module.exports = router