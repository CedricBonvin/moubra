import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

/* eslint-disable no-new */
const store = new Vuex.Store({
    plugins: [createPersistedState()],
    state : {
       HOST : "http://localhost:3000",
       user : {},
       panier : "",
       displayLogin : false
    },
    mutations : {
        changeUser(state, item){
            console.log(item)
            state.user = {...item}
        },
        test(state,value){
            state.panier = value
        }
    }
})

export default store
