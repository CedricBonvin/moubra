<template>
    <div class="page">
        <h1>TOUS NOS ABONNEMENTS :</h1>

        <div class="boxCarte">
            <div v-for="item in abo" :key="item._id">
                <carte-abo
                    :item="item"
                />
            </div>
        </div>

    </div>
</template>

<script>
import carteAbo from '../components/page-abonnement/carteAbo.vue'
export default {
  components: { carteAbo },
    name : "abonnement",
    data(){
        return{
            abo : []
        }
    },
    methods : {
        api(){
           fetch(`http://localhost:3000/all-cours`)
           .then( res => res.json())
           .then( response => {
               this.abo = response
           })
        }
    },
    beforeMount(){
        console.log(this.$store.state.panier)
        this.api()
      
    }
}
</script>

<style scoped>
    h1{
        margin-top:50px;
    }
    .boxCarte{
        display: flex;
        justify-content: space-evenly;
        flex-flow: wrap;
        padding: 0 20px;
    }
</style>