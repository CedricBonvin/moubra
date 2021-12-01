<template>
   <div class="page">
       <h1>Mon compte</h1>
       <!-- INFORMATION -->
       <div class="containerInformation">
            <div class="boxInfoPersonel">
                <h2>informantion personnelle :</h2>
                <div class="boxDonnePersonnelle">
                    <div class="ligne">
                        <label for="nom">Nom : </label>
                        <input type="text" id="nom" v-model="oldUser.nom">
                    </div>
                    <div class="ligne">
                        <label for="prenom">Prénom : </label>
                        <input type="text" id="prenom" v-model="oldUser.prenom">
                    </div>
                    <div class="ligne">
                        <label for="mail">E-mail : </label>
                        <input type="text" id="mail" v-model="oldUser.mail">
                    </div>
                    <div class="ligne">
                        <label for="password">Password : </label>
                        <input type="text" id="password" v-model="oldUser.password">
                    </div>
                </div>
                <div class="boxButtonInfo">
                    <button @click="cancel" class="button dangerButton">ANNULER</button>
                    <button @click="uploadUser" class="button validButton">METTRE A JOUR</button>
                </div>
            </div>
       </div>
      <abonnements />
   </div>
</template>

<script>
import abonnements from '../components/page-User/abonnements.vue'
export default {
  components: { abonnements },
    name : "user",
    data(){
        return{
            oldUser : {}
        }
    },
    methods : {
        uploadUser(){
            console.log(this.oldUser)
            let obj = {
                user : {...this.oldUser}
            }
            let connection = JSON.parse(localStorage.getItem("connection"))
            fetch(`${this.$store.state.HOST}/user/upload`,{
                method : "POST",
                body : JSON.stringify(obj),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer" +" "+ connection.token,
                }
            })
            .then(res => res.json())
            .then(() => this.$store.state.user = {...this.oldUser} )
            .catch(() => console.log("erreur dans le fetch"))
        },
        cancel(){
              this.oldUser =  {...this.$store.state.user}
        },
       
    },
    beforeMount(){
        this.oldUser = {
            ...this.$store.state.user
        }
    },
    
    
}
</script>

<style scoped>
    h1{
        text-align: center;
        padding: 50px;
        font-size: 30px;
    }
    .boxInfoPersonel{
        box-shadow: 0 0 15px 5px lightgray;
        width: 80%;
        margin: auto;
        padding: 20px;
    }
    .boxDonnePersonnelle{
        display: flex;
        justify-content: space-evenly;
        flex-flow: wrap;
    }
    .ligne{
        display: flex;
        flex-flow: column;
        margin: 10px 0;
    }
    h2{
        font-size: 20px;
        text-decoration: underline;
    }
    .boxButtonInfo{
        display: flex;
        justify-content:flex-end;
        margin-top: 20px;
    }
    .button{
        display: block;
        margin-left:20px;
    }
</style>