<template>
   <div>
       <h1>NEWS LETTER</h1>
       <p class="explication">Les mails seront envoyé à tous les Utilisateurs qui ont acceptés la News-Letter</p>
       <div class="containerTextMail shadow">
           <p class="titleTextMail">REMPLIR LES CHAMPS</p>
           <div class="objetMail">
               <label for="objetMail">Objet du Mail</label>
               <input type="text" id="objetMail" v-model="mail.objet">
           </div>
           <div class="boxText">
               <label for="textMail">Text du mail</label>
               <textarea name="" id="textMail" cols="30" rows="10" v-model="mail.text"></textarea>
           </div>
       </div>
       <div class="boxButton">
           <button class=" validButton testButton button">TEST</button>
           <button @click="envoyerMail" class="validButton button">ENVOYER</button>
       </div>
   </div>
</template>

<script>
export default {
    name : "news-letter",
    data(){
        return{
            mail : {
                text : "",
                objet : ""
            }
        }
    },
    methods: {
        envoyerMail(){
            let connection = JSON.parse(localStorage.getItem("connection"))
            let obj = {
                user : this.$store.state.user,
                mail : this.mail
            }
            fetch(`${this.$store.state.HOST}/admin/sendNewsLetter`, {
                method : "POST",
                body : JSON.stringify(obj),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer" +" "+ connection.token,
                }
            })
            .then(res => res.json())
            .then(response => console.log(response))
            .catch(err => console.log(err))
        }
    }
}
</script>

<style scoped>
    h1{
        padding: 50px;
        font-size: 50px;
        background: var(--bcg-header);
        color: white;
    }
    .containerTextMail{
        width: 80%;
        margin: auto;
        margin-top: 50px;
        padding: 20px;
    }
    .titleTextMail{
        font-weight: bold;
        padding: 10px;
        display: inline-block;
        background: lightgray;
    }
    .objetMail{
        margin: 30px 0;
    }
    .boxButton{
        width: 80%;
        display: flex;
        justify-content: right;
        margin: auto;
        margin-top: 20px;
    }
    .testButton{
        background: rgb(79, 79, 201);
        color: white;
        margin-right: 20px;
    }
    .boxText{
        display: flex;
        flex-flow: column;
        margin-top: 50px;
    }
    .explication{
        display: inline-block;
        margin-left: 50px;
        font-size: 18px;
        background: purple;
        color: white;
        padding: 10px;
    }
    textarea{
        background: rgb(245, 245, 245);
        font-family: sans-serif;
        padding: 20px;
    }
</style>