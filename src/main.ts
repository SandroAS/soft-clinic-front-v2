import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { vuetify } from './plugins/vuetify'
import { MaskDirective } from 'vue-the-mask';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.directive('mask', MaskDirective);

app.mount('#app')
