<template>
  <div class="pagePlanning">
      <modal :modal="modal" />
      <h1>PLANNING...</h1>
      
      <div class="boxAjouterDate shadow paper">
          <h3>PROLONGER LE PLANNING JUSQU'AU...</h3>
          <div class="boxChoixDate">
              <div class="boxInputDate">
                  <div class="ligne">
                       <label for="choiceJour">JOUR</label>
                      <input type="number" id="choiceJour" v-model="dateEnd.jour">
                  </div>
                  <div class="ligne">
                      <label for="choiceMois">MOIS</label>
                      <input type="number" id="choiceMois" v-model="dateEnd.mois">
                  </div>
                  <div class="ligne">
                      <label for="choiceAnnee">ANNÉE</label>
                      <input type="number" id="choiceAnnee" v-model="dateEnd.annee">
                  </div>
              </div>
              <div>
                  <button @click="prolongerPlanning" class="button validButton">PROLONGER</button>
              </div>
          </div>
      </div>

        <!-- BOX AFFICHAGE  -->
      <div class="containerAffichePlannig shadow">
          <h2>AFFICHER LE PLANNING</h2>
          <div class="boxAfficheDate">
              <p class="duAu">DU</p>
              <div class="boxDebutAffichage">
                  <div class="ligneDateAffichage">
                      <label for="affichageChoiceJour" >Jour</label>
                      <input type="number" v-model="dateAffichageDebut.jour">
                  </div>
                  <div class="ligneDateAffichage">
                      <label for="affichageChoiceMois" >Mois</label>
                      <input type="number" v-model="dateAffichageDebut.mois">
                  </div>
                  <div class="ligneDateAffichage">
                      <label for="affichageChoiceAnnee" >Anne</label>
                      <input type="number" v-model="dateAffichageDebut.annee">
                  </div>
              </div>
              <p class="duAu au">AU</p>
              <!-- date fin -->
              <div class="boxDebutAffichage">
                  <div class="ligneDateAffichage">
                      <label for="affichageChoiceJour" >Jour</label>
                      <input type="number" v-model="dateAffichageFin.jour">
                  </div>
                  <div class="ligneDateAffichage">
                      <label for="affichageChoiceMois" >Mois</label>
                      <input type="number" v-model="dateAffichageFin.mois">
                  </div>
                  <div class="ligneDateAffichage">
                      <label for="affichageChoiceAnnee" >Anne</label>
                      <input type="number" v-model="dateAffichageFin.annee">
                  </div>
              </div>
          </div>
          <div class="boxButton boxButtonAfficher">
              <button @click="affichePlanning" class="button validButton">AFFICHER</button>
            </div>
      </div>

      <!-- box planning -->
      <div class="containerPlanning paper shadow">
          <div class="headerPlanning">
              <div class="col colDate">DATE</div>
              <div class="col colCollaborateur1">COLLABORATEUR 1</div>
              <div class="col colCollaborateur2">COLLABORATEUR 2</div>
              <div class="col colRemarque">REMARQUE</div>
          </div>
          <div class="boxUpdateButton">
              <button @click="modifierPlanning" class="modifierPlanning button validButton">MODIFIER</button>
              <button @click="cancelUpdatePlanning" class="cancelUpdate button dangerButton">ANNULER</button>
              <button @click="updatePlanning" class="confirmUpdate button validButton">CONFIRMER</button>
          </div>
          <div v-for="item in planning" :key="item._id" class="bodyPlanning">
              <div class="col colDate">{{new Date(item.date).toLocaleDateString("fr-FR",{weekday: "long", day:"numeric",month : "numeric",year : "numeric"})}}</div>
              <input @change="changeInfo(item)" type="text" class="col colCollaborateur1" disabled v-model="item.collaborateur1">
              <input @change="changeInfo(item)" type="text" class="col colCollaborateur2" disabled v-model="item.collaborateur2">
              <textarea @change="changeInfo(item)" class="col colRemarque" rows="1" disabled v-model="item.remarque"></textarea>         
          </div>
      </div>
  </div>
</template>

<script>
import modal from '../forAll/modal.vue'
export default {
  components: { modal },
    nbame : "planning",
    data(){
        return {
            choiceNewDateEnd : [],
            planning : [],
            dateEnd : {
                heure : 0
            },
            tabUpdate : [],
            dateAffichageDebut : {
                jour : 0,
                mois : 0,
                annee : 0,
                heure : 0
            },
            dateAffichageFin : {
                jour : 0,
                mois : 0,
                annee : 0,
                heure : 0
            },
            modal : {
                display : false,
                text : "",
                textBtnValid : "OK"
            }
        }
    },
    methods : {
        affichePlanning(){
            let connection = JSON.parse(localStorage.getItem("connection"))
            let obj = {
                user : this.$store.state.user,
                dateDebut : new Date(this.dateAffichageDebut.annee, this.dateAffichageDebut.mois -1 , this.dateAffichageDebut.jour, this.dateAffichageDebut.heure),
                dateFin : new Date(this.dateAffichageFin.annee, this.dateAffichageFin.mois - 1 , this.dateAffichageFin.jour, this.dateAffichageFin.heure),
            }
            fetch(`${this.$store.state.HOST}/admin/planning/getPlanning`, {
                method : "POST",
                body : JSON.stringify(obj),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer" +" "+ connection.token,
                }
            })
            .then(res => res.json())
            .then(response => {
                this.planning = response
            })
            .catch(err => console.log(err))
        },
        prolongerPlanning(){
            let connection = JSON.parse(localStorage.getItem("connection"))
            let obj = {
                user : this.$store.state.user,
                dateEnd : new Date(this.dateEnd.annee,this.dateEnd.mois - 1,this.dateEnd.jour,this.dateEnd.heure),
            }
            
            
            fetch(`${this.$store.state.HOST}/admin/planning/ajouterDatePlanning`, {
                method : "POST",
                body : JSON.stringify(obj),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer" +" "+ connection.token,
                }
            })
            .then(res => res.json())
            .then(response => {
                
                this.planning = response
            })
            .catch(() => console.log("asol"))
        },
        
        changeInfo(item){
            let exist = false
            let indexASupprimer = 0
            
                for(let [index,id ] of this.tabUpdate.entries()){
                    if (id.idToUpdate === item._id){
                        exist = true
                        indexASupprimer = index
                    }
                }
    
            let newItemUpdate = {
                idToUpdate : item._id,
                item : item
            }
            if (!exist){
                this.tabUpdate.push(newItemUpdate)      
            }else if(exist){
                this.tabUpdate.splice(indexASupprimer,1)
                this.tabUpdate.push(newItemUpdate)
            }
        },
        setDateDeBase(){
            // DATE DEBUT
            let dateActuel = new Date(Date.now())
            this.dateAffichageDebut.jour = dateActuel.getDate()
            this.dateAffichageDebut.mois = dateActuel.getMonth() + 1
            this.dateAffichageDebut.annee = dateActuel.getFullYear()

            // DATE FIN
            
            let dateFin = new Date(dateActuel.setMonth(dateActuel.getMonth() + 3)) 
            this.dateAffichageFin.jour = dateFin.getDate()
            this.dateAffichageFin.mois = dateFin.getMonth() + 1
            this.dateAffichageFin.annee = dateFin.getFullYear()
        },
        modifierPlanning(){
            document.querySelector(".cancelUpdate").style.display ="block"
            document.querySelector(".confirmUpdate").style.display ="block"
            document.querySelector(".modifierPlanning").style.display ="none"

            const tabInput = document.querySelectorAll(".bodyPlanning input, .bodyPlanning textarea ")
            console.log(tabInput)
            for (let item of tabInput){
                item.removeAttribute("disabled")
                item.classList.add("changeInputPlanning")
            }
        },
        cancelUpdatePlanning(){
            document.querySelector(".cancelUpdate").style.display ="none"
            document.querySelector(".confirmUpdate").style.display ="none"
            document.querySelector(".modifierPlanning").style.display ="block"

            const tabInput = document.querySelectorAll(".bodyPlanning input, .bodyPlanning textarea ")
            console.log(tabInput)
            for (let item of tabInput){
                item.setAttribute("disabled","disabled")
                item.classList.remove("changeInputPlanning")
            }

            this.affichePlanning()
        },
        updatePlanning(){

            document.querySelector(".cancelUpdate").style.display ="none"
            document.querySelector(".confirmUpdate").style.display ="none"
            document.querySelector(".modifierPlanning").style.display ="block"

            const tabInput = document.querySelectorAll(".bodyPlanning input, .bodyPlanning textarea ")
            console.log(tabInput)
            for (let item of tabInput){
                item.setAttribute("disabled","disabled")
                item.classList.remove("changeInputPlanning")
            }


            let connection = JSON.parse(localStorage.getItem("connection"))
            let obj = {
                user : this.$store.state.user,
                dateUpdate : this.tabUpdate
            }
         
            fetch(`${this.$store.state.HOST}/admin/planning/updatePlanning`, {
                method : "POST",
                body : JSON.stringify(obj),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer" +" "+ connection.token,
                }
            })
            .then(res => {
                if(res.status === 200){
                    this.modal.display = true
                    this.modal.text = "Le planning à bien été mis à jour !"
                }
                return res.json()
            })
            .then(() => this.affichePlanning())
            .catch(err=> console.log(err))
        },
      
    },
    beforeMount(){
        // const footer = document.querySelector("footer")
        // footer.remove()

        this.setDateDeBase()
        this.affichePlanning()
        

    }
}
</script>

<style scoped>
    .pagePlanning{
        position: relative;
        min-height: 100vh;
        margin-bottom: 100px;
    }
    .boxUpdateButton{
        position: sticky;
        display: flex;
        justify-content: right;
        top: 115px;
        left: 85%;
    }
    
    h1{
        padding: 50px;
        font-size: 50px;
        background: var(--bcg-header);
        color: white;
    }
    h3{
        font-size: 16px;
        font-weight: bold;
        background: rgb(236, 236, 236);
        padding: 5px ;
    }
    .paper{
        width: 70%;
        margin: auto;
    }
    .boxAjouterDate{
        padding: 20px;
        margin-top: 50px;
        margin-left: 40px;
    }
    .boxChoixDate{
        display: flex;
        flex-flow: wrap;
        justify-content: space-evenly;
        align-items: center;
        margin-top: 30px;
    }
    .ligne{
        display: flex;
        flex-flow: column;
        margin-right: 20px;
    }
    .boxButton{
        width: 100%;
        display: flex;
        justify-content: right;
        margin-top: 50px;
    }
    .containerPlanning{
        margin-top: 50px;
        width: 90%;
    }
    .headerPlanning{
        position: sticky;
        top: 50px;
        display: flex;
        background: purple;
        color: white;
        padding: 20px 0;
        font-weight: bold;
    }
    .bodyPlanning{
       display: flex;
        padding: 5px ;
    }
    .bodyPlanning:hover{
        background: rgb(240, 239, 239);
    }
    .col{
        width: 200px;
        margin: 0 5px;
    }
    .ligne input{
        width: 70px;
    }
    .boxInputDate{
        display: flex;
    }
    .colRemarque{
        height: auto;
        
    }
    .containerAffichePlannig{
        width: 80%;
        margin-left: 40px;
        margin-top: 50px;
        padding: 10px;
    }
    .boxAfficheDate{
        display: flex;
        align-items:flex-end;
    }
    .boxAfficheDate input{
        width: 60px;
    }
    .ligneDateAffichage{
        display: flex;
        flex-flow: column;
    }
    .boxDebutAffichage{
        display: flex;
    }
    .ligneDateAffichage{
        margin: 0 10px;
    }
    .duAu{
        font-weight: bold;
    }
    .boxAfficheDate{
        margin-top: 20px;
    }
    .au{
        padding: 0 40px;
    }
    .boxButtonAfficher{
        margin-top: 20px;
    }
    .cancelUpdate{
        display: none;
    }
    .confirmUpdate{
        margin-left: 30px;
        display: none;
    }
    .modifierPlanning{
        display: block;
    }
    .changeInputPlanning{
        background: rgb(245, 217, 217);
        font-weight: bold;
        color: black;
    }

  


</style>