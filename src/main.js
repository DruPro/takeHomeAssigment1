import { createApp } from 'vue' //App Initialization
import router from "./router" // Router for switching views because its a default export import can regcognixe by name of module in directory
import pinia from './globalStorage/config/pinia'
import './style.css' // Global css
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
