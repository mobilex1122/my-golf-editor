import xel from "xel/xel"

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "./style.css"
import App from './App.vue'

xel.accentColor = "blue"

const app = createApp(App)
app.use(createPinia())
app.mount('#app')

