<script setup>
import { defineProps } from 'vue';
import AccountFields from './accountFields.vue';
import UserProfile from './userProfile.vue';
const props = defineProps(["userName","billingInfo","shippingInfo"])
</script>
<template>
    <div class="accountCardWrapper">
        <div class="accountCard">
            <UserProfile
            :user-name="props.userName"></UserProfile>
            <AccountFields
            :billing-info="props.billingInfo"
            :shipping-info="props.shippingInfo"
            ></AccountFields>
        </div>
    </div>
</template>
<style scoped>
.accountCardWrapper {
    display: flex;
    flex-shrink: inherit;
    justify-content: center;
    align-items: center;
    width: 50%;
}
.accountCard {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 4rem;
    border-bottom: #196 3px solid;
    border-radius: 40px;
    padding: 3rem;
    background: #1e1e1e;
    border-top: 1px solid #444;
    border-left:1px solid #444;;
    border-right: 1px solid #444;
    box-shadow: 0px 187px 75px rgba(0, 0, 0, 0.01), 
                0px 105px 63px rgba(0, 0, 0, 0.05), 
                0px 47px 47px rgba(0, 0, 0, 0.09), 
                0px 12px 26px rgba(0, 0, 0, 0.1), 
                0px 0px 0px rgba(0, 0, 0, 0.1);
}

.AccountFields {
    margin-top: 3re
}

@media (max-width: 768px) {
    .accountCardWrapper {
    width: 90%;
}
}
</style>