<script setup>
import { computed , defineProps } from 'vue';
const props = defineProps(["messageText","isHidden"])
const displayConfig = computed(()=>{
  return props.isHidden  ? "none" : "block"
})
</script>

<template>
<form 
  action="" 
  class="container"
  @animationend="handleAnimationEnd"
  :style="{display: displayConfig }">
    <input 
      class="input-btn" 
      type="radio" 
      id="valueIs-1" 
      name="valueIs-radio" 
      checked="" 
      value="valueIs-1">
    <label 
      class="neon-btn" 
      for="valueIs-1">
        <span 
          class="span"></span>
        <span 
          class="txt">{{ props.messageText }}</span>
    </label>
</form>
</template>

<style scoped>

@keyframes slideInAndOut {
  0% {
    left: -500px;
    opacity: 0;
    transform: translateX(0%);
  }
  40% {
    left: 50%;
    opacity: 1;
    transform: translateX(-50%);
  }
  60% {
    left: 50%;
    opacity: 1;
    transform: translateX(-50%);
  }
  100% {
    left: 110%;
    opacity: 0;
    transform: translateX(-50%);
  }
}

.container {
  display:none;
  position: fixed; /* Better for global positioning than absolute */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Center horizontally and vertically */
  
  animation: slideInAndOut 3s ease-out forwards;
  animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-style: italic;
  font-weight: bold;
  font-size: 1.2em;
  display: grid;
  gap: 2em;
  place-content: center;
  width: 90%;
  max-width: 400px;
}


.container input[type=radio] {
  display: none;
}

.input-btn:is(:checked) + .neon-btn .span {
  inset: 2px;
  background-color: #038e39;
  background: repeating-linear-gradient(to bottom, transparent 0%, #40b59e 1px, #40b59e 3px, #0ba36b 5px, #0ba36b 4px, transparent 0.5%), repeating-linear-gradient(to left, #0a2922 100%, #044329 100%);
  box-shadow: inset 0 40px 20px #0a2912;
}

.input-btn:is(:checked) + .neon-btn .txt {
  text-shadow: 2px 4px 1px #038e39, 2px 2px 1px #0ba36b, 0 0 20px rgba(255, 255, 255, 0.616);
  color: rgb(255, 255, 255);
  animation: colorchange 0.3s ease;
}

.input-btn:is(:checked) + .neon-btn::before {
  animation-duration: 0.6s;
}

.input-btn:is(:checked) + .neon-btn::after {
  animation-duration: 0.6s;
}

.neon-btn {
  width: 300px;
  height: 60px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5em 5em;
  text-align: right;
  background: transparent;
  position: relative;
  overflow: hidden;
  transition: all 2s ease-in-out;
  -webkit-clip-path: polygon(6% 0, 93% 0, 100% 8%, 100% 86%, 90% 89%, 88% 100%, 5% 100%, 0% 85%);
  clip-path: polygon(6% 0, 93% 0, 100% 8%, 100% 86%, 90% 89%, 88% 100%, 5% 100%, 0% 85%);
}

.neon-btn .span {
  display: flex;
  -webkit-clip-path: polygon(6% 0, 93% 0, 100% 8%, 100% 86%, 90% 89%, 88% 100%, 5% 100%, 0% 85%);
  clip-path: polygon(6% 0, 93% 0, 100% 8%, 100% 86%, 90% 89%, 88% 100%, 5% 100%, 0% 85%);
  position: absolute;
  inset: 1px;
  background-color: #212121;
  z-index: 1;
}

.neon-btn .txt {
  text-align: right;
  position: relative;
  z-index: 2;
  color: aliceblue;
  font-size: 1em;
  transition: all ease-in-out 2s linear;
  text-shadow: 0px 0px 1px #4090b5, 0px 0px 1px #038e39, 0 0 1px white;
}

.neon-btn::before {
  content: "";
  position: absolute;
  height: 300px;
  aspect-ratio: 1.5/1;
  box-shadow: -17px -19px 20px #038e39;
  background-image: conic-gradient(#038e39, transparent, transparent, transparent, transparent, transparent, transparent, #17d2ad);
  animation: rotate 4s linear infinite -2s;
}

.neon-btn::after {
  content: "";
  position: absolute;
  height: 300px;
  aspect-ratio: 1.5/1;
  box-shadow: -17px -19px 10px #4090b5;
  background-image: conic-gradient(#4090b5, transparent, transparent, transparent, transparent, transparent, transparent, transparent, #13a3cb);
  animation: rotate 4s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes colorchange {
  0% {
    text-shadow: 0px 0px 0px #a26a0a, 0px 0px 0px #937402, 0 0 0px rgba(255, 255, 255, 0.616);
  }

  50% {
    text-shadow: -6px 5px 1px #a26a0a, 5px 11px 1px #937402, 0 0 20px rgba(255, 255, 255, 0.616);
  }

  to {
    text-shadow: 2px 4px 1px #a26a0a, 2px 2px 1px #937402, 0 0 20px rgba(255, 255, 255, 0.616);
  }
}

@keyframes backgroundchange {
  0% {
    background-color: transparent;
  }

  50% {
    background-color: #37b951;
  }

  to {
    background-color: transparent;
  }
}
</style>