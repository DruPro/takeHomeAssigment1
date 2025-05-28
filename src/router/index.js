import { createWebHistory, createRouter } from "vue-router";

import homePage from "../pages/homePage.vue";
import entryPage from "../pages/entryPage.vue";
import storePage from "../pages/storePage.vue";
import accountPage from "../pages/accountPage.vue";
import productPage from "../pages/dynamicPages/productPage.vue";

const routes = [
    { path: "/", component: homePage },
    { path: "/entry", component: entryPage },
    { path: "/product/:id", component: productPage },
    { path: "/store", component: storePage },
    { path: "/account", component: accountPage },
]

const router = createRouter({
    history: createWebHistory(),
    routes, // Automatically Assinges routes to the routes property
})

export default router