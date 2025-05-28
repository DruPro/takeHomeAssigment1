<script setup>
import { computed, defineProps } from 'vue';
const props = defineProps(["userName"])
const currentUserName = computed(() => {
  return props.userName || "Guest User";
});

</script>
<template>
    <div class="profileContainer">
        <h1 style="flex-shrink: inherit;">{{currentUserName}}</h1>
        <img src="../../../../assets/images/defaultProfilePic.webp">
    </div>  
</template>
<style scoped>

.profileContainer{
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
img {
    width: 100%;
    object-fit: contain;
}

@media (max-width: 768px) {
  img {
    width: 100%;
  }

}

</style>