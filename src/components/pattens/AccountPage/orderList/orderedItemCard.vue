<script setup>
import { defineProps } from 'vue';
const props = defineProps(["item","onItemClick"]);
</script>

<template>
  <div class="card" @click="()=>{props.onItemClick(props.item.id)}">
    <div class="image-wrapper">
      <img :src="props.item.image" :alt="props.item.name" />
    </div>
    <div class="details">
      <p class="name">{{ item.name }}</p>
      <p class="quantity">Qty: {{ item.quantity }}</p>
      <p class="price">${{ item.price }}</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 2rem;
  width: 100%;
  min-width: 200px;
  max-width: 200px;
  min-height: 440px; /* Ensure all cards have the same height */
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  animation: fadeInModal 0.4s ease-out;
  overflow: hidden;
  color: white;
  background: #1e1e1e;
  box-shadow: 0px 187px 75px rgba(0, 0, 0, 0.01),
    0px 105px 63px rgba(0, 0, 0, 0.05),
    0px 47px 47px rgba(0, 0, 0, 0.09),
    0px 12px 26px rgba(0, 0, 0, 0.1),
    0px 0px 0px rgba(0, 0, 0, 0.1);
  border-bottom: #196 3px solid;
}

.card:hover {
  transform: scale(1.03);
  box-shadow:
    0 0 16px rgba(25, 255, 155, 0.2),
    0 20px 50px rgba(0, 0, 0, 0.6);
}

.image-wrapper {
  width: 100%;
  height: 180px;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.image-wrapper:hover img {
  transform: scale(1.05);
}

.details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  width: 100%;
  text-align: center;
  padding-top: 1rem;
}

.name,
.quantity,
.price {
  min-height: 1.5rem;
  line-height: 1.5;
}

.name {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.quantity {
  font-size: 1rem;
  color: #ccc;
}

.price {
  font-size: 1.1rem;
  color: #90ee90;
  font-weight: 500;
  margin-top: 0.25rem;
}

@keyframes fadeInModal {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
