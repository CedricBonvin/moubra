<template>
  <div class="page">
      <div class="menu">
          <ul class="menuGauche">
              <li @click="createUser('createNewUser')">Créer User</li>
              <li></li>
          </ul>
      </div>
      <div class="body">
          <create-user v-if="page.createUser"/>
      </div>
  </div>
</template>

<script>
import createUser from '../components/page-admin/user.vue'
export default {
  components: { createUser },
    name : "admin",
    data(){
        return{
            page : {
                createUser : false
            }
        }
    },
    methods : {
        createUser(value){
            for(let i in this.page){      
                this.page[i] = false
            }
            value === "createNewUser" ? this.page.createUser = true : null 
        }
    }
}
</script>

<style scoped>
    .page{
        display: flex;
    }
    .menuGauche{
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
    }
</style>