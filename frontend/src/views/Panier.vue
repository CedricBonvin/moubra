<template>
    <div class="page">
        <h1>Panier :</h1>
        <panier />
    </div>
</template>

<script>
import panier from "../components/page-panier/panier.vue"
export default {
    name : "Panier",
    components : {panier},
    data(){
        return{
          
        }
    },
    methods : {
       
    },
    beforeMount(){
    }
}
</script>

<style scoped>
    h1{
        margin-top:50px;
    }
</style>