<script setup>
import Input1 from "../../../inputs/input1.vue"
import { defineProps } from "vue";
const props = defineProps(["billingInfo","shippingInfo"])
</script>
<template>
    <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
        <div>
            <h3>Shipping Info</h3>
            <div style="border-top: 1px solid gray;">
                <h4>Address</h4>
                <Input1 v-model:="props.shippingInfo.address"></Input1>
            </div>
            <div>
                <h4>State</h4>
                <Input1 v-model="props.shippingInfo.state"></Input1>
            </div>
            <div>
                <h4>ZipCode</h4>
                <Input1 v-model="props.shippingInfo.zipCode" ></Input1>
            </div>
        </div>
        <div>
            <h3>Billing Info</h3>
            <div style="border-top: 1px solid gray;">
                <h4>Address</h4>
                <Input1 v-model="props.billingInfo.address"></Input1>
            </div>
            <div>
                <h4>Phone</h4>
                <Input1 v-model="props.billingInfo.phone"></Input1>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap');

h4,
h3 {
    color: white;
}

h4,
h3,
h1 {
    font-family: "Red Hat Display", sans-serif;
}
</style>