<script setup>
import { computed,defineProps } from "vue"
import ItemCard from "./itemCard.vue"
const props = defineProps(["catName", "isloading", "error", "data","onCartButtonClick","onBuyNowButtonClick","multiplier"])
const repeatObjects = (arr, times) => {
  return arr.flatMap(obj => Array(times).fill(obj));
};
const categoryItems = computed(() => {
    let filteredItems = props.data.filter(data => data.category === props.catName)
    let multipliedItems = repeatObjects(filteredItems,props.multiplier)
    return multipliedItems
})

</script>

<template>
    <div class="itemDisplayWrapper">
        <div class="catnameContainer">
            <h1>{{ props.catName }}</h1>
        </div>
        <div class="itemCardFrame">
            <ItemCard v-for="item in categoryItems" :-item-name="item.name" :img-url="item.image"
                :item-price="item.price" :item-id="item.id"
                :on-cart-button-click="props.onCartButtonClick"
                :on-buy-now-button-click="props.onBuyNowButtonClick"
                :is-loading="props.isloading"
                >
            </ItemCard>
        </div>
    </div>
</template>

<style scoped>
.itemDisplayWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.catnameContainer {
    display: flex;
    text-align: left;
    width: 80vw;
}

.moveArrows {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    margin-left: 1rem;
}

.itemCardFrame {
    display: flex;
    justify-content: flex-start;
    gap: 1rem;
    background-color: #161616;
    padding: 1rem;
    border-radius: 20px;
    width: 80vw;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
}

@media (max-width: 768px) {
    .itemCardFrame {
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        /* Smooth scrolling on iOS */
        scroll-behavior: smooth;
    }
}
</style>