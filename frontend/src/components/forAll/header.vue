<template>
    <header class="contactHeader">  
        <img class="image" :src="image" alt="">
        <h1> {{ title }}</h1>    
    </header>
</template>

<script>
export default {
    name : "Header",
    props : ["title","image"],
}
</script>

<style scoped>
header{
    position: relative;
    height: 50vh;
    margin-top: var(--top-bar-height);
}
 .image{
    width: 100%;
    height: 100%;
    object-fit: cover;
 }
 h1{
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    color: white;
    font-size: 15vmin;
    margin-left: 4vw;
    letter-spacing: .2rem;
 }
 h1:before{
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border: solid 2px white;
 }
  h1:after{
    content: "";
    position: absolute;
    bottom: -3px;
    right: -5px;
    width: 10px;
    height: 10px;
    background: white;
    border-radius: 50%;
    box-shadow: 0 0 10px 5px white;
 }

</style>