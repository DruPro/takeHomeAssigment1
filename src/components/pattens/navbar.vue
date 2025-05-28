<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import CoinDisplay from '../misc/coinDisplay.vue';
import useAccountStore from '../../globalStorage/accountStorage/accountStorage';
const accountStore = useAccountStore();
const isMobileMenuOpen = ref(false);
</script>

<template>
  <div class="navBarWrapper">
    <nav class="navBar">
      <!-- Hamburger Menu (Mobile only) -->
      <div class="hamburger" @click="isMobileMenuOpen = !isMobileMenuOpen">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             stroke="currentColor" class="hamburgerIcon">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </div>

      <!-- Navigation Links (Desktop or Mobile Menu) -->
      <div class="navLinks" :class="{ open: isMobileMenuOpen }">
        <RouterLink to="/store" class="linkContainer" active-class="active">
          <p>Store</p>
          <div class="underline"></div>
        </RouterLink>
        <RouterLink to="/account" class="linkContainer" active-class="active">
          <p>Account</p>
          <div class="underline"></div>
        </RouterLink>
      </div>

      <!-- Coin Display -->
      <div class="coinDisplayContainer">
        <CoinDisplay :balance="accountStore.account.balance" />
      </div>

      <!-- Cart -->
       <RouterLink to="/account">
      <div id="shoppingCartContainer" title="Shopping Cart">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             stroke="currentColor" stroke-width="2" class="cartIcon">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13l-2 5h12m-6 0a1 1 0 11-2 0 1 1 0 012 0zm6 0a1 1 0 11-2 0 1 1 0 012 0z" />
        </svg>
      </div>
    </RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.navBarWrapper {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: #121212;
}

.navBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: linear-gradient(145deg, #121212, #1c1c1c);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
  font-family: 'Michroma','Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  flex-wrap: wrap;
}

.hamburger {
  display: none;
  cursor: pointer;
}

.hamburgerIcon {
  width: 2rem;
  height: 2rem;
  stroke: #03c26f;
}

/* Navigation Links */
.navLinks {
  display: flex;
  gap: 1rem;
}

.linkContainer {
  position: relative;
  padding: 0.5rem 1.2rem;
  cursor: pointer;
  color: #bbb;
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: color 0.3s ease, background-color 0.3s ease;
}

.linkContainer:hover,
.linkContainer.active {
  color: #03c26f;
  background-color: rgba(0, 188, 212, 0.15);
}

.underline {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background-color: #03c26f;
  width: 0;
  border-radius: 3px;
  transition: width 0.3s ease, opacity 0.3s ease;
  opacity: 0;
}

.linkContainer:hover .underline,
.linkContainer.active .underline {
  width: 100%;
  opacity: 1;
}

.coinDisplayContainer {
  margin-left: auto;
  margin-right: 1rem;
}

#shoppingCartContainer {
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  background: #1a1a1a;
  box-shadow:
    0 0 5px #03c26f,
    0 0 10px #03c26f,
    0 0 20px #03c26f;
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}

#shoppingCartContainer:hover {
  box-shadow:
    0 0 10px #03c26f,
    0 0 20px #03c26f,
    0 0 40px #03c26f;
  transform: scale(1.05);
}

.cartIcon {
  width: 2rem;
  height: 2rem;
  stroke: #03c26f;
  transition: stroke 0.3s ease;
}

#shoppingCartContainer:hover .cartIcon {
  stroke: #03ff95;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .hamburger {
    display: block;
  }

  .navLinks {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    display: none;
    margin-top: 1rem;
  }

  .navLinks.open {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .linkContainer {
    width: 100%;
    padding: 0.8rem 1rem;
    border-top: 1px solid #2a2a2a;
  }

  .coinDisplayContainer {
    order: 1;
  }

  #shoppingCartContainer {
    order: 2;
  }
}
</style>
