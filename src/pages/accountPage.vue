<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import AccountCard from '../components/pattens/AccountPage/AccountCard/accountCard.vue';
import AccountPageCart from '../components/pattens/AccountPage/cart/accountPageCart.vue';
import cartMoreModal from '../components/pattens/AccountPage/cart/cartMoreModal.vue';
import Navbar from '../components/pattens/navbar.vue';
import useAccountStore from '../globalStorage/accountStorage/accountStorage';
import Message from "../components/misc/message.vue"
import useMessageHandler from '../composabiles/displayMessage';
import useCartManager from '../composabiles/cartManager';
import useModalController from '../composabiles/modalController';
import OrderList from '../components/pattens/AccountPage/orderList/orderList.vue';
const router = useRouter();
const cartManager = useCartManager();
const accountStore = useAccountStore();
const messageHandler = useMessageHandler();
const cartMoreModalController = useModalController()
const cart = accountStore.account.cart;
const cartTotal = computed(()=>{
      return cartManager.getCartTotal(cart);
    })

function onQuanityClick(quantity){
  cartManager.changeFocusedItemQuantity(quantity)
  }

function onMoreButtonClick(itemId){
  cartManager.focusItem({
    from: "array",
    data : cart,
    id: itemId,
  })
  cartMoreModalController.openModal()
}
function handleCheckout(){
  const total = cartTotal.value
  if(accountStore.account.balance > total){
    messageHandler.displayMessage("Items Ordered")
    accountStore.subtractBalance(total)
    const checkedOutItems = cartManager.checkout(cart);
    for (let item of checkedOutItems){
      accountStore.account.orderedItems.push(item)
    }
  }
  else{
    messageHandler.displayMessage("Insufficient Funds")
  }
}
function handleDeleteFromCart(){
  messageHandler.displayMessage("Item Deleted")
  cartManager.deleteCurrentFocusedItemFromCart(cart)
  cartMoreModalController.toggleModalVisibility()
  }

function onModalExit(){
  if (cartManager.currentFocusedItem.value.quantity <= 0 ){
    cartManager.deleteCurrentFocusedItemFromCart(cart);
    messageHandler.displayMessage("Item Deleted")
  }
  cartMoreModalController.toggleModalVisibility()
}

function onItemClick(itemId){
  const url = "/product/" + itemId
  router.push(url)
  }
</script>

<template>
  <Navbar></Navbar>
  <div class="sectionTopWrapper">
    <div id="sectionTop">
      <AccountCard
      :user-name="accountStore.getUserName"
      :billing-info="accountStore.account.userInfo.userBillingInformation"
      :shipping-info="accountStore.account.userInfo.userShippingInformation"
      ></AccountCard>
      <AccountPageCart
      :user-cart="accountStore.getUserCart"
      :on-more-button-click="onMoreButtonClick"
      :on-checkout-click="handleCheckout"
      :cart-total="cartTotal"
      >
      </AccountPageCart>

      <cartMoreModal style="z-index: 80;"
      :on-exit-click="onModalExit"
      :on-quantity-click="onQuanityClick"
      :current-item="cartManager.currentFocusedItem.value"
      :is-modal-active="cartMoreModalController.isModalActive.value"
      :on-delete-click="handleDeleteFromCart"
      >
      </cartMoreModal>
    </div>
  </div>
  <div class="setionBottom">
    <OrderList
    :ordered-items="accountStore.account.orderedItems"
    :on-item-click="onItemClick"
    ></OrderList>
    </div>
  <!--Orded Items-->
  <Message
  :is-hidden="messageHandler.isMessageHidden.value"
  :message-text="messageHandler.messageText.value"></Message>
</template>

<style scoped>
#sectionTopWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

#sectionTop {
  display: flex;
  flex-wrap: wrap;
  max-width: 100vw;
  justify-content: space-evenly;
  align-items: center;
  padding: 2rem;
}

@media (max-width: 768px) {
  .sectionTopWrapper {
    display: flex;
    align-items: center;
  }
  
  #sectionTop {
    padding: 0px;
  }
}
</style>