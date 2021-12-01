<template>
   <section class="page">
       <div class="containerPanier">
           <div class="headerPanier">
               <div class="titleAbo">ABONNEMENT</div>
               <div class="titlePrix">PRIX</div>
           </div>
           <div class="bodyPanier">
               <div v-for="item of panier" :key="item.id" class="ligne">
                   <p>{{ item.abo}}</p>
                    <p>{{ item.prix}}</p>
               </div>
           </div>
           <div class="boxTotal">
               <p class="titleTotal">TOTAL</p>
               <p class="prixTotal">2000.-</p>
           </div>
           <button class="button validButton">COMMANDER</button>

       </div>
   </section>
</template>

<script>
export default {
    name : "panier",
    data(){
        return {
            panier : []
        }
    },
    methods : {
        getPanier(){
            let local =JSON.parse(localStorage.getItem("connection"))
            let obj = {
                user : local.user,
            }
            fetch(`${this.$store.state.HOST}/user/getPanierBuffer`, {
                method : "POST",
                body : JSON.stringify(obj),
                headers: {"Content-type" : "application/json; charset=UTF-8",
                            Authorization: "Bearer" +" "+ local.token,
                }
            })
            .then(res => res.json())
            .then(response => {
                console.log(response)
                this.panier = response
            
            })
            .catch(() => console.log("erreur dans le fetch..."))
        }
    },
    beforeMount(){
        this.getPanier()
    }
}
</script>

<style scoped>

    .containerPanier{
        width: 300px;
        margin: auto;
        box-shadow: 0 0 15px 5px lightgray;
    }
    .headerPanier{
        padding: 10px;
        background: green;
        color: white;
        display: flex;
        justify-content: space-between;
    }
    .bodyPanier{
        border-bottom: gray solid 1px;
        padding-bottom: 20px;
        margin:  10px;
    }
    .ligne{
        display: flex;
        justify-content: space-between;
    }
    .button{
        width: 100%;
        margin-top: 20px;
        text-align: center;
    }
    .boxTotal{
        display: flex;
        justify-content: space-between;
        margin: 0 10px;
        font-weight: bold;
    }

</style>