import { createApp } from 'vue'
import App from './App.vue'

//createApp(App).mount('#app')
import router from './router'
//.mount('#app')
//below creating vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import * as icon1 from '@mdi/js';
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', //already is default set in vuetify
    sets: {
      icon1
    }
  },
})
//end of create vuetify
//below create vuex 

import { createStore } from "vuex"
import vuex_store from "./store.js"
const store = createStore(
  vuex_store
);



createApp(App).use(vuetify).use(store).use(router).mount('#app')