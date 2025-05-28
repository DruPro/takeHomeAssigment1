import { ref, isRef, computed } from "vue"


function useCartManager() {
    //Item prepared for modification.
    const currentFocusedItem = ref({});
    const getCartTotal = function (cart) {
        if (isRef(cart)) {
            let total = 0
            for (let item of cart.value) {
                total += (item.price * item.quantity)
            }
            //Rounds totwo 2 decimals
            return +(Math.round(total + "e+2") + "e-2");
        }
        else {
            let total = 0
            for (let item of cart) {
                total += (item.price * item.quantity)
            }
            //Rounds totwo 2 decimals
            return +(Math.round(total + "e+2") + "e-2");
        }

    }
    const focusItem = function (options) {
        if (!options.from) {
            return console.error(`Function missing the from: property`)
        }
        let optionHandler = {
            "object": function (options) {
                function focusRefObject() {
                    const itemToFocus = options.data.value
                    return itemToFocus
                }
                function focusClassicObject() {
                    const itemToFocus = options.data
                    return itemToFocus
                }
                const isDataRef = isRef(options.data)
                const itemToFocus =
                    isDataRef
                        ? focusRefObject(options.data)
                        : focusClassicObject(options.data)
                if (!itemToFocus.quantity) {
                    itemToFocus.quantity = 0;
                }
                currentFocusedItem.value = itemToFocus;
            },
            "array": function (options) {
                function focusRefArray() {
                    const itemToFocus = options.data.value.find((item) => {
                        return item.id === options.id
                    })
                    return itemToFocus
                }
                function focusClassicArray() {
                    const itemToFocus = options.data.find((item) => {
                        return item.id === options.id
                    })
                    return itemToFocus
                }
                const isDataRef = isRef(options.data)
                const itemToFocus =
                    isDataRef
                        ? focusRefArray(options.data)
                        : focusClassicArray(options.data)
                if (!itemToFocus.quantity) {
                    itemToFocus.quantity = 0;
                }
                currentFocusedItem.value = itemToFocus;
            }
        }
        if (optionHandler.hasOwnProperty(options.from)) {
            optionHandler[options.from](options)
        } else {
            return console.error(`${options.from} is an incorrect field`)
        }
        //If focused item object does not have quantity add it
    }

    const changeFocusedItemQuantity = function (number) {
        const currentQuantity = currentFocusedItem.value.quantity;
        const newQuantity = currentQuantity + number;

        // Only update if new quantity is between 0 and 100 (inclusive)
        if (newQuantity >= 0 && newQuantity <= 100) {
            currentFocusedItem.value.quantity = newQuantity;
        }
    };

    const addFocusedItemToCart = function (cart) {
        const itemInCart = cart.find(item => { return item.id === currentFocusedItem.value.id })
        if (itemInCart) {
            itemInCart.quantity += currentFocusedItem.value.quantity
        }
        else {
            cart.push(currentFocusedItem.value);
        }
    }

    const deleteCurrentFocusedItemFromCart = function (cart) {
        const itemIndex = cart.findIndex((cartItem) => {
            return cartItem.id === currentFocusedItem.value.id
        })
        return cart.splice(itemIndex, 1);
    }

    const checkout = function (cart) {
        const startIndex = 0;
        const endIndex = cart.length;
        return cart.splice(startIndex, endIndex);
    }

    return { currentFocusedItem, focusItem, changeFocusedItemQuantity, addFocusedItemToCart, deleteCurrentFocusedItemFromCart, getCartTotal, checkout }
}


export default useCartManager