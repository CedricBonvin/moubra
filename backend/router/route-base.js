const express = require("express")
const router = express.Router()
const ctrlUsers = require("../controler/ctrlUsers")
const ctrlBase = require("../controler/Ctrl-base")

const auth = require("../middleware/auth")

router.get("/all-cours", ctrlBase.getAllCours);
router.post("/user/create", ctrlUsers.userIscription);
router.post("/user/connection", ctrlUsers.userConnection);
router.post("/user/upload",auth, ctrlUsers.userUpload )

router.post("/user/panierBuffer",auth, ctrlUsers.userPanierBuffer )
router.post("/user/getPanierBuffer",auth, ctrlUsers.getPanierBuffer )


router.post("/refresh", auth, ctrlUsers.userRefresh)


module.exports = router