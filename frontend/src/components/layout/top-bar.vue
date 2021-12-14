<template>
    <div class="topBar">
        <div class="logo">Moubra</div>
        <div class="link">
            <router-link to="/"> Accueil </router-link>
            <router-link to="/abonnement"> Abonnement </router-link>
            <router-link to="panier"> Panier </router-link>
            <router-link v-if="!this.$store.state.user.prenom" to="/Login"> Login </router-link>
            <router-link to="/user" v-if="this.$store.state.user.prenom"> {{ this.$store.state.user.prenom }}</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name : "top-bar"
}
</script>

<style scoped>

    .topBar{
        position: fixed;
        z-index: 1000;
        top: 0;
        left: 0;
        width: 100%;
        height: 50px;
        padding: 0px 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: black;
        color: white;
    }
    a{
        color: white;
        padding: 0 10px;
        text-decoration: none;
        transition: .3s;
    }
    p{
        display: inline-block;
    }
    a:hover{
        display: inline-block;
       transform: scale(1.1);
       color: red;
    }
    .logo{
        font-weight: bold;
        font-size: 1.2rem;
    }
    .user{
        cursor: pointer;
    }

</style>