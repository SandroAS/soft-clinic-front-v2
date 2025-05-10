import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { vuetify } from './plugins/vuetify'
import { Form, Field, ErrorMessage } from '@/plugins/vee-validate.js'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.component('VeeValidateForm', Form)
app.component('VeeValidateField', Field)
app.component('VeeValidateErrorMessage', ErrorMessage)

app.mount('#app')
