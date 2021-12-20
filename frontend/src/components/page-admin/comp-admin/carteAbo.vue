<template>
  <div>
      <div class="containerCarte shadow" :id="item._id">
          <div class="status">
              <div class="actif" v-if="item.actif">ACTIF</div>
              <div class="epuise" v-else>EPUISE</div>
          </div>
          <div class="carteHeader">
              <div class="col itemHeader">TITULAIRE</div>
              <div class="col itemHeader">TYPE</div>
              <div class="col itemHeader">E-MAIL</div>
              <div class="col itemHeader">NPA <br> VILLE</div>
              <div class="col itemHeader">DATE <br> ÉMISSION</div>
              <div v-if="item.type === 'entree'" class="col itemHeader">ENTRE <br> RESTANTE</div>
              <div v-else class="col itemHeader">DATE <br> ÉCHÉANCE</div>
          </div>
          <div class="carteBody">
              <div class="col itemBody">{{item.titulaire.nom}} <br>  {{ item.titulaire.prenom}}</div>
              <div class="col itemBody">{{item.abo}}</div>
              <div class="col itemBody">{{item.titulaire.mail}}</div>
              <div class="col itemBody">{{item.titulaire.npa}} {{ item.titulaire.ville}}</div>
              <div class="col itemBody">{{ new Date(item.dateEmission).toLocaleDateString() }}</div>
              <div class="col itemBody ">
                <input v-if="item.type === 'entree'" type="number" disabled  v-model="item.entreRestante">
                <p v-else>{{ new Date(item.dateEcheance).toLocaleDateString()}}</p>
              </div>
          </div>
          
            <div  class="contRemarqueNewDate">
                <div class="bigContRemarque">
                    <div class="containerRemarque">
                        <label class="remarqueAndDate" for="remarqueAbo">REMARQUE</label>
                        <textarea name="remarque" id="remaqueAbo" disabled v-model="item.remarque"></textarea>
                    </div>
                </div>
                <div class="BigContNewEcheance">
                    <div v-if="item.type === 'mois'" >
                            <div class="remarqueAndDate titleDateEcheance">NEW DATE ÉCHÉANCE</div>
                        <div class="containerNewEcheance">
                            <div class="boxInputNewEcheance">
                                <label for="">Jour</label>
                                <input class="inputNewEcheance" type="number" v-model="newEcheance.jour">
                            </div>
                            <div class="boxInputNewEcheance">
                                <label for="">Mois</label>
                                <input class="inputNewEcheance" type="number" v-model="newEcheance.mois">
                            </div>
                            <div class="boxInputNewEcheance">
                                <label for="">Année</label>
                                <input class="inputNewEcheance inputAnne" type="number" v-model="newEcheance.annee">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
      
          <div class="boxButton">
              <button @click="modifAbo(item)" class="button modifButton validButton">MODIFIER</button>
              <button @click="cancelModifAbo(item)" class="button cancelButton dangerButton">CANCEL</button>
              <button @click="confirmModif(item)" class="button confirmButton validButton">CONFIRMER</button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name : "carteAbo",
    props : ["item", "modal"],
    data(){
        return{
            remarque : "",
            newEcheance : {
                jour : "",
                mois : "",
                annee : ""
            }   
        }
    },
    methods : {
        modifAbo(item){

            this.putDateInInput()
            
            let parent = document.getElementById(item._id)
            parent.querySelector(".cancelButton").style.display = "block"
            parent.querySelector(".confirmButton").style.display = "block"
            parent.querySelector(".modifButton").style.display = "none"

            let entreRestante = parent.querySelector(".carteBody input")
            entreRestante ? entreRestante.classList.add("change") : null
            entreRestante ? entreRestante.removeAttribute("disabled") : null
            
            
            let remarque = parent.querySelector(".containerRemarque textarea")
            remarque ? remarque.removeAttribute("disabled") : null
            remarque ? remarque.classList.add("change") : null   

            if (!item.remarque){
                parent.querySelector(".bigContRemarque").style.display = "block"
            }

            parent.querySelector(".BigContNewEcheance").style.display = "block"

        },
        cancelModifAbo(item){
            let parent = document.getElementById(item._id)
            parent.querySelector(".cancelButton").style.display = "none"
            parent.querySelector(".confirmButton").style.display = "none"
            parent.querySelector(".modifButton").style.display = "block"

            let entreRestante = parent.querySelector(".carteBody input")
            entreRestante ? entreRestante.classList.remove("change") : null
            entreRestante ? entreRestante.setAttribute("disabled","disabled") : null
            

            let remarque = parent.querySelector(".containerRemarque textarea")
            remarque ? remarque.setAttribute("disabled","disabled") : null
            remarque ? remarque.classList.remove("change") : null

            parent.querySelector(".BigContNewEcheance").style.display = "none"
            if (!item.remarque){
                parent.querySelector(".bigContRemarque").style.display = "none"
            }

            this.$emit("rechercheAbo")
            this.displayRemarque() 
        
        },
        confirmModif(item){
             let parent = document.getElementById(item._id)
             parent.querySelector(".cancelButton").style.display = "none"
            parent.querySelector(".confirmButton").style.display = "none"
            parent.querySelector(".modifButton").style.display = "block"

            let entreRestante = parent.querySelector(".carteBody input")
            entreRestante ? entreRestante.classList.remove("change") : null
            entreRestante ? entreRestante.setAttribute("disabled","disabled") : null

            let remarque = parent.querySelector(".containerRemarque textarea")
            remarque ? remarque.setAttribute("disabled","disabled") : null
            remarque ? remarque.classList.remove("change") : null

            parent.querySelector(".BigContNewEcheance").style.display = "none"
            

            let newDateEcheance = ""
            if (item.type === "mois"){
               newDateEcheance = new Date(this.newEcheance.annee, this.newEcheance.mois -1, this.newEcheance.jour)
            }

             let connection = JSON.parse(localStorage.getItem("connection"))
            let obj = {
                user : this.$store.state.user,
                updateAbo: {
                    idAboUpdate : item._id,
                    entreRestante : parseInt(item.entreRestante) ,
                    dateEcheance : newDateEcheance,
                    actif : false,
                    remarque : item.remarque
                },
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
                this.modal.display = true
                if(res.status === 200){
                    this.modal.text = "L'ABONNEMENT À BIEN ÉTÉ MIS À JOUR !"
                }
                if (res.status !== 200){
                    this.modal.text = "IMPOSSIBLE DE METTRE À JOUT L'ABONNEMENT !"
                }
                return res.json()
            } )
            .then(()=> {
                this.$emit("rechercheAbo")
            })
            .catch(err => console.log(err))
        },
        displayRemarque(){
            let parent = document.getElementById(this.item._id)
            if (this.item.remarque){
             parent.querySelector(".bigContRemarque").style.display = "block"
            } else parent.querySelector(".bigContRemarque").style.display = "none" 
        },
        putDateInInput(){
            if (this.item.type === "mois"){
                let date = new Date( this.item.dateEcheance) 
                this.newEcheance.jour = date.getDate()
                this.newEcheance.mois = date.getMonth() + 1
                this.newEcheance.annee = date.getFullYear()
            }
        }
    },
    mounted(){
        this.displayRemarque() 
    }
}
</script>

<style scoped>
.containerCarte{
    position: relative;
    width: 100% ;
    margin: 50px 0;
    padding: 10px;
}
.carteHeader{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background: rgb(221, 172, 240);
    padding: 10px 0;
   
}
.col{
    text-align: center;
    width: 15%;
}
.itemHeader{
    padding: 10px 0;
    font-weight: bold;
    font-size: 18px;
}
.carteBody{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-weight: bold;
    color: rgb(71, 71, 71);
}
.carteBody input {
    width: 50px;
}
.itemBody{
    padding: 10px 0;
}
.boxButton{
    display: flex;
    justify-content : right;
    margin-top: 20px;
}
.cancelButton{
    display: none;
    margin-right: 20px;
}
.confirmButton{
    display: none;
}
.change{
    background: rgb(255, 88, 88);
    color: white;
}
.containerRemarque{
    
    margin: 15px 50px;
    display: flex;
    flex-flow: column;
}
.containerRemarque label{
    font-weight: bold;
    color: blue;
}
.containerRemarque textarea{
    width: 500px;
    padding: 10px;
    font-family: sans-serif;
    font-style: italic;
}
.status{
    position: absolute;
    top: 0;
    left: -15px;
    transform: rotate(-45deg);
    background: white;
    font-weight: 900;
    padding: 5px 10px;
}
.epuise{
    color: red;
}
.actif{
    color: green;
}
.ajouterRemarque{
    color: blue;
    cursor: pointer;
    transition : .3s;
    display : inline-block
}
.ajouterRemarque:hover{
    font-size: 1.1rem;   
    font-weight: bold;
}
.itemBody p{
    text-align: center;
}
.bigContRemarque{
    display: none;
}
.boxInputNewEcheance{
    display: flex;
    flex-flow: column;
    margin: 0 5px;
}
.inputNewEcheance{
    width: 50px;  
    background: rgb(231, 71, 71);
    color: white;  
}
.containerNewEcheance{
    display: flex;
}
.BigContNewEcheance{
    display: none;
}
.contRemarqueNewDate{
    display: flex;
    flex-flow: wrap;
    align-items: center;
}
.remarqueAndDate{
    color: blue;
    font-weight: bold;
}
.inputAnne{
    width: 70px;
}
.titleDateEcheance{
    width: 100%;
}



</style>