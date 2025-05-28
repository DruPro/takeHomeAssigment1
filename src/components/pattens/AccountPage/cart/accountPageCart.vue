<script setup>
import { computed, defineProps , ref } from 'vue';
import CoolGlowyButton from '../../../buttons/coolGlowyButton.vue';
const props = defineProps(["userCart","cartTotal","onMoreButtonClick","onCheckoutClick"])
const isEmpty = computed(()=>{
  return props.userCart.length === 0 ? true : false
})
const buttonText = "Checkout"
</script>
<template>
  <div class="master-container">
    <div class="card cart">
      <label class="title">Your cart</label>
      <div class="products">
        <div v-if="isEmpty" class="product">
          <div>
            <p>no products selected</p>
          </div>
        </div>
        <div class="product" v-for="item in props.userCart">
          <img :src="item.image" class="itemImage">
          <div class="nameContainer">
            <p>{{item.name}}</p>
          </div>
          <div class="quantity">
            <label>{{item.quantity}}</label>
          </div>
          <div>
            <img @click="()=>{props.onMoreButtonClick(item.id)}" src="../../../../assets/images/icons/moreIcon.svg">
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="card cart paymentTypes">
        <img src="../../../../assets/images/logos/american-express.svg">
        <img src="../../../../assets/images/logos/visa.svg">
        <img src="../../../../assets/images/logos/mastercard.svg">
        <img src="../../../../assets/images/logos/apple-pay.svg">
      </div>
    </div>

    <div class="card">
      <label class="title">Checkout</label>
      <div class="totalContainer">
        <p style="color: white;">
          Total:<span>{{props.cartTotal}}</span>
        </p>
        <CoolGlowyButton
        :button-text="buttonText"
        :button-action="props.onCheckoutClick"
        >
      </CoolGlowyButton>
      </div>

    </div>
  </div>
  </template>
<style scoped>
.totalContainer{
  display: flex;
  flex-wrap:
  wrap; gap: 1rem;
  align-items: center;
  justify-content: center;
}
.totalContainer button{
  height: 3rem;
}
.button{
  padding: 0.5rem;
  font-size: 1.3rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(145deg, #196, #0f7);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(0, 255, 150, 0.4);
}

.paymentTypes{
  display: flex;
  gap: 1rem;
}
.paymentTypes img{
  max-width: 2rem;
  background-color: rgb(255, 255, 255);
  }

.itemImage{
  height:  60px;
  width : 60px;
}

.master-container {
  display: flex;
  width: inherit;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  gap: 5px;
}

.card {
  background: #1e1e1e;
  box-shadow: 0px 187px 75px rgba(0, 0, 0, 0.01),
    0px 105px 63px rgba(0, 0, 0, 0.05),
    0px 47px 47px rgba(0, 0, 0, 0.09),
    0px 12px 26px rgba(0, 0, 0, 0.1),
    0px 0px 0px rgba(0, 0, 0, 0.1);
  border-bottom: #196 3px solid;
}

.title {
  width: 100%;
  height: 40px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 20px;
  border-bottom: 1px solid #333;
  font-weight: 700;
  font-size: 11px;
  color: #bbb;
}

.cart {
  border-radius: 19px 19px 7px 7px;
}

.cart .products {
  display: flex;
  flex-direction: column;
  padding: 10px;
  overflow: scroll;
  gap: 0.5rem;
  max-height: 200px;
  color: white;
}

.cart .product{
  display: flex;
  gap: 2rem;
  align-items: center;
}

.cart .product .nameContainer{
  width: 15%;
}

.cart .product .quantity{
  display: flex;
  justify-content: space-evenly;
  width: 30%;
}
.cart .product .quantity label{
  width: 3ch;
  text-align: center;
  margin-top: auto;
  margin-bottom: auto;
}


@media (max-width: 768px) {
  .cart {
    width: 75vw;
  }

  .cart .products{
    flex-direction: column;
  }
  .totalContainer{
  display: flex;
  flex-wrap: wrap; 
  gap: 0px;
  align-items: none;
  justify-content: none;
}
.cart .product .price{
    margin-right: auto;
    margin-left: auto;
    }
.cart .quantity button:hover{
  background-color: rgb(30, 30, 30);
}
}
</style>