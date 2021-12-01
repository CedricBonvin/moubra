<template>
   <div class="carte">
       <div class="topCarte">
           <p>Abonnement</p>
           <p class="textAbo">{{ item.abo}}</p>
           <p class="lignePrix"> CHF.<span class="prix"> {{ item. prix }}.-</span> </p>
       </div>
       <div class="boxButton">
            <div >
                <button @click="goFormCommande(item)" class="button validButton">COMMANDER</button>
            </div>
       </div>
   </div>
</template>

<script>
export default {
    name : "carteAbo",
    props : ["item"],
    data(){
        return{

        }
    },
    methods: {
        goFormCommande(item){
            this.$router.push({path : `/Formulaire-commande?typeAbo=${item.abo}&idAbo=${item._id}`})
        },
        // commander(item){
        //     let local =JSON.parse(localStorage.getItem("connection"))
        //     let obj = {
        //         user : local.user,
        //         idAbo : item._id
        //     }
        //     fetch(`${this.$store.state.HOST}/user/panierBuffer`, {
        //         method : "POST",
        //         body : JSON.stringify(obj),
        //         headers: {"Content-type" : "application/json; charset=UTF-8",
        //                     Authorization: "Bearer" +" "+ local.token,
        //         }
        //     })
        //     .then(res => res.json())
        //     .then(response => {
        //         console.log(response)
        //         this.$router.push({path : `/Panier`})
        //     })
        //     .catch(() => console.log("erreur dans le fetch..."))       
        // }
    },
    beforeMount(){

    }

}
</script>

<style scoped>
    .carte{
        width: 300px;
        border: solid 1px gray;
        margin: 20px auto;
        
        color: white;
    }
    .topCarte{
        padding: 10px;
        background:  url("../../assets/header-min.jpg");
        background-size: cover;
    }
    .textAbo{
        text-align: center;
        font-size: 40px;
        padding: 30px 0;
        font-weight: bold;
    }
    .lignePrix{
        text-align: right;
    }
    .prix{
        font-size: 25px;
        font-weight: bold;
    }
    .validButton{
        width: 100%;
        text-align: center;
        padding: 15px 0;
        font-size: 20px;
    }

    @media screen and (min-width : 500px){
        .carte{
            margin : 20px;
        }
    }

</style>