<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import useAccountStore from "../globalStorage/accountStorage/accountStorage";
import Message from '../components/misc/message.vue';
import CyberButton1 from "../components/buttons/cyberButton1.vue";
import Input1 from "../components/inputs/input1.vue";
import useMessageHandler from "../composabiles/displayMessage";
import useModalController from "../composabiles/modalController";
const accountStorage = useAccountStore();
const router = useRouter();
const messageHandler = useMessageHandler()

const inputModal = useModalController()
const userInputValue = ref("");
const buttonText = "Enter The Hive";
const userInputLength = computed(() => userInputValue.value.length);

function handleSubmit() {
  if (userInputLength.value < 3) {
    messageHandler.displayMessage("must be 3+ char's")
  } else {
    accountStorage.setUserName(userInputValue.value)
    router.push("/store");
  }
}
</script>


<template>
  <div class="intro-container">
    <section class="intro-frame">
      <div class="logo-wrapper">
        <div class="logo">
          <img src="../assets/images/logo.webp" alt="Honey Pot Logo" />
        </div>
      </div>
      <h1 class="intro-title">Cyber Bearcommerce</h1>
      <CyberButton1
      :button-action="inputModal.toggleModalVisibility"
      :button-text="buttonText"
      :style="{ visibility: inputModal.isModalActive.value ? 'hidden' : 'visible' }"
      />
    </section>
  </div>
  <div v-show="inputModal.isModalActive.value" class="userModal">
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <h3>Type in a user name</h3>
        <Input1 style="left: -6px;" v-model="userInputValue"></Input1>
        <CyberButton1 :button-action="handleSubmit" :button-text="buttonText" />
    </div>
  </div>

  <Message 
  :message-text="messageHandler.messageText.value" 
  :is-hidden="messageHandler.isMessageHidden.value"></Message>
</template>

<style scoped>
h3 {
  color: wheat
}

.userModal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* moves it back by half its size */

  border-bottom: #196 3px solid;
  border-radius: 40px;
  padding: 0rem 4rem 2rem 3rem;
  background: #1e1e1e;
  border-top: 1px solid #444;
  border-left: 1px solid #444;
  border-right: 1px solid #444;
  box-shadow:
    0px 187px 75px rgba(0, 0, 0, 0.01),
    0px 105px 63px rgba(0, 0, 0, 0.05),
    0px 47px 47px rgba(0, 0, 0, 0.09),
    0px 12px 26px rgba(0, 0, 0, 0.1),
    0px 0px 0px rgba(0, 0, 0, 0.1);
}

.intro-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #232323;
  padding: 2rem;
}

.intro-frame {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.logo-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.logo {
  width: 16rem;
  height: 16rem;
  border-radius: 50%;
  background-color: #2a2a2a;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 50%;
}

.intro-title {
  font-size: 2.5rem;
  color: #069871;
  margin-top: 1rem;
  font-weight: bold;
  text-shadow: 1px 1px 2px #000;
}

.store-link {
  text-decoration: none;
  transition: transform 0.2s ease;
}

.store-link:hover {
  transform: scale(1.05);
}
</style>
