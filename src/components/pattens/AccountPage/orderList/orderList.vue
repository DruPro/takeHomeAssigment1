<script setup>
import { computed } from "vue"
import OrderedItemCard from "./orderedItemCard.vue"
const props = defineProps(["orderedItems","onItemClick"])
const isEmpty = computed(()=>{
    return  props.orderedItems.length <= 0 ? true : false
})

</script>

<template>
    <div class="itemDisplayWrapper">
        <div class="catnameContainer">
            <h1>Ordered Items</h1>
        </div>
        <div class="itemCardFrame">
            <OrderedItemCard v-for="item of props.orderedItems"
            :item="item"
            :on-item-click="props.onItemClick"
            >
            </OrderedItemCard>
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