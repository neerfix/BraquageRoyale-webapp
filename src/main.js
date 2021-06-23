import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import './registerServiceWorker'
import '/service-worker'
import firebase from 'firebase/app'
require('firebase/auth')

// CSS / SCSS
import './assets/scss/main.scss'
import './assets/scss/game.scss'
import './assets/scss/map.scss'
import './assets/scss/cell.scss'

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

firebase.initializeApp(firebaseConfig)
firebase.auth().onAuthStateChanged(user => {
    store.dispatch('fetchUser', user)
})

if("serviceWorker" in navigator){
    navigator.serviceWorker.register("/service-worker.js").then((regObject) => {
        console.log("Registration done",regObject);
    })
        .catch((error) => {
            console.error("Could not register service worker",error);
        });
}

const checkIfPushIsEnabled = () => {
    //---check if push notification permission has been denied by the user---
    if (Notification.permission === 'denied') {
        alert('User has blocked push notification.');
        return;
    }
    //---check if push notification is supported or not---
    if (!('PushManager' in window)) {
        alert('Sorry, Push notification is ' + 'not supported on this browser.');
        return;
    }
    //---get push notification subscription if serviceWorker is registered and ready---
    navigator.serviceWorker.ready
        .then(function (registration) {
            registration.pushManager.getSubscription()
                .then(function (subscription) {
                    if (subscription) {
                        //---user is currently subscribed to push---
                        console.log('true', subscription);
                    }
                    else {
                        //---user is not subscribed to push---
                        console.log('false')
                        subscribeToPushNotification()
                    }
                })
                .catch(function (error) {
                    console.error('Error occurred enabling push ', error);
                });
        });
}

const subscribeToPushNotification = async () => {
    const registration = await navigator.serviceWorker.ready
    try {
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly : true,
            applicationServerKey : urlBase64ToUint8Array('BIuKDAREB0mrLDkTimbP9c8egWqIoUGf_CKX2BW3FHTxLLAAv3MtjQOQ5LT0TTfxPvfRVv3LmIO1-h33PoUMUMM')
        });
        await axios.post("http://localhost:5001/braquage-royale/us-central1/api/subscription",
            { sub : JSON.stringify(subscription) },
            { headers : { "content-type" : "application/json" }}
        );
    }
    catch(e){
        console.log("La souscription a été refusée");
    }
}

const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};

checkIfPushIsEnabled()

export const db = firebase

new Vue({
    router,
    vuetify,
    store,
    firebaseConfig,
    render: h => h(App)
}).$mount('#app')
