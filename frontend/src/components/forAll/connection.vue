<template>
   <div>
       <div class="bigCont">
           <div class="boxHeaderConnection">
               <p @click="choiceConnect($event)"  value="connection" class="select choiceConnect"> Se connecter</p>
               <!-- <p @click="choiceConnect($event)"  value="creerCompte" class="choiceConnect" >Créer un compte</p> -->
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
               <!-- <div v-if="choice === 'creerCompte'" class="infoCreerCompte">
                   <div class="ligne">
                       <label for="nom">Nom :</label>
                       <input type="text" id="nom" v-model="user.nom">
                   </div>
                   <div class="ligne">
                       <label for="prenom">Prenom :</label>
                       <input type="text" id="prenom" v-model="user.prenom">
                   </div>
               </div> -->
               <div v-if="errorConnect" class="error">IMPOSSIBLE DE SE CONNECTER !</div>
               <div class="boxButton">
                   <!-- <button v-if="choice === 'connection'"  class="button validButton">CONNECTION</button> -->
                   <button @click="cancel" class="button dangerButton">ANNULER</button>
                   <button @click="send" class="button validButton" >CONNECITON</button>
               </div>
               <!-- <button v-if="choice === 'creerCompte'" @click="send" class="button validButton">S'INSCRIRE</button> -->
            
           </div>
       </div>
   </div>
</template>

<script>
export default {
    name : "boxLogin",
    data(){
        return {
            user : {
                mail : "",
                password : "",
                nom : "",
                prenom : "",
            },
            choice : "connection",
            errorConnect : false
        }
    },
    methods : {
        send(){
            // créer compte
            // if(this.choice === 'creerCompte'){
            //     fetch(`${this.$store.state.HOST}/user/create`, {
            //         method : "POST",
            //         body : JSON.stringify(this.user),
            //         headers: {"Content-type": "application/json; charset=UTF-8",}
            //     })
            //     .then(res => res.json())
            //     .then(response => {
            //         this.$store.state.user = response
            //     })
            // }
            //login
            // if(this.choice === 'connection'){
                fetch(`${this.$store.state.HOST}/user/connection`, {
                    method : "POST",
                    body : JSON.stringify(this.user),
                    headers: {"Content-type": "application/json; charset=UTF-8",}
                })
                .then(res => {
                    if (res.status === 200) {
                        this.$store.state.displayLogin = false
                    } else {
                        this.errorConnect = true
                    }
                    return res.json()
                })
                .then(response => {
                    this.$store.state.user = response.user
                    localStorage.setItem("connection",JSON.stringify(response))
                })
            // }
        },
        choiceConnect(e){
            this.choice = e.target.getAttribute("value")
            let tab = document.querySelectorAll(".choiceConnect")
            for(let item of tab){
                item.classList.remove("select")
            }
            e.target.classList.add("select")
        },
        cancel(){
            this.$store.state.displayLogin = false
        }
    }
}
</script>

<style scoped>

    .bigCont{
        position: fixed;
        top : 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 400px;
        margin: auto;
        padding: 10px;
        background: rgba(255, 255, 255, 0.932);
    }
    .container{
        padding-top: 20px;
    }
    input{
        background: rgb(218, 218, 218);
        color: black;
    }
    .ligne{
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
    }
    .validButton{
        display: block;
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
    .boxButton{
        display: flex;
        justify-content: space-between;
        flex-flow: wrap;
        margin-top: 50px;
    }
    .error{
        color: red;
        text-align: center;
        padding-top: 20px;
        font-weight: bold;
    }


</style>