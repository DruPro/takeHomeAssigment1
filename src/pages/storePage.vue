<script setup>
import Navbar from '../components/pattens/navbar.vue';
import { computed, ref } from 'vue';
import ItemCategory from '../components/pattens/storePage/itemCategory.vue';
const catNames = [{ name: "Accessories" }, { name: "Apparel" }, { name: "Electronics" }]
//Categories are types manually for the front page.
//Data will be fetched by the page and trinkled down
//Category Pattens will find the items within the data
import useFetch from "../composabiles/fetch.js"
import CoinOffer from '../components/pageSections/coinOffer.vue';
import useCartManager from '../composabiles/cartManager.js';
import useAccountStore from '../globalStorage/accountStorage/accountStorage.js';
import AddToCartModal from '../components/pattens/storePage/cart/AddToCartModal.vue';
import Message from '../components/misc/message.vue';
import useMessageHandler from '../composabiles/displayMessage.js';
import useModalController from '../composabiles/modalController.js';
import BuyNowModal from '../components/pattens/storePage/cart/buyNowModal.vue';
let url = "https://cart-api.alexrodriguez.workers.dev/products"


const cartManager = useCartManager()
const addToCartModalController = useModalController();
const buyNowModalController = useModalController()
const messageHandler = useMessageHandler()
const multiplier = ref(1);
//Data Storage
const accountStorage = useAccountStore()
const cart = accountStorage.account.cart
//Composibles
const { data, isloading, error } = useFetch(url);


//on item card cart button click
function handleAddToCartModal(itemId){
  addToCartModalController.openModal()
  cartManager.focusItem({
    from:"array",
    data,
    id:itemId
    })
  }

//on item card buy now button click
function handleBuyNowModal(itemId){
  buyNowModalController.openModal()
  cartManager.focusItem({
    from:"array",
    data,
    id:itemId,

  })
}
function handleQuantityClick(number){
  cartManager.changeFocusedItemQuantity(number)
}


function handleBuyNow(){
  const currentItem = cartManager.currentFocusedItem.value
  const total = (currentItem.quantity * currentItem.price)
  if(accountStorage.account.balance > total){
    messageHandler.displayMessage("Items Ordered")
    buyNowModalController.toggleModalVisibility()
    accountStorage.subtractBalance(total)
    const itemToBuy = cartManager.currentFocusedItem.value;
    accountStorage.account.orderedItems.push(itemToBuy)
  }
  else{
    messageHandler.displayMessage("Insufficient Funds")
  }
}

//Handles add to cart functionality
function HandleAddToCart(){
  if(cartManager.currentFocusedItem.value.quantity > 0){
  cartManager.addFocusedItemToCart(cart)
  addToCartModalController.toggleModalVisibility()
  messageHandler.displayMessage("Added to cart")
  }else{
    addToCartModalController.toggleModalVisibility()
  }
  }


function onInput(event) {
  multiplier.value = parseInt(event.target.value);
  console.log(typeof multiplier.value)
}

</script>

<template>
  <Navbar></Navbar>
  <CoinOffer></CoinOffer>
  <div id="productDisplay">
    <div v-if="error" class="errorMessage">
      <h1> Sorry but there seems to be a network error</h1>
    </div>
    <div v-else class="multiplierContainer">
      <h4>Test Multiplier</h4>
      <input class="multiplier" type="range" min="1" max="10" :value="multiplier" @input="onInput">
    </div>
    <ItemCategory v-if="data" v-for="cat in catNames" 
    :key="cat.name" 
    :cat-name="cat.name" 
    :isloading 
    :error 
    :data 
    :on-cart-button-click="handleAddToCartModal"
    :on-buy-now-button-click="handleBuyNowModal"
    :multiplier="multiplier"
    >
    </ItemCategory>
  </div>  
  <AddToCartModal
    :is-modal-active="addToCartModalController.isModalActive.value"
    :current-item="cartManager.currentFocusedItem.value"
    :on-quantity-click="handleQuantityClick"
    :on-exit-click="addToCartModalController.toggleModalVisibility"
    :on-add-to-cart="HandleAddToCart">
  </AddToCartModal>
    <BuyNowModal
      :is-modal-active="buyNowModalController.isModalActive.value"
      :current-item="cartManager.currentFocusedItem.value"
      :on-quantity-click="handleQuantityClick"
      :on-exit-click="buyNowModalController.toggleModalVisibility"
      :on-buy-now="handleBuyNow">
    </BuyNowModal>
  <Message
    :is-hidden="messageHandler.isMessageHidden.value" 
    :message-text="messageHandler.messageText.value"></Message>
</template>

<style scoped>
  .multiplierContainer {
    color: white;
    display: flex;
    flex-wrap: wrap;       /* like totalContainer */
    gap: 1rem;             /* spacing between items */
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    background: #1e1e1e;   /* similar dark bg like .card */
    border-radius: 8px;
    box-shadow:
      0px 10px 15px rgba(0, 0, 0, 0.2),
      0px 4px 6px rgba(0, 0, 0, 0.1);
  }

    .multiplier {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 10px;
    border-radius: 5px;
    background-color: #177602;
    background-image: linear-gradient(43deg, #41d0c9 0%, #50c858 46%, #177602 100%);
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
  }

  .multiplier::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #00ff6a;
    background-image: linear-gradient(160deg, #00d4f5 0%, #80D0C7 100%);
    cursor: pointer;
  }

  .multiplier::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #0093E9;
    background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
    cursor: pointer;
  }


  .errorMessage{
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
</style>