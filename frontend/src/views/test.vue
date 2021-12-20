<template>
  <div>
      <div class="page">
          <button @click="callUser" class="button validButton">call user</button>
          <div class="boxUser">
              <div v-for="item in user" :key="item.user">
                  <div class="carteUser shadow">
                      <p>{{item.nom}}</p>
                      <p>{{item.prenom}}</p>
                      <button @click="afficheAbo(item)">affiche Abo</button>
                      <div v-for="i in item.abonnement" :key="i.id">
                            <p>{{i}}</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name : "test",
    data(){
        return{
            user : []
        }
    },
    methods : {
        callUser(){
             let connection = JSON.parse(localStorage.getItem("connection"))
            let query = {}
           
            let obj = {
                user : this.$store.state.user,
                query : {...query}
            }

            fetch(`${this.$store.state.HOST}/user/recherche`, {
                method : "POST",
                body : JSON.stringify(obj),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer" +" "+ connection.token,
                }
            })
            .then(res => res.json())
            .then(response => {           
                response.length === 0 ? this.noUser = true : this.noUser = false
                // inverse l'ordre des abos
                for(let item of response){
                    item.abonnement.reverse()
                }
                this.user = response
            })
        },
        afficheAbo(item){
        
             let tab = [1,2,3,4,4,5,5,5,6]
            for (let index of tab){
                    item.abonnement.push(index)
            }
            console.log(item)
          
        }
    },
    computed : {

    }
}
</script>

<style scoped>
    .page{
        padding: 100px;
    }
    .carteUser{
        margin: 50px 0;
    }
</style>