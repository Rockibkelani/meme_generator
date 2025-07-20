import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faImage, faDownload, faShareAlt, faRedo, faTimesCircle,faPenNib, faBrain, faBars } from '@fortawesome/free-solid-svg-icons'

library.add(faImage, faDownload, faShareAlt, faRedo, faTimesCircle, faPenNib, faBrain, faBars)

createApp(App)
  .use(router)
  .component('FontAwesomeIcon', FontAwesomeIcon)
  .mount('#app')
