<template>
    <div v-if="modal.display" class=" container">
        <p> {{ modal.text }}</p>
        <div class="boxButton">
            <button v-if="modal.danger" @click="closeModal" class="button dangerButton"> {{ modal.textBtnDanger}}</button>
            <button @click="closeModal" class="button validButton"> {{ modal.textBtnValid}}</button>
        </div>
    </div>
</template>

<script>
export default {
    name : "modal",
    props : ["text", "modal"],
    data() {
        return {
            displayModal : true
        }
    },
    methods : {
        closeModal(){      
            this.modal.display = false 
        },
    }
}
</script>

<style scoped>
    .container{
        position: fixed;
        z-index: 1000;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 30px 20px;
        background: rgb(245, 245, 245);
        width: 90%;
        max-width: 600px;
        box-shadow: 0 0 15px 1000px rgba(70, 70, 70, 0.644);
        font-weight: bold;
        font-size: 16px;
        text-align: center;

    }
    p{
        text-align: center;
        font-size: 20px;
        color: gray;
    }
    .boxButton{
        display: flex;
        justify-content: space-evenly;
        margin-top: 30px;
    }
   
</style>