import xel from "xel/xel"

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "./style.css"
import App from './App.vue'
import VueKonva from "vue-konva"

xel.accentColor = "blue"

const app = createApp(App)
app.use(createPinia())
app.use(VueKonva);
app.mount('#app')

