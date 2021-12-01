<template>
  <footer class="footer">
    <div class="col">
        <h3>Naviguation</h3>
        <ul>
            <li><router-link to="/">Accueil</router-link></li>
            <li><router-link to="/">Cours</router-link></li>
            <li><router-link to="/">Livre d'or</router-link></li>
            <li><router-link to="/">Contact</router-link></li>
        </ul>
    </div>
    <div class="col">
        <h3>Partenaires</h3>
        <a href="https://www.cransmontana.ch/fr/accueil/" target="_blank">
            image logo
        </a>
        
    </div>
    <div class="col">
        <h3>Contact</h3>
        <address class="adress">
            Monkey-School <br> Route de la Moubra 73 <br> 3963 Crans-Montana <br> tél. +41 79 519 04 84 <br>info@monkey-school.ch
        </address>
    </div>

  </footer>
</template>

<script>
export default {
    name : "footer-section"
}
</script>

<style scoped>

    .footer{

        background: black;
        color: white;
        display: flex;
        flex-flow: wrap;
        justify-content: space-around;
        padding: 1em;
        padding-top: 0;
    }
    .adress{
        font-size: 14px;
        line-height: 1.4;
    }
    h3{
        padding-bottom: 1em;
        font-size: 14px;
        opacity: .5;
        margin-top: 20px;
    }
   
    ul{
        list-style-type: disc;
    }
    li{
        margin-left: 1em;
        font-size: 14px;
        line-height: 1.5rem;
    }
    a{
        color: white;
    }
    i{
        font-size: 2em;
    }
    .logoAccm{
        width: 80px;
    }
    .col:nth-child(2){
        text-align: center;
    }
</style>