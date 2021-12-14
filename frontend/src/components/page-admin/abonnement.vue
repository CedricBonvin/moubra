<template>
   <div>
       <h1>ABONNEMENT</h1>
       <modal :modal="modal" />
       <!-- CRÉER ABO -->
       <div class="containerCreerAbo ">
           <h2>Créer un abonnement</h2>
           <div class="boxCreerAbo shadow">
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
                    
                </div>
                <div class="boxRemarqueChoiceAbo">
                    <div class=" ligneCarteTitulaire">
                        <label for="titulaireRemarque">Remarque </label>
                        <textarea type="text" id="titulaireRemarque"></textarea>
                    </div>
                    <div class="boxSelect">
                        <h4>SÉLECTIONER UN ABONNEMENT</h4>
                        <div>
                            <select class="selectAbo" v-model="choiceNewAbo">
                                <option v-for="item in selectChoixAbo" :key="item._id" :value="item._id" selected="selected">{{ item.abo}} </option>
                            </select>
                        </div> 
                    </div>                   
                </div>
                <div class="boxButton">
                        <button class="button validButton">CRÉER ABONNEMENT</button>
                    </div>
           </div>
       </div>
       <!-- RECHERCHE ABO ET CARTE ABO -->
       <div class="containerRechercheAbo">
            <h2>Rechercher un abonnement</h2>
            <div class="boxRechercheInput shadow ">
                <div class="ligneRecherche">
                    <label for="rechercheNom">Nom</label>
                    <input type="text" id="rechercheNom" v-model="abonnementRecherche.nom">
                </div>
                <div class="ligneRecherche">
                    <label for="recherchePrenom">Prenom</label>
                    <input type="text" id="recherchePrenom" v-model="abonnementRecherche.prenom">
                </div>
                <div class="ligneRecherche">
                    <label for="rechercheMail">E-mail</label>
                    <input type="text" id="rechercheMail" v-model="abonnementRecherche.mail">
                </div>
                <div class="boxButton">
                    <button @click="rechercheAbonnement" class="button validButton">CHERCHER</button>
                </div>
                <div class="boxInfoNbrAbo">
                    <div class="abonnementTitle">ABONNEMENTS :</div>
                    <div class="boxInfo">
                        <div class="fieldInfoAbo">Total : <span class="fieldInfo">{{allAbo.length}} </span></div>
                        <div class="fieldInfoAbo">Actif : <span class="fieldInfo fieldActif">{{infoAbo.actif}} </span></div>
                        <div class="fieldInfoAbo">Épuisé :<span class="fieldInfo fieldEpuise"> {{infoAbo.epuise}} </span></div>
                    </div>
                </div>

                <!-- CARTE ABO -->
                <div v-for="item in allAbo" :key="item._id" class="boxAffichageAbo" :id="item._id">
                    
                    <div class="carteAbo shadow">
                        <div v-if="item.entreRestante > 0" class="statusAbo actif">ACTIF</div>
                        <div v-else class="statusAbo epuise ">ÉPUISÉ</div>
                        <div class="headerCarteAbo">
                            <p class="col">TITULAIRE</p>
                            <p class="col">TYPE</p>
                            <p class="col">E-MAIL</p>
                            <p class="col">NPA / VILLE</p>
                            <p class="col">ENTRE <br> RESTANTE</p>
                        </div>
                        <div class="bodyCarteAbo">
                            <p class="col">{{item.titulaire.nom}} {{ item.titulaire.prenom}}</p>
                            <p class="col">{{item.abo}}</p>
                            <p class="col"> {{ item.titulaire.mail}}</p>
                            <p class="col">{{item.titulaire.npa }} {{ item.titulaire.ville}}</p>
                            <p class="col "> <input class="inputEntreRestante" type="number" disabled v-model="item.entreRestante"></p>
                        </div>
                        <div class="boxButton">
                            <button @click="modifierAbo(item._id,$event)" class="button validButton modifButton">MODIFIER</button>
                            <button @click="cancelModif(item._id)" class="button dangerButton cancelEtConfirm">ANNULER</button>
                            <button @click="confirmModif(item)" class="button validButton cancelEtConfirm">CONFIRMER</button>
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
    name : "abonnement",
    data(){
        return{
            allAbo : [],
            newTitulaireAbo : {},
            choiceNewAbo :{} ,
            selectChoixAbo : [],
            abonnementRecherche : {},
            modal : {
                display : false,
                text : "",
                textBtnValid : "OK"
            },
            infoAbo : {
                total : 0,
                actif : 0,
                epuise : 0
            }
        }
    },
    methods : {
         putSelectAbo(){
            fetch(`${this.$store.state.HOST}/all-cours`)
            .then(res => res.json() )
            .then(response => {
                this.selectChoixAbo = response
            })
            .catch(err => console.log(err))
        },
        rechercheAbonnement(){
            // clean infoAbo
            for(let item in this.infoAbo){
                this.infoAbo[item] = 0
            }
            let connection = JSON.parse(localStorage.getItem("connection"))
            let obj = {
                user : this.$store.state.user,
                query : this.abonnementRecherche
            }
            fetch(`${this.$store.state.HOST}/admin/all-abo`, {
                method : "POST",
                body : JSON.stringify(obj),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer" +" "+ connection.token,
                }
            })
            .then(res => {
                return res.json()
            })
            .then(response => {
                this.allAbo = response.reverse()
                for(let item of response){
                    if(item.entreRestante === 0){
                        this.infoAbo.epuise++
                    }else{
                        this.infoAbo.actif++
                    }
                }
            })
        },
        modifierAbo(id,e){
            let parent = document.getElementById(id)
            let tabButton = parent.querySelectorAll(".cancelEtConfirm")
            for(let item of tabButton){
                item.style.display ="block"
            }
            e.target.style.display = "none"

            parent.querySelector(".inputEntreRestante").classList.add("modifEntre")
            parent.querySelector(".inputEntreRestante").removeAttribute("disabled")
        },
        cancelModif(id){
            let parent = document.getElementById(id)
            let tabButton = parent.querySelectorAll(".cancelEtConfirm")

            for(let item of tabButton){
                item.style.display ="none"
            }

            parent.querySelector(".inputEntreRestante").classList.remove("modifEntre")
            parent.querySelector(".inputEntreRestante").setAttribute("disabled","disabled")
            parent.querySelector(".modifButton").style.display = "block"

            this.rechercheAbonnement()
        },
         confirmModif(item){
            let parent = document.getElementById(item._id)
            let tabButton = parent.querySelectorAll(".cancelEtConfirm")
            for(let i of tabButton){
                i.style.display = "none"
            }
            parent.querySelector(".modifButton").style.display = "block"

            parent.querySelector(".inputEntreRestante").setAttribute("disabled","true")
            parent.querySelector(".inputEntreRestante").classList.remove("modifEntre")

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
                this.rechercheAbonnement()
            })
            .catch(err => console.log(err))
        },
    },
    beforeMount(){
        this.putSelectAbo()
    }
}
</script>

<style scoped>
    h1{
        text-align: center;
        padding-top: 50px;
        font-size: 40px;
    }
    .boxCreerAbo{
        margin: 20px auto;
        max-width: 800px;
        padding: 20px;
    }
    h2{
        font-size: 30px;
        padding-bottom: 20px;
        text-decoration: underline;
        font-weight: bold;
        padding-left: 40px;
    }
    h3{
        margin-top: 30px;
    }
    
    .containerCreerAbo{
   
        margin: 50px auto;
        padding : 20px;
    }
    .boxTitulaire{
        display: flex;
        flex-flow: wrap;
        justify-content: space-evenly;
    }
    .ligneCarteTitulaire{
        margin: 10px 0;
        display: flex;
        flex-flow: column;
        width: 40%;
  
    }
    .boxNpaVille{
        display: flex;
        width: 40%;
    }
    .boxNpa, .boxVille{
        display: flex;
        flex-flow: column;
    }
    .boxVille{
        flex-grow: 1;
        margin-left: 20px;
    }
    #titulaireNpa{
        width: 50px;
    }
    .boxButton{
        display: flex;
        justify-content: right;
        padding-right: 20px;
        margin-top: 20px;
    }
    
    #titulaireRemarque{
        display: block;
        width: 200px;
    }
    .boxRechercheInput{
        display: flex;
        flex-flow: wrap;
        justify-content: space-evenly;
        margin: 20px auto;
        max-width: 800px;
        padding: 20px;
    }
    .ligneRecherche{
        display: flex;
        flex-flow: column;
        width: 30%;
    }
    .containerRechercheAbo{
        padding: 20px;
    }
    .boxButton{
        width: 100%;
        display: flex;
        justify-content: right;
        padding-right: 20px;
    }
    .boxAffichageAbo{
        width: 100%;
        margin-top: 50px;
    }
    .carteAbo{
        position: relative;
        width: 100%;
        padding: 20px;
    }
    .headerCarteAbo{
        display: flex;
        justify-content: space-evenly;
        border-bottom: solid 1px lightgray;
        padding-bottom: 10px;
        font-weight: bold;     
    }
    .bodyCarteAbo{
        display: flex;
        justify-content: space-evenly;
        padding: 10px;
    }
    .col{
        width: 20%;
        text-align: center;
    }
    .statusAbo{
        position: absolute;
        top: 0;
        left: -10px;
        transform: rotate(-45deg);
        background: white;
        padding: 3px;
        font-weight: 900;
    }
    .actif{
        color: green;
    }
    .epuise{
        color: red;
    }
    .inputEntreRestante{
        width: 50px;
    }
    .cancelEtConfirm{
        display: none;
        margin-left: 20px;
    }
    .modifEntre{
        background: red;
        color: white;
    }
    .modifButton{
        display: block;
    }
    .boxRemarqueChoiceAbo{
        display: flex;
        justify-content: space-between;
    }
    .boxSelect{
        display: flex;
        align-items: center;
    }
    .selectAbo{
        margin-left: 20px;
    }
    .boxInfoNbrAbo{
        width: 100%;
    }
    .boxInfo{
        display: flex;
        justify-content: left;
    }
    .fieldInfoAbo{
        margin-right: 20px;
    }
    .fieldInfo{
        font-weight: bold;
        font-size: 1.2rem;
    }
    .fieldActif{
        color: green;
    }
    .fieldEpuise{
        color: red;
    }
    .abonnementTitle{
        font-weight: bold;
        text-decoration: underline;
        padding-bottom: 10px;
    }

</style>