import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import './assets/css/tailwind.css'
import elementComponent from './utils/compoent'


const app = createApp(App)
app.use(store)
app.use(router)


elementComponent.forEach(item => {
  app.component(item.name, item)
})


app.mount('#app')