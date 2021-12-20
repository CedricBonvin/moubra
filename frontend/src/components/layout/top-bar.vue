<template>
    <div class="topBar">
        <div class="logo">Moubra</div>
        <div class="link">
            <router-link to="/"> Accueil </router-link>
            <router-link to="/abonnement"> Abonnement </router-link>
            <router-link to="panier"> Panier </router-link>


            <div class="boxLinkLogin">
                <div @click="openSousMenuLogin($event)" class="linkSousMenu" v-if="this.$store.state.user.prenom"> {{ this.$store.state.user.prenom }} </div>
                <div @click="goLogin" class="linkSousMenu" v-else> Login</div>
                <div>
                    <ul v-if="loginSousMenu" class="sousMenuLogin">
                        <li >Mon compte</li>
                        <li @click="deconnexion" >Déconnexion</li>
                    </ul>
                </div>
            </div>
            
            <!-- <router-link to="/user" v-if="this.$store.state.user.prenom"> {{ this.$store.state.user.prenom }}</router-link> -->
        </div>
    </div>
</template>

<script>
export default {
    name : "top-bar",
    data(){
        return{
            loginSousMenu : false,
        }
    },
    methods : {
        openSousMenuLogin(e){
            e.stopImmediatePropagation()
            this.loginSousMenu ? this.loginSousMenu = false : this.loginSousMenu = true
        },
        closeSousMenu(){
            let html = document.querySelector("html")
            html.addEventListener("click",()=> {
                    this.loginSousMenu = false          
            })
        },  
        deconnexion(){
            this.$store.state.user = {}
            localStorage.removeItem("connection")
        },
        goLogin(){
            this.$store.state.displayLogin = true
        }
    },
    mounted(){
        this.closeSousMenu()
    }
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
    a, .linkSousMenu{
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
    .linkSousMenu:hover{
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
    .boxLinkLogin{
        position: relative;
    }
    .sousMenuLogin{
        position: absolute;
        z-index: 100000;
        bottom:  -100px;
        left: 0;
        display: flex;
        flex-flow: column;
        transform: translate(-43%, 0%);
        background: rgba(201, 201, 201, 0.664);
        color: black;
        font-weight: 500;
        list-style-type: none;
        transition: .2s;
    }
    .sousMenuLogin li{
        padding: 10px 20px;
    }
    .sousMenuLogin li:hover{
        background: rgb(44, 43, 43);
        cursor: pointer;
        color: green;
    }
    .link{
        display: flex;
    }
    .linkSousMenu{
        cursor: pointer;
    }
   

</style>