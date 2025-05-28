<script setup>
import { defineProps,computed } from 'vue';
const props = defineProps(["balance"])
const balance = computed(()=>{
            return +(Math.round(props.balance + "e+2") + "e-2");
})
</script>

<template>
  <div class="balance-wrapper">
    <div class="balance-container">
      <span class="currency">$</span>
      <span class="amount">{{ balance }}</span>
    </div>
  </div>
</template>

<style scoped>
.balance-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.balance-container {
  display: flex;
  align-items: baseline;
  gap: 0.3rem;
  padding: 0.75rem 1.25rem;
  background: linear-gradient(145deg, #1a1a1a, #0d0d0d);
  border: 2px solid #196;
  box-shadow:
    0 0 8px #196,
    0 0 20px #196,
    inset 0 0 6px #196;
  border-radius: 1rem;
  font-family: 'Michroma', sans-serif;
  color: #196;
  font-size: 1.2rem;
  transition: all 0.3s ease-in-out;
}

.balance-container:hover {
  transform: scale(1.05);
  box-shadow:
    0 0 10px #03c26f,
    0 0 20px #03c26f,
    0 0 40px #03c26f;
}

.currency {
  color: #ff00ff;
}

.amount {
  color: #196;
}

</style>
