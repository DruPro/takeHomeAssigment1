<script setup>

import ProductDetails from '../../components/pattens/productDetailsPage/productDetails.vue';
import { useRoute } from 'vue-router';
import Navbar from '../../components/pattens/navbar.vue';
import useFetch from "../../composabiles/fetch.js"
import Message from "../../components/misc/message.vue"
import useMessageHandler from '../../composabiles/displayMessage.js'
import useCartManager from '../../composabiles/cartManager.js';
import useAccountStore from '../../globalStorage/accountStorage/accountStorage.js';
const accountStorage = useAccountStore()
const route = useRoute()
const productUrl = "https://cart-api.alexrodriguez.workers.dev/products/" + `${route.params.id}`
const {data,isloading,error} = useFetch(productUrl)

import { onMounted, watch } from 'vue';
const messageHandler = useMessageHandler();
const cartManager = useCartManager();

function handleAddToCart(){
    //check if input amount is too much
    if(cartManager.currentFocusedItem.value.quantity === 0){
        return
    }
    if(cartManager.currentFocusedItem.value.quantity <= 100){
        cartManager.addFocusedItemToCart(accountStorage.account.cart)
        messageHandler.displayMessage("Item added to cart")
    }
    else{
        messageHandler.displayMessage("Quantity must be under 100")
    }

}

function handleQuanitityButton (number){
    cartManager.changeFocusedItemQuantity(number)
}

watch(data,()=>{
    cartManager.focusItem({
        from : "object",
        data    
    })
})
</script>
    <template>
        <Navbar></Navbar>
        <ProductDetails v-if="data" 
        :product="cartManager.currentFocusedItem.value"
        :on-add-to-cart-click="handleAddToCart"
        :handle-quantity-button="handleQuanitityButton"
        ></ProductDetails>  
        <Message 
            :is-hidden="messageHandler.isMessageHidden.value"
            :message-text="messageHandler.messageText.value"
        ></Message>
    </template>

<style scoped>

</style>