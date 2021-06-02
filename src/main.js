import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import './registerServiceWorker'
import '/service-worker'

// CSS / SCSS
import './assets/scss/main.scss'

Vue.config.productionTip = false

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js', {
    scope: '/'
  }).then(function(registration) {
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }, function(err) {
    console.log('ServiceWorker registration failed: ', err);
  });
}


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
