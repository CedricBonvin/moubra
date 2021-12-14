<template>
  <div id="app">
    <top-bar class="topbar"/>
    <div class="baseContainer">
		<router-view/>	
		<footers />
	</div>
  </div>
</template>


<script>
import topBar from './components/layout/top-bar.vue'
import footers from './components/layout/footer.vue'
export default {
	components: { topBar, footers },
	name : "Accueil",
	methods : {

		checkToken(){
			let connection = JSON.parse(localStorage.getItem("connection"))
			if(connection){
				const obj = {
					user : connection.user
				}
				fetch(`${this.$store.state.HOST}/refresh`, {
					method: "POST",
                    body: JSON.stringify(obj),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        Authorization: "Bearer" +" "+ connection.token,
                    }
				})
				.then(res => res.json())
				.then(response => {
					if(response[0]){
						this.$store.state.user = {...response[0]}
					} else this.$router.push({path : `/Login`})
				})
				.catch(err => console.log(err))
			}
		}
	},
	beforeMount(){
		this.checkToken()	
	}
}
</script>

<style scoped>


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
}

.baseContainer{
	min-height: 100vh;
	display: flex;
	flex-flow: column;
	justify-content: space-between;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
