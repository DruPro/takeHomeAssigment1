<script setup>
import coinOfferAlternate from '../../assets/images/coinfOfferAlternate.webp'
import CyberButton2 from '../buttons/cyberButton2.vue';
import useAccountStore from '../../globalStorage/accountStorage/accountStorage';
const accountStorage = useAccountStore()
let buttonText = "Free Coins"

function addMoneys(){
    const moneyIncrease = 100;
    let amount = 0
    let intervalId = setInterval(()=>{
        accountStorage.addToBalance(1)
        amount++
        if(amount >= moneyIncrease){
            clearInterval(intervalId)
        }
    },10)
}
</script>

<template>
    <div id="offerWrapper">
        <div id="contentContainer">
            <div id="imgContainer">
                <img id="bearImg" :src="coinOfferAlternate">
            </div>
            <div>
                <h1>Need More Coins?</h1>
                <CyberButton2 :button-text="buttonText" :button-action="addMoneys"></CyberButton2>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cal+Sans&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Sixtyfour+Convergence&display=swap');

#offerWrapper {
    padding-top: 5rem;
    padding-bottom: 5rem;
    display: flex;
    justify-content: center;
    width: 100%;
    --u: 5px;
    --c1: #196;
    --c2: #111;
    --c3: #1e1e1e;
    --gp: 50% / calc(var(--u) * 16.9) calc(var(--u) * 12.8);
    background: conic-gradient(from 122deg at 50% 85.15%,
            var(--c2) 0 58deg,
            var(--c3) 0 116deg,
            #fff0 0 100%) var(--gp),
        conic-gradient(from 122deg at 50% 72.5%, var(--c1) 0 116deg, #fff0 0 100%) var(--gp),
        conic-gradient(from 58deg at 82.85% 50%, var(--c3) 0 64deg, #fff0 0 100%) var(--gp),
        conic-gradient(from 58deg at 66.87% 50%,
            var(--c1) 0 64deg,
            var(--c2) 0 130deg,
            #fff0 0 100%) var(--gp),
        conic-gradient(from 238deg at 17.15% 50%, var(--c2) 0 64deg, #fff0 0 100%) var(--gp),
        conic-gradient(from 172deg at 33.13% 50%,
            var(--c3) 0 66deg,
            var(--c1) 0 130deg,
            #fff0 0 100%) var(--gp),
        linear-gradient(98deg, var(--c3) 0 15%, #fff0 calc(15% + 1px) 100%) var(--gp),
        linear-gradient(-98deg, var(--c2) 0 15%, #fff0 calc(15% + 1px) 100%) var(--gp),
        conic-gradient(from -58deg at 50.25% 14.85%,
            var(--c3) 0 58deg,
            var(--c2) 0 116deg,
            #fff0 0 100%) var(--gp),
        conic-gradient(from -58deg at 50% 28.125%, var(--c1) 0 116deg, #fff0 0 100%) var(--gp),
        linear-gradient(90deg, var(--c2) 0 50%, var(--c3) 0 100%) var(--gp);
}

#contentContainer {
    display: flex;
    background-color: black;
    border-radius: 30rem;
    position: relative;
    padding-left: 2rem;
    padding-right: 5rem;
    width: 50vw;
    height: fit-content;
    border: 10px solid #119966;
}

#bearImg {
    width: 20rem;
}


#contentContainer h1 {
    font-family: "Sixtyfour Convergence", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    filter: hue-rotate(30deg);
    font-style: normal;
    font-variation-settings:
        "BLED" 10,
        "SCAN" 0,
        "XELA" 0,
        "YELA" 0;
}

@media (max-width: 768px) {
    #offerWrapper {
        height: fit-content;
    }

    #contentContainer {
        flex-direction: column;
    }

    #contentContainer h1 {
        position: relative;
        top:-100px;
        border-radius: 1rem;
        padding: 1rem;
        background-color: #111111;
    }

    #contentContainer button {
        position: relative;
        top:-100px;
        box-shadow: 10px 10px 10px 10px black;
    }
}
</style>