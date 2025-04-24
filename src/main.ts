import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import genQrCode from './genQrcode.ts'

const app = createApp(App)
app.use(genQrCode)
app.mount('#app')
