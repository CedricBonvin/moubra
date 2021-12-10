<template>
  <div>
        <modal v-if="modal.display" :modal="modal" />
    <!-- NEW USER -->
        <h2>Nouvelle utilisateur</h2>
        <div class="base">
            <h3>CRÉER USER</h3>
            <div class="boxCreateUser">
                <div class="ligne">
                    <label for="nom">Nom </label>
                    <input type="text" id="nom" v-model="newUser.nom">
                </div>
                <div class="ligne">
                    <label for="prenom">Prénom </label>
                    <input type="text" id="prenom" v-model="newUser.prenom">
                </div>
                <div class="ligne">
                    <label for="mail">E-mail </label>
                    <input type="text" id="mail" v-model="newUser.mail">
                </div>
                <div class="ligne">
                    <label for="pwd">Password </label>
                    <input type="text" id="pwd" v-model="newUser.password">
                </div>
                
                <div class="boxButtonNewUser">
                    <button @click="createUser" class="button validButton ">CRÉER USER</button>
                </div>
            </div>
        </div>
    <!-- RECHERCHE USER -->

        <div class="boxSearchUser">
            <h2>Chercher un Utilisateur</h2>
            <div class="base baseRecherche">

                <!-- BOX RECHERCHE -->
                <h3>RECHERCHER USER</h3>
                <div class="boxRecherche">
                    <div class="ligne">
                        <label for="nomRecherche">Nom </label>
                        <input type="text" id="nomRecherche" v-model="checkUser.nom">
                    </div>
                    <div class="ligne">
                        <label for="prenomRecherche">Prénom </label>
                        <input type="text" id="prenomRecherche" v-model="checkUser.prenom">
                    </div>
                    <div class="ligne">
                        <label for="emailRecherche">E-mail </label>
                        <input type="text" id="emailRecherche" v-model="checkUser.mail">
                    </div>
                </div>
                <button @click="rechercheUser" class="button validButton buttonCheckUser">RECHERCHE</button>
                <div v-if="noUser" class="correspondance">AUCUNE CORRESPONDANCE</div>

                <!-- CARTE USER -->
                <div class="boxUserFind">  
                    <div class="titleBoxUser">{{user.length}} USER TROUVÉ</div>
                    <div v-for="item in user" :key="item.id" class="carteUserFind" :id="item._id">
                        <h3 class="titleCarteUser">USER</h3>
                        <div class=" ligneCarteUser">
                            <label for="userNom">Nom </label>
                            <input type="text" id="userNom" disabled="true" :value="item.nom">
                        </div>
                        <div class=" ligneCarteUser">
                            <label for="userPrenom">Prenom </label>
                            <input type="text" id="userPrenom" disabled="true" :value="item.prenom">
                        </div>
                        <div class=" ligneCarteUser">
                            <label for="userMail">E-mail </label>
                            <input type="text" id="userMail" disabled="true" :value="item.mail">
                        </div>
                        <div class=" ligneCarteUser">
                            <label for="userPassword">Password </label>
                            <input type="text" id="userPassword" disabled="true" :value="item.password">
                        </div>
                        <div class="boxButtonRecherche">
                            <button  @click="modifierUser(item._id)" class="button validButton buttonModifierUser">MODIFIER USER</button>
                            <button  @click="annulerModifUser(item._id)" class="button dangerButton buttonCancelChange">ANNULER</button>
                            <button  @click="confirmUserUpdate(item._id)" class="button validButton buttonConfirmeChange">CONFIRMER</button>
                        </div>
                        <div class="boxAction">
                            <p  @click="displayAction(item._id,'.boxAbonnement',$event)" class="linkAction linkAjouterAbo">AJOUTER ABONNEMENT</p>
                            <p @click="displayAction(item._id,'.boxAboUser',$event)" class="linkAction linkTousLesAbonnement">TOUS LES ABONNEMENTS</p>
                        </div>

                        <!-- ABONNEMENT -->
                            <!-- USER TOUS LES ABO -->
                        <div  class="boxAboUser">
                            <div class="headerboxResult">
                                <h4>NBR ABONNEMENTS : {{ item.abonnement.length}}</h4>
                                <p @click="closeBox(item._id,'.boxAboUser')" class="closeHeaderBoxResult">X</p>
                            </div>
                            <p v-if="item.abonnement.length === 0" class="aucunAbo">AUCUN ABONNEMENT</p>
                            <div v-for="item in item.abonnement" :key="item._id">
                                <div :id="item._id" class="carteAbo">
                                    <p v-if="item.entreRestante > 0" class="statusAbo aboActif">ACTIF</p>
                                    <p v-else class="statusAbo aboEpuise">ÉPUISE</p>
                                    <div class="headerCarteAbo">
                                        <div class="ColCarteAbo">TITULAIRE</div>
                                        <div class="ColCarteAbo">TYPE</div>
                                        <div class="ColCarteAbo">NPA VILLE</div>
                                        <div class="ColCarteAbo">ENTRE <br> RESTANTE</div>
                                        <div class="ColCarteAbo">PRIX</div>
                                        
                                    </div>
                                    <div class="bodyCarteAbo">
                                        <div class="ColCarteAbo">{{ item.titulaire.nom}} {{item.titulaire.prenom}}</div>
                                        <div class="ColCarteAbo">{{ item.abo}}</div>
                                        <div class="ColCarteAbo">{{ item.titulaire.npa}} {{ item.titulaire.ville}}</div>
                                        <div class="ColCarteAbo"><input  type="number" max="10" min="0" class="inputEntre" disabled v-model="item.entreRestante"></div>
                                        <div class="ColCarteAbo">{{ item.prix}}</div>
                                    </div>
                                        <!-- <div class="boxRemarqueCarte">
                                            <label for="carteRemarque">Remarque</label>
                                            <textarea class="ColCarteAbo carteRemarque" id="carteRemarque" v-model="item.remarque"></textarea>
                                        </div> -->
                                    <div class="boxButtonCarte">
                                        <button class="button validButton buttonModifierAbo" @click="modifierAbo(item._id)">MODIFIIER</button>
                                        <button class="button dangerButton buttonCancelModifAbo" @click="cancelModifierAbo(item._id)">ANNULER</button>
                                        <button class="button validButton buttonUpdateAbo" @click="updateAbo(item)">CONFIRMER</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                            <!-- AJOUTER ABO -->
                        <div class="boxAbonnement">
                            <div class="headerboxResult">
                                <h4> TITULAIRE NOUVEL ABONNEMENT</h4>
                                <p @click="closeBox(item._id,'.boxAbonnement')"  class="closeHeaderBoxResult">X</p>
                            </div>
                            <div class="actionAbonnement">
                                <div class="boxTitulaire">
                                    <div class=" ligneCarteTitulaire">
                                        <label for="titulaireNom">Nom </label>
                                        <input type="text" id="titulaireNom" v-model="newTitulaireAbo.nom">
                                    </div>
                                    <div class=" ligneCarteTitulaire">
                                        <label for="titulairePrenom">Prenom </label>
                                        <input type="text" id="titulairePrenom" v-model="newTitulaireAbo.prenom">
                                    </div>   
                                    <div class=" ligneCarteTitulaire">
                                        <label for="titulaireMail">Email </label>
                                        <input type="text" id="titulaireMail" v-model="newTitulaireAbo.mail">
                                    </div>
                                    <div class=" boxNpaVille">
                                        <div class=" boxNpa ">
                                            <label for="titulaireNpa">Npa </label>
                                            <input type="text" id="titulaireNpa" v-model="newTitulaireAbo.npa">
                                        </div>
                                        <div class="boxVille">
                                            <label for="titulaireVille">Ville </label>
                                            <input type="text" id="titulaireVille" v-model="newTitulaireAbo.ville">
                                        </div>
                                    </div>
                                    <div class=" ligneCarteTitulaire remarqueTitulaire">
                                        <label for="titulaireRemarque">Remarque </label>
                                        <textarea type="text" id="titulaireRemarque"></textarea>
                                    </div>
                                </div>
                                
                                <span class="choiceActionAbo">CHOISISSEZ VOTRE ABO</span>                  
                                <select v-model="choiceNewAbo">
                                    <option v-for="item in selectChoixAbo" :key="item._id" :value="item._id" selected="selected">{{ item.abo}} </option>
                                </select>
                                <button @click="ajouterNewAbo(item)" class="button validButton">CRÉER ABONNEMENT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import modal from '../forAll/modal.vue'
export default {
  components: { modal },
    name : "create-user",
    data(){
        return{
            newUser : {},
            checkUser : {},
            modal : {
                display : false,
                text : "ok la modal",
                textBtnValid : "OK",
           
            },
            user : [],  
            noUser : false,
            selectChoixAbo : [],
            choiceNewAbo : "",
            newTitulaireAbo : {}
        }
    },
    methods : {
        createUser(){
            fetch(`${this.$store.state.HOST}/user/create`, {
                method : "POST",
                body : JSON.stringify(this.newUser),
                headers: {"Content-type": "application/json; charset=UTF-8",}
            })
            .then(res => {
                if(res.ok){
                    
                    this.modal.display = true
                    this.modal.text = "Le user à bien été enregister !"
                }
                return res.json()
            } )
            .then(response => {
                console.log(response)
            })
        },
        rechercheUser(){
            let connection = JSON.parse(localStorage.getItem("connection"))
            let query = {}
            this.checkUser.nom ? query.nom = this.checkUser.nom : null
            this.checkUser.prenom ? query.prenom = this.checkUser.prenom : null
            this.checkUser.mail ? query.mail = this.checkUser.mail : null

            let obj = {
                user : this.$store.state.user,
                query : {...query}
            }

            fetch(`${this.$store.state.HOST}/user/recherche`, {
                method : "POST",
                body : JSON.stringify(obj),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer" +" "+ connection.token,
                }
            })
            .then(res => res.json())
            .then(response => {           
                response.length === 0 ? this.noUser = true : this.noUser = false
                // inverse l'ordre des abos
                for(let item of response){
                    item.abonnement.reverse()
                }
                this.user = response
            })
        },
        modifierUser(id){
            let parent = document.getElementById(id)
            let tabInput = parent.querySelectorAll(".ligneCarteUser input")

           parent.querySelector(".buttonCancelChange").style.display = "block"
           parent.querySelector(".buttonConfirmeChange").style.display = "block"
           parent.querySelector(".buttonModifierUser").style.display = "none"
           
           
            for(let item of tabInput){
                item.removeAttribute("disabled")
                item.style.background = "red"
                item.style.color = "white"

            }
        },
        annulerModifUser(id){
     
            let parent = document.getElementById(id)
            let tabInput = parent.querySelectorAll(".ligneCarteUser input")

            parent.querySelector(".buttonCancelChange").style.display = "none"
            parent.querySelector(".buttonConfirmeChange").style.display = "none"
            parent.querySelector(".buttonModifierUser").style.display = "block"

            for(let item of tabInput){
                item.setAttribute("disabled","disabled")
                item.style.background = "none"
                item.style.color = "black"

            }
            this.rechercheUser()
        },
        confirmUserUpdate(id){

            let connection = JSON.parse(localStorage.getItem("connection"))
            let parent = document.getElementById(id)

            parent.querySelector(".buttonCancelChange").style.display = "none"
            parent.querySelector(".buttonConfirmeChange").style.display = "none"
            parent.querySelector(".buttonModifierUser").style.display = "block"

            let obj = {
                user : this.$store.state.user,
                userToUpdate : id,
                userUpdate : {
                    nom : parent.querySelector("#userNom").value,
                    prenom : parent.querySelector("#userPrenom").value,
                    mail : parent.querySelector("#userMail").value,
                    password : parent.querySelector("#userPassword").value,
                }
            }
            fetch(`${this.$store.state.HOST}/admin/updateUser`, {
                method : "POST",
                body : JSON.stringify(obj),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer" +" "+ connection.token,
                }
            })
            .then( res => {
                if (res.status === 200){
                    this.modal.display = true
                    this.modal.text = " UTILISATEUR BIEN MIS À JOUR !"
                  
                }
                if(res.status !== 200) {
                    this.modal.display = true
                    this.modal.text = " IMPOSSIBLE DE METTRE L'UTILISATEUR À JOUR !"
                    document.querySelector(".containerModalInfo").style.background = "red"
                }
                return res.json()
            })
            .then(response => {
                let parent = document.getElementById(id)
                let tabInput = parent.querySelectorAll(".ligneCarteUser input")
                this.tryModifUser = false
                // gère le les input
                for(let item of tabInput){
                    item.setAttribute("disabled","disabled")
                    item.style.background = "none"
                    item.style.color = "black"
                }
                // remet à jour les input avec les nouvelles valeurs du user
                for(let item of this.user){
                    if(item._id === id){
                        item.prenom = response.prenom
                        item.nom = response.nom
                        item.mail = response.mail
                        item.password = response.password
                    }
                }
            })
            .catch(err => console.log(err))
        },
        // deleteUser(id){
        //     let connection = JSON.parse(localStorage.getItem("connection"))
        //     let obj = {
        //         user : this.$store.state.user,
        //         userToDelete : id,
        //     }
        //     fetch(`${this.$store.state.HOST}/admin/deleteUser`, {
        //         method : "POST",
        //         body : JSON.stringify(obj),
        //         headers: {
        //             "Content-type": "application/json; charset=UTF-8",
        //             Authorization: "Bearer" +" "+ connection.token,
        //         }
        //     })
        //     .then(res => res.json())
        //     .then(() => {
        //         console.log("user supprimé")
        //         this.rechercheUser()
        //     })
        //     .catch(err => console.log(err))
        // },
        putSelectAbo(){
            fetch(`${this.$store.state.HOST}/all-cours`)
            .then(res => res.json() )
            .then(response => {
                this.selectChoixAbo = response
            })
            .catch(err => console.log(err))
        },
        ajouterNewAbo(item){
            let connection = JSON.parse(localStorage.getItem("connection"))
            let obj = {
                user : this.$store.state.user,
                idAbo : this.choiceNewAbo,
                client : item,
                titulaire : this.newTitulaireAbo,
                remarque : document.getElementById("titulaireRemarque").value
            }

            fetch(`${this.$store.state.HOST}/admin/new-abo`, {
                method : "POST",
                body : JSON.stringify(obj),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer" +" "+ connection.token,
                }
            })
            .then(res => {
                if (res.status === 200){
                    this.modal.display = true
                    this.modal.text = "Le nouvel abonnement à bien été créer !"

                    let parent = document.getElementById(item._id)
                    parent.querySelector(".boxAbonnement").style.display = "none"
                    parent.querySelector(".boxAboUser").style.display = "block"

                    let allLinkAction = parent.querySelectorAll(".linkAction")
                    allLinkAction[0].classList.remove("selectLink")
                    allLinkAction[1].classList.add("selectLink")


                    this.rechercheUser()
                }
                if(res.status !== 200){
                    this.modal.display = true
                    this.modal.text = "Impossible de créer le nouvel abonnement !"
                }
                
                return res.json()
            })
            .then(response => {
               console.log(response)
            })
            .catch(err => console.log(err))
        },
        displayAction(id,elId,e){
 
            let parent = document.getElementById(id)
            let cible =  parent.querySelector(elId)
     
            parent.querySelector(".boxAboUser").style.display = "none"
            parent.querySelector(".boxAbonnement").style.display = "none"
            cible.style.display = "block"

            let items = parent.querySelectorAll(".linkAction")

            for(let item of items){
                item.classList.remove("selectLink") 
            }
            e.target.classList.add("selectLink")
          
        },     
        modifierAbo(id){
            let parent = document.getElementById(id)
            parent.querySelector(".buttonCancelModifAbo").style.display = "block"
            parent.querySelector(".buttonModifierAbo").style.display = "none"
            parent.querySelector(".buttonUpdateAbo").style.display = "block"

            parent.querySelector(".inputEntre").removeAttribute("disabled")
            parent.querySelector(".inputEntre").classList.add("modifier")
        },
        cancelModifierAbo(id){
            let parent = document.getElementById(id)
            parent.querySelector(".buttonCancelModifAbo").style.display = "none"
            parent.querySelector(".buttonModifierAbo").style.display = "block"
            parent.querySelector(".buttonUpdateAbo").style.display = "none"

            parent.querySelector(".inputEntre").setAttribute("disabled","true")
            parent.querySelector(".inputEntre").classList.remove("modifier")

            this.rechercheUser()
        },
        updateAbo(item){
            let parent = document.getElementById(item._id)
            parent.querySelector(".buttonCancelModifAbo").style.display = "none"
            parent.querySelector(".buttonModifierAbo").style.display = "block"
            parent.querySelector(".buttonUpdateAbo").style.display = "none"

            parent.querySelector(".inputEntre").setAttribute("disabled","true")
            parent.querySelector(".inputEntre").classList.remove("modifier")

            let connection = JSON.parse(localStorage.getItem("connection"))
            let obj = {
                user : this.$store.state.user,
                updateAbo: item,
            }
            fetch(`${this.$store.state.HOST}/admin/update-abonnement`, {
                method : "POST",
                body : JSON.stringify(obj),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer" +" "+ connection.token,
                }
            })
            .then(res =>{ 
                if(res.status === 200){
                    this.modal.display = true
                    this.modal.text = "L'ABONNEMENT À BIEN ÉTÉ MIS À JOUR !"
                }
                if (res.status !== 200){
                    this.modal.display = true
                    this.modal.text = "IMPOSSIBLE DE METTRE À JOUR L'ABONNEMENT"
                }
                return res.json()
            } )
            .then(()=> {
                this.rechercheUser()
            })
            .catch(err => console.log(err))
        },
        closeBox(parenId,cibleClass){
            let parent = document.getElementById(parenId)
            let cible = parent.querySelector(cibleClass)

            cible.style.display = "none"

            let tabLink = parent.querySelectorAll(".selectLink")
            for (let item of tabLink){
                item.classList.remove("selectLink")
            }
        }
    },
    beforeMount(){
        this.putSelectAbo()
    }
}
</script>

<style scoped>
   
   .base{
       box-shadow: 0 0 15px 10px lightgray;
       width: 80%;
       margin: auto;
       padding: 10px;
   }
   input{
       max-width: 200px;
   }
   .baseRecherche{
       width: 90%;
   }
    .boxCreateUser{
        display: flex;
        flex-flow: wrap;
    }
    .boxSearchUser{
        margin-bottom: 100px;
    }
    .boxButtonNewUser{
        width: 100%;
        display: flex;
        justify-content: right;
    }
    h2{
        font-weight: bold;
        font-size: 30px;
        padding: 50px;
        text-decoration: underline;
    }
    h3{
        background: gray;
        color: white;
        display: inline-block;
        padding: 10px;
    }
    .ligne{
        display: flex;
        flex-flow: column;
        width: 40%;
        margin:10px auto;
    }
    .ligneCarteUser{
        width: 40%;
        display: flex;
        flex-flow: column;
        margin: 10px 0;
    }
    .ligneCarteTitulaire{
        width: 40%;
        display: flex;
        flex-flow: column;
        margin: 10px 0;
    }
   
    .buttonCheckUser{
        display: block;
        margin: 10px auto;
    }
    .boxRecherche{
        display: flex;
        align-items: center;
    }
    .carteUserFind{
        position: relative;
        display: flex;
        flex-flow: wrap;
        justify-content: space-evenly;
        width: 90%;
        box-shadow: 0 0 10px 5px lightgray;
        margin: 60px auto;
    }
    .carteUserFind{
        padding: 20px;
    }
    .boxButtonRecherche{
        width: 100%;
        display: flex;
        justify-content: right;
        padding: 10px;
    }
    .buttonConfirmeChange{
        margin-left: 40px;
        display: none;
    }
 
    .correspondance{
        text-align: center;
        font-weight: bold;
        color: gray;
        font-size: 20px;
    }
    .titleCarteUser{
        position: absolute;
        top: 0px;
        left: 0;
        font-size: 14px;
        padding: 3px 20px;
    }
    .boxAbonnement{
        display: none;
        width: 100%;
        background: rgb(230, 230, 230);
        padding: 10px;
    }
    .boxAboUser{
        display: none;
        width: 100%;
        margin: 40px 0;
    }
    .choiceActionAbo{
        cursor: pointer;
        transition : .3s;
        font-size: 14px;
        text-decoration: underline;
        font-weight: bold;
    }
    .choiceActionAbo:hover{
        color: blue;
        font-weight: bold;
    }
    select{
        display: block;
        padding: 5px;
        margin: 10px;
    }
    .carteAbo{
        position: relative;
        width: 95%;
        box-shadow:  0 0 10px 5px lightgray;
        padding: 10px;
        margin: 30px auto;
    }
    .ColCarteAbo{
        width: 30%;
        text-align: center ;   
    }
    .headerCarteAbo{
        display: flex;
        padding: 10px 0;
        border-bottom: gray 1px solid;
        font-weight: bold;
    }
    .bodyCarteAbo{
        display: flex;
        padding: 10px 0;
        text-align: center;
    }
    .boxAction{
        display: flex;
        justify-content: space-evenly;
        padding: 10px;
        width: 100%;
    }
    .linkAction{
        cursor: pointer;
        font-weight: bold;
        transition: .3s;
    }
    .linkAction:hover{
        color: blue;
        text-decoration: underline;
        transform: scale(1.1);
    }
    .boxTitulaire{
        display: flex;
        flex-flow: wrap;
        justify-content: space-evenly;
        padding: 10px;   
    }
    .remarqueTitulaire{
        width: 100%;
    }
    textarea{
        border: none;
        width: 400px;
    }
    .boxNpa, .boxVille{
        display: flex;
        flex-flow: column;
    }
    .boxNpaVille{
        display: flex;
        justify-content: left;
        width: 40%;
        margin: 10px 0;
    }
    .boxNpa{
        width: 50px;
        margin-right: 10px;
    }
    .boxButtonCarte{
        width: 100%;
        display: flex;
        justify-content: right;
        margin-top: 20px;
        padding: 0 20px;
    }
    .inputEntre{
        width: 50px;
        font-weight: bold;
    }
    .aucunAbo{
        text-align: center;
        font-weight: bold;
        color: gray;
        font-size: 30px;
        padding-top: 20px;
    }
    .selectLink{
        color: blue;
        font-size: 1.1rem;
        text-decoration: underline;
    }
    .boxRemarqueCarte{
        display: flex;
        flex-flow: column;
        font-weight: bold;
        color: blue;
        padding-left: 50px;
        margin-top: 20px;
    }
    .carteRemarque{
        width: 50%;
        background: rgb(240, 240, 240);
        font-family: sans-serif;
    }
    .headerboxResult{
        display: flex;
        justify-content: space-between;
    }
    .closeHeaderBoxResult{
        font-weight: bold;
        color: gray;
        font-size: 20px;
        margin-right: 20px;
        cursor: pointer;
    }
    .buttonCancelChange{
        display: none;
    }
    .buttonModifierUser{
        display: block;
    }
    .statusAbo{
        position: absolute;
        top: 0px;
        left: -20px;
        transform: rotate(-45deg);
        font-weight: 900;
        background: white;
    }
    .aboActif{
        color: green;
    }
    .aboEpuise{
        color: red;
    }
    .buttonModifierAbo{
        display: block;
    }
    .buttonCancelModifAbo{
        display: none;
        margin-right: 20px;
    }
    .buttonUpdateAbo{
        display: none;
    }
    .modifier{
        background: red;
        color: white;
    }

</style>