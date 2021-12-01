
// ************* CAPTCHA ADDITION DE 1 A 10  ***********

// ------------------------------------------------
// |** props captcha attend un objet du parent ** |
// ------------------------------------------------

//     captcha : {
//                 nbr1 : Math.floor(Math.random() * (10 - 1 + 1)) + 1,
//                 nbr2 : Math.floor(Math.random() * (10 - 1 + 1)) + 1,
//                 resultat : null
//             }

<template>
    <div>
        <div class="boxCaptcha">
            <p class="labelCaptcha"> Captcha : </p>
            <div class="captcha">
                <span class=" itemCaptcha captcha2"> {{ captcha.nbr1 }} </span>
                <span class="plusEgal"> + </span>
                <span class=" itemCaptcha captcha1"> {{ captcha.nbr2 }} </span>
                <span class="plusEgal"> = </span>
                <input type="text" class="itemCaptcha captchaReponse" v-model="captcha.resultat">
            </div>
        </div>
            <p v-if="captcha.error" class="errorCaptcha"> {{ captcha.error}}</p>
    </div>
</template>

<script>
export default {
    name : "captcha",
    props : ["captcha"],
}
</script>

<style scoped>
      .boxCaptcha{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-top: 20px;
        padding: 5PX;    
    }
   
    .captcha{
        display: inline-block;
    }
    .itemCaptcha{
        background: white;
        padding: 7px;
    }
    .captchaReponse{
        display: inline-block;
        width: 40px;
        font-size: 14px;
        text-align: center;
        border-radius: 0;
        padding: 10px 0;
        border: none;
    }
      .errorCaptcha{
        text-align: right;
        color: red;
    }
    .labelCaptcha{
        margin-right: 5px;
    }
</style>