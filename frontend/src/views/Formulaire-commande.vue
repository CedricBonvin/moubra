<template>
    <div  class="page">
      
        <h1>Formuaire de commande :</h1>
        <div class="containerInfo">
            <div class="box">
                <p>Abonnement : </p>
                <p class="nomAbo"> {{this.params.typeAbo}}</p>
            </div>
            <div class="boxInfoClient">
                <div class="form">
                    <p>Titulaire de l'abonnement</p>
                    <div class="lineForm">
                        <label for="nom">Nom :</label>
                        <input type="text" id="nom" v-model="titulaireAbo.nom">
                    </div>
                    <div class="lineForm">
                        <label for="prenom">Prénom :</label>
                        <input type="text" id="prenom" v-model="titulaireAbo.prenom">
                    </div>
                </div>
                <button class="button validButton" @click="ajouterPanier">AJOUTER AU PANIER</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : "formulaire-commande",
    data(){
        return{
            titulaireAbo : {},
            params : {
                typeAbo : "",
                idAbo : "" 
            },
        }
    },
    methods : {
        ajouterPanier(){
         
            let local =JSON.parse(localStorage.getItem("connection"))
            let obj = {
                user : local.user,
                titulaireAbo : this.titulaireAbo,
                idAbo : this.params.idAbo
            }
            fetch(`${this.$store.state.HOST}/user/panierBuffer`, {
                method : "POST",
                body : JSON.stringify(obj),
                headers: {"Content-type" : "application/json; charset=UTF-8",
                            Authorization: "Bearer" +" "+ local.token,
                }
            })
            .then(res => res.json())
            .then(response => {
                console.log(response)
                this.$router.push({path : `/Panier`})
            })
            .catch(() => console.log("erreur dans le fetch..."))       
        }
    },
    mounted(){
        let params = (new URL(document.location)).searchParams;
        this.params.idAbo = params.get('idAbo');
        this.params.typeAbo = params.get('typeAbo'); 
    }
}
</script>

<style scoped>
    h1{
        font-size: 50px;
        text-align: center;
        padding: 50px;
    }
    .form{
        background: rgb(255, 255, 255);
        padding: 20px;
        box-shadow: 0 0 15px 5px lightgray;
        width: 100%;
        max-width: 300px;
    }
    .lineForm{
        margin: 20px 0;
        display: flex;
        justify-content: space-between;
    }
    button{
        display: block;
        margin: auto;
        width: 300px;
        text-align: center;
        margin-top: 20px;
    }
    .containerInfo{
        display: flex;
        justify-content: space-evenly;
    }
   
    .box{
        position: relative;
        box-shadow: 0 0 15px 5px gray;
        width: 30%;
    }
    .box::before{
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: url("../assets/header-min.jpg");
        background-size: cover;
        opacity: .9;      
    }
 
    .nomAbo{
        position: relative;
        font-size: 40px;
        font-weight: bold;
        color: rgb(255, 255, 255);
       
    }
</style>