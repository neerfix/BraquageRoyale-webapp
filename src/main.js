import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import './registerServiceWorker'
import '/service-worker'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyA179WMS9Q1RgHekGdkcI35U0qctbTJslo",
  authDomain: "braquage-royale.firebaseapp.com",
  projectId: "braquage-royale",
  storageBucket: "braquage-royale.appspot.com",
  messagingSenderId: "30935066556",
  appId: "1:30935066556:web:fa8361d2349546f0b5adb9",
  measurementId: "G-QLKGQ34WFZ"
};

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
  firebaseConfig,
  render: h => h(App)
}).$mount('#app')
