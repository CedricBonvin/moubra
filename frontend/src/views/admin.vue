<template>
  <div class="page">
      <div class="menu">
          <ul class="menuGauche">
              <li @click="pageAccess('createNewUser',$event)">USER</li>
              <li @click="pageAccess('abonnement',$event)">ABONNEMENT</li> 
              <li @click="pageAccess('planning',$event)">PLANNING</li> 
              <li @click="pageAccess('newsLetter',$event)">NEWS-LETTERS</li> 
          </ul>
      </div>
      <div class="body">
          <create-user v-if="page.createUser"/>
          <abonnement v-if="page.abonnement" />
          <planning v-if="page.planning" />
          <news-letter v-if="page.newsLetter" />
      </div>
  </div>
</template>

<script>
import createUser from '../components/page-admin/user.vue'
import Abonnement from '../components/page-admin/abonnement.vue'
import Planning from '../components/page-admin/planning.vue'
import NewsLetter from '../components/page-admin/News-Letter.vue'
export default {
  components: { createUser, Abonnement, Planning, NewsLetter },
    name : "admin",
    data(){
        return{
            page : {
                createUser : true,
                abonneemnt : false,
                planning : false,
                newsLetter : false
            }
        }
    },
    methods : {
        pageAccess(value,e){
            for(let i in this.page){      
                this.page[i] = false
            }
            value === "createNewUser" ? this.page.createUser = true : null 
            value === "abonnement" ? this.page.abonnement = true : null 
            value === "planning" ? this.page.planning = true : null 
            value === "newsLetter" ? this.page.newsLetter = true : null 

            let tabLink = document.querySelectorAll(".menuGauche li")
            for(let item of tabLink){
                item.classList.remove("active")
            }
            e.target.classList.add("active")
        }
    }
}
</script>

<style scoped>
    .page{
        display: flex;
    }
   
    .menuGauche{
        position: sticky;
        top: 50px;
        background: black;
        color: white;
        padding: 10px;
        height: 100vh;
    }
    .body{
        flex-grow: 1;
    }
    ul{
        list-style-type: none;
        padding-top: 100px;
    }
    li{
        padding : 10px 5px;
        cursor: pointer;
    }
    li:hover{
        color: rgb(230, 230, 230);
        font-weight: bold;
        text-decoration: underline;
    }
    .active{
        color: green;
        text-decoration: underline;
        font-weight: 900;

    }
</style>