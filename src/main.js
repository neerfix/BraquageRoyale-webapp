import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './registerServiceWorker'
import '/service-worker'
import firebase from 'firebase/app'
import '@firebase/messaging'
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

const messaging = firebase.messaging();

messaging.onMessage((payload) => {
    console.log('Message received. ', payload)
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js', {
        scope: '/'
    }).then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
        console.log('ServiceWorker registration failed: ', err);
    });
}

/*if ('Notification' in window) {
    if (Notification.permission === "default") {
        Notification.requestPermission().then((res) => {
            console.log(res)
        })
    }
}*/

function checkIfPushIsEnabled() {
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

function subscribeToPushNotification() {
    navigator.serviceWorker.ready
        .then(function(registration) {
            if (!registration.pushManager) {
                alert('This browser does not support push notification.');
                return false;
            }
            registration.pushManager.subscribe(
                {
                    userVisibleOnly: true,
                    applicationServerKey: 'BKILSlpjnfSxlL4vhUD8kKco_koWmvo-ZF4dvm39lhghcy-GKVYp5v8sQjj7gdseVC0QDXdB9vchUj2_JvLOmco'
                }
            )
                .then(function (subscription) {
                    console.log('Push notification subscribed.');
                    console.log(subscription);
                    sendSubscriptionIDToServer(subscription);
                })
                .catch(function (error) {
                    console.error('Push notification subscription error: ', error);
                });
        })
}

/*function unsubscribeFromPushNotification() {
    navigator.serviceWorker.ready
        .then(function(registration) {
            registration.pushManager.getSubscription()
                .then(function (subscription) {
                    if(!subscription) {
                        alert('Unable to unsubscribe from push ' + 'notification.');
                        return;
                    }
                    subscription.unsubscribe()
                        .then(function () {
                            console.log('Push notification unsubscribed.');
                            console.log(subscription);
                        })
                        .catch(function (error) {
                            console.error(error);
                        });
                })
                .catch(function (error) {
                    console.error('Failed to unsubscribe push ' +'notification.');
                });
        })
}*/

function sendSubscriptionIDToServer(subscription) {
    const subscriptionId = subscription.endpoint.split('fcm/send/')[1];
    console.log("Subscription ID", subscriptionId);
    fetch('http://localhost:4000/subscribers', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ subscriptionId: subscriptionId })
    }).then(response => {
        console.log(response)
    });
 }

checkIfPushIsEnabled()

export const db = firebase

new Vue({
    router,
    vuetify,
    store,
    firebaseConfig,
    render: h => h(App)
}).$mount('#app')
