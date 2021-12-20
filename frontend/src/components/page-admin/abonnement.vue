<template>
   <div>
       <h1>ABONNEMENT</h1>
       <modal :modal="modal" />
       <!-- CRÉER ABO -->
       <div class="containerCreerAbo ">
           <h2>CRÉER UN ABONNEMENT</h2>
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
                        <textarea type="text" id="titulaireRemarque" v-model="remarque"></textarea>
                    </div>
                    <div class="boxSelect">
                        <h4>SÉLECTIONER UN ABONNEMENT</h4>
                        <div>
                            <select class="selectAbo" v-model="choiceNewAbo">
                                <option v-for="item in selectChoixAbo" :key="item._id" :value="item._id" selected="selected">{{ item.abo}} {{ item.class}} </option>
                            </select>
                        </div> 
                    </div>                   
                </div>
                <div class="boxButton">
                        <button @click="newAbo" class="button validButton">CRÉER ABONNEMENT</button>
                    </div>
           </div>
       </div>
       <!-- RECHERCHE ABO ET CARTE ABO -->
       <div class="containerRechercheAbo">
            <h2>RECHERCHER UN ABONNEMENT</h2>
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
                <div class="boxAllAbo">
                    <label class="labelAllAbo" for="radioAllAbo" >AFFICHER TOUS LES ABONNEMENTS</label>
                    <input type="checkbox" id="radioAllAbo"  value="true" class="radioAllAbo" v-model="abonnementRecherche.allAbo">
                </div>
                
            </div> 
            <div class="boxInfoNbrAbo">
                <div class="abonnementTitle">ABONNEMENTS :</div>
                <div class="boxInfo">
                    <div class="fieldInfoAbo">Total : <span class="fieldInfo">{{allAbo.length}} </span></div>
                    <div class="fieldInfoAbo">Actif : <span class="fieldInfo fieldActif">{{infoAbo.actif}} </span></div>
                    <div class="fieldInfoAbo">Épuisé :<span class="fieldInfo fieldEpuise"> {{infoAbo.epuise}} </span></div>
                </div>
            </div>
            <!-- carte abo -->
            <div v-for="item in allAbo" :key="item._id">
                <carte-abo 
                    @rechercheAbo="rechercheAbonnement"
                    :item="item"
                    :modal="modal"
                />
            </div>                     
       </div> 
   </div>
</template>

<script>
import modal from '../forAll/modal.vue'
import CarteAbo from './comp-admin/carteAbo.vue'
export default {
  components: { modal, CarteAbo},
    name : "abonnement",
    data(){
        return{
            allAbo : [],
            newTitulaireAbo : {},
            choiceNewAbo : "" ,
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
            },
            idNewAbo : "",
            remarque : "",
            newEcheance  :{
                jour : 0,
                mois : 0,
                annee : 0
            }
        }
    },
    methods : {
        putSelectAbo(){
            fetch(`${this.$store.state.HOST}/all-cours`)
            .then(res => res.json() )
            .then(response => {
                this.selectChoixAbo = response.sort(function (a, b) {
                return a.position - b.position;
            })
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
                document.querySelector(".boxInfoNbrAbo").style.display = "block"
                return res.json()
            })
            .then(response => {
                this.allAbo = response.reverse()
                for(let item of response){
                    if(item.actif === true){
                        this.infoAbo.actif++
                    }else{
                        this.infoAbo.epuise++
                    }
                }
            })
        },
        newAbo(){
            let connection = JSON.parse(localStorage.getItem("connection"))
            let obj = {
                user : this.$store.state.user,
                idAbo: this.choiceNewAbo,
                titulaire : this.newTitulaireAbo,
                remarque : this.remarque
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
                this.modal.display = true
                this.modal.textBtnValid = "OK"
                if(res.status === 200){
                    this.modal.text = "ABONNEMENT CRÉE AVEC SUCCES !"
                }else if( res.status !== 200){
                    this.modal.text = "IMPOSSIBLE DE CRÉER L'ABONNEMENT !"
                }
                return res.json()
            })
            .then(response => console.log(response))
            .catch(err => console.log(err))
        }
    },
    beforeMount(){
        this.putSelectAbo()
    }
}
</script>

<style scoped>
    h1{
        padding: 50px;
        font-size: 50px;
        background: var(--bcg-header);
        color: white;
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
        color: rgb(75, 75, 75);
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
        max-width: 1000px;
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
        display: none;
        margin-top: 80px;
    }
    .boxInfo{
        display: flex;
        justify-content: center;
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
        text-align: center;
        font-size: 25px;
        font-weight: bold;
        letter-spacing: .1rem;
        padding-bottom: 20px;
    }
    .boxAllAbo{
        width: 100%;
        display: flex;
        align-items: center;
    }
    .radioAllAbo{
        margin-left: 10px;
    }
    label{
        cursor: pointer;
    }
    .labelAllAbo{
        color: blue;
        font-weight: bold;
    }
</style>