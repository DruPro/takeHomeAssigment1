<script setup>
import { defineProps } from 'vue';
const props = defineProps(["buttonAction"])
</script>

<template>
    <button class="button" type="button" @click="props.buttonAction">
        <span class="button__text">Add To Cart</span>
        <span class="button__icon"><img src="../../../assets/images/icons/shoppingCart.svg" class="svg"></span>
    </button>
</template>

<style scoped>
/* From Uiverse.io by andrew-demchenk0 */
.button {
    position: relative;
    width: 200px;
    height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border: 1px solid #17795E;
    background-color: #00966e;
    overflow: hidden;
}

.button,
.button__icon,
.button__text {
    transition: all 0.3s;
}

.button .button__text {
    transform: translateX(22px);
    color: #fff;
    font-weight: 600;
}

.button .button__icon {
    position: absolute;
    transform: translateX(200px);
    height: 100%;
    width: 39px;
    background-color: #17795E;
    display: flex;
    align-items: center;
    justify-content: center;
}

.button .svg {
    width: 20px;
    fill: #fff;
}

.button:hover {
    background: #17795E;
}

.button:hover .button__text {
    color: transparent;
}

.button:hover .button__icon {
    width: 148px;
    transform: translateX(0);
}

.button:active .button__icon {
    background-color: #146c54;
}

.button:active {
    border: 1px solid #09ab88;
}
</style>