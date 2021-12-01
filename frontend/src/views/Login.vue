<template>
   <div class="page">
       <h1>login</h1>
       <div class="bigCont">
           <div class="boxHeaderConnection">
               <p @click="choiceConnect($event)"  value="connection" class="select choiceConnect"> Se connecter</p>
               <p @click="choiceConnect($event)"  value="creerCompte" class="choiceConnect" >Créer un compte</p>
           </div>
           <div class="container">
               <div class="ligne">
                   <label for="email">E-mail</label>
                   <input type="text" id="email" v-model="user.mail">
               </div>
               <div class="ligne">
                   <label for="password">Password</label>
                   <input type="text" id="password" v-model="user.password">
               </div>
               <div v-if="choice === 'creerCompte'" class="infoCreerCompte">
                   <div class="ligne">
                       <label for="nom">Nom :</label>
                       <input type="text" id="nom" v-model="user.nom">
                   </div>
                   <div class="ligne">
                       <label for="prenom">Prenom :</label>
                       <input type="text" id="prenom" v-model="user.prenom">
                   </div>
               </div>
               
               <button v-if="choice === 'connection'" @click="send" class="button validButton">CONNECTION</button>
               <button v-if="choice === 'creerCompte'" @click="send" class="button validButton">S'INSCRIRE</button>
            
           </div>
       </div>
   </div>
</template>

<script>
export default {
    name : "login",
    data(){
        return {
            user : {
                mail : "",
                password : "",
                nom : "",
                prenom : "",
            },
            choice : "connection"
        }
    },
    methods : {
        send(){
            // créer compte
            if(this.choice === 'creerCompte'){
                fetch(`${this.$store.state.HOST}/user/create`, {
                    method : "POST",
                    body : JSON.stringify(this.user),
                    headers: {"Content-type": "application/json; charset=UTF-8",}
                })
                .then(res => res.json())
                .then(response => {
                    this.$store.state.user = response
                })
            }
            //login
            if(this.choice === 'connection'){
                console.log("sadf")
                fetch(`${this.$store.state.HOST}/user/connection`, {
                    method : "POST",
                    body : JSON.stringify(this.user),
                    headers: {"Content-type": "application/json; charset=UTF-8",}
                })
                .then(res => res.json())
                .then(response => {
                    this.$store.state.user = response.user
                    localStorage.setItem("connection",JSON.stringify(response))
                })
            }
        },
        choiceConnect(e){
            this.choice = e.target.getAttribute("value")
            let tab = document.querySelectorAll(".choiceConnect")
            for(let item of tab){
                item.classList.remove("select")
            }
            e.target.classList.add("select")
        }
    }
}
</script>

<style scoped>

    .bigCont{
        width: 300px;
        box-shadow: 0 0 15px 5px lightgray;
        margin: auto;
        padding: 10px;
    }
    .container{
        padding-top: 20px;
    }
    .ligne{
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
    }
    .validButton{
        display: block;
        margin: 30px auto;
        margin-bottom: 0;
    }
    .boxHeaderConnection{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        padding-bottom: 10px;
        border-bottom: 1px solid lightgray;
    }
    .select{
        color: rgb(204, 75, 43);
        font-weight: bold;
        text-decoration: underline;
        font-size: 1.1rem;
    }
    p{
        cursor:pointer;
        
    }


</style>