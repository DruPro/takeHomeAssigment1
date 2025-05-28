<script setup>
import { computed, defineProps } from "vue";
import AddToCartButton from "../../productDetailsPage/addToCartButton.vue"
const props = defineProps(["currentItem","isModalActive","onQuantityClick","onExitClick","onAddToCart", "onDeleteClick"])
const currentItem = computed(()=>{
    if (Object.keys(props.currentItem).length === 0){
        return {itemName:"Unknown",
                quantity:0
        }
    }
    else{
        return props.currentItem
    }
    })
</script>

<template>
  <div class="addToCartModal" v-show="props.isModalActive">
    <div class="headerContainer">
        <h1 class="modal-title">{{ props.currentItem.name }}</h1>
        <button class="exitButton" @click="onExitClick">Done</button>
    </div>
    <div class="modal-content">
      <img id="itemImage" :src="currentItem.image" alt="Product Image" />
      <div class="item-info">
        <p>{{ currentItem.name }}</p>
      </div>
      <p id="quanityIndicator">{{currentItem.quantity}}</p>
      <div class="quantity-controls">
        <button @click="()=>{props.onQuantityClick(1)}" id="increaseButton" class="qty-btn">+</button>
        <button @click="()=>{props.onQuantityClick(-1)}" id="decreaseButton" class="qty-btn">−</button>
      </div>
    </div>
    <div class="trashButtonContainer"  @click="onDeleteClick">
            <img src="../../../../assets/images/icons/trash.svg">
      </div>
  </div>
</template>

<style scoped>

.trashButtonContainer{
    margin-top: 3rem;
    display: flex;
    justify-content: center;
    background : linear-gradient(40deg, #b60707, #ff1212);
    align-items: center;
    padding: 0.5rem;
    border-radius: 3px;
}
.trashButtonContainer:hover{
    display: flex;
    justify-content: center;
    transition: ease-in-out;
    background : linear-gradient(100deg, #b60707, #ff1212);
    align-items: center;
    padding: 0.5rem;
    border-radius: 10px;
}
.addToCartModal {
  padding: 2rem;
  position: fixed;
  top: 35vh;
  left: 50%;
  transform: translateX(-50%);
  max-width: 420px;
  width: 90%;
  background: linear-gradient(135deg, #1e1e1e, #252a30);
  color: #f9f9f9;
  border: 1px solid #2f4f4f;
  border-radius: 16px;
  box-shadow:
    0 0 12px rgba(25, 255, 155, 0.15),
    0 20px 40px rgba(0, 0, 0, 0.5);
  animation: fadeInModal 0.3s ease-out;
}

@keyframes fadeInModal {
  from {
    opacity: 0;
    transform: translateX(-50%) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
}

.headerContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 1rem;
}

.exitButton {
  background: transparent;
  border: none;
  color: #aaa;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.exitButton:hover {
  color: #ff6b6b;
}

.modal-title {
  font-size: 1.6rem;
  font-weight: bold;
  text-align: left;
  color: #00ffc8;
}

.modal-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  background-color: #2a2f38;
  padding: 1.2rem;
  border-radius: 12px;
  box-shadow: inset 0 0 5px rgba(25, 255, 155, 0.1);
}

#itemImage {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 10px;
  background-color: #196;
  box-shadow: 0 0 5px #00ffc8;
}

.item-info {
  flex-grow: 1;
  font-size: 1.1rem;
}

#quanityIndicator {
  font-family: monospace;
  width: 3ch;
  text-align: center;
  font-size: 1.3rem;
  font-weight: bold;
  color: #0f0;
  background-color: rgba(255, 255, 255, 0.05);
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
}

.quantity-controls {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.qty-btn {
  padding: 0.5rem;
  width: 36px;
  font-size: 1.3rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(145deg, #196, #0f7);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(0, 255, 150, 0.4);
}

.qty-btn:hover {
  background: linear-gradient(145deg, #0f7, #196);
  transform: scale(1.05);
}

.qty-btn:active {
  transform: scale(0.95);
  background-color: #155;
}

.addToCartButtonContainer {
  margin-top: 2.5rem;
  display: flex;
  justify-content: center;
}

@media (max-width: 768px) {
  .exitButton{
    max-width: 20vw;
  }
  .addToCartModal{
    flex-shrink: inherit;
  }
}
</style>
