<script setup>
import { defineProps, watch, ref} from 'vue';
const props = defineProps(["product","onAddToCartClick","handleQuantityButton"])
import AddToCartButton from './addToCartButton.vue';
import Ratings from './ratings.vue';

const testref= ref(0)
</script>

<template>
  <div id="contentWrapper">
    <div id="productFrame">
      <!-- Left: Product Image + Name -->
      <div class="productImageContainer">
        <img src="https://picsum.photos/300?random=1" alt="Product Image" />
        <h1 class="productTitle">{{ props.product.name }}</h1>
      </div>

      <!-- Right: Details -->
      <div class="productDetails">
        <h2 class="sectionHeading">Description</h2>
        <p class="sectionText">
          {{props.product.description}}
        </p>

        <h2 class="sectionHeading">Category</h2>
        <p class="sectionText">
          {{ props.product.category }}
        </p>
        <div id="buttonContainer">
          <div class="quantity">
            <button @click="()=>{props.handleQuantityButton(-1)}"> - </button>
            <p>{{props.product.quantity}}</p>
            <button @click="()=>{props.handleQuantityButton(+1)}"> + </button>
          </div>
          <AddToCartButton 
          id="addToCartButton"
          :button-action="props.onAddToCartClick"
          ></AddToCartButton>
          <Ratings></Ratings>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.quantity {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.quantity p {
  font-weight: bold;
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

.quantity button {
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

.quantity button:hover {
  background-color: #196;
  transform: scale(1.05);
}

.quantity button:active {
  transform: scale(0.95);
}

#buttonContainer{
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

#addToCartButton{
  margin-right: 20px;
}
Ratings{
  transform: scale(0.5)
}
#contentWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(135deg, #1e1e1e, #252a30);
  color: #f9f9f9;
  border: 1px solid #2f4f4f;
  border-radius: 16px;
  box-shadow:
    0 0 12px rgba(25, 255, 155, 0.15),
    0 20px 40px rgba(0, 0, 0, 0.5);
  animation: fadeInModal 0.3s ease-out;
}

#productFrame {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #2a2f38;
  padding: 1.2rem;
  border-radius: 12px;
  box-shadow: inset 0 0 5px rgba(25, 255, 155, 0.1);
  color: white;
  padding: 3rem;
  border-radius: 20px;
  gap: 3rem;
  flex-wrap: wrap;
  width: 70vw;
}

.productImageContainer {
  flex: 1;
  text-align: center;
}

.productImageContainer img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}

.productTitle {
  margin-top: 1rem;
  font-size: 1.75rem;
  font-weight: bold;
}

.productDetails {
  flex: 2;
  text-align: left;
}

.sectionHeading {
  margin-top: 1.5rem;
  font-size: 1.25rem;
  border-bottom: 1px solid #555;
  padding-bottom: 0.5rem;
}

.sectionText {
  margin-top: 0.5rem;
  line-height: 1.6;
}

.specList {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-top: 0.5rem;
  line-height: 1.6;
}
</style>
