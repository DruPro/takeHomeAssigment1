import { ref } from "vue";
function useMessageHandler() {
    const isMessageHidden = ref(true);
    const messageText = ref("Added Item To Cart")
    
    const displayMessage = function (message) {
        messageText.value = message
        isMessageHidden.value = false;
        setTimeout(() => {
            isMessageHidden.value = true;
        }, 3000);
    }

    return {
        isMessageHidden, 
        messageText,
        displayMessage,
    }
}
export default useMessageHandler