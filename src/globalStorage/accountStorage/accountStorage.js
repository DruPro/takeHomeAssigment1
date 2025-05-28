import { computed, ref } from "vue"
import { defineStore } from "pinia"

const useAccountStore = defineStore("account", () => {
    const account = ref({
        userInfo: {
            userName: "",
            userProfilePic: "",
            userBillingInformation: {
                address: "",
                phone: "",
            },
            userShippingInformation: {
                address: "",
                zipCode: "",
                state: ""
            }
        },
        cart: [],
        orderedItems: [],
        balance: 0.00
    })
    function addToBalance(quantity) {
        if (typeof quantity != "number") {
            return console.error(`Could not add to balance, expected a number parameter, recieved ${typeof quantity}`)
        }
        account.value.balance += quantity
    }
    function addToCart(focusedItem) {
        const currentCart = account.value.cart;
        const currentID = focusedItem.id;
        const existingItem = currentCart.find(item => item.id === currentID);
        if (!existingItem) {
            account.value.cart.push(focusedItem);
        } else {
            // Add or update a property on the existing item
            existingItem.quantity = (focusedItem.quantity || 0);
            // Or: existingItem.someProperty = newValue;
        }
    }
    const getUserCart = computed(()=>{
        return account.value.cart
    })
    const getProfilePic = computed(() => { return account.value.userInfo.userProfilePic })
    const getUserName = computed(() => { return account.value.userInfo.userName })
    const getUserBillingInformation = computed(()=>{
        return account.value.userInfo.userBillingInformation
    })
    const getUserShippingInformation = computed(()=>{
        return account.value.userInfo.userShippingInformation
    })
    function setUserName (newUserName = "") {
        account.value.userInfo.userName = newUserName;
    }
    function subtractBalance(number){
        account.value.balance -= number
    }
    return {
        account,
        addToBalance,
        addToCart,
        getProfilePic,
        getUserName,
        setUserName,
        getUserCart,
        getUserBillingInformation,
        getUserShippingInformation,
        subtractBalance,
    }
}, {
    persist: true  // <-- enable persistence here
})

export default useAccountStore