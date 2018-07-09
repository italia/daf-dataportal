import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App'
import configureStore from './configureStore'
import { Provider } from 'react-redux';


import './style/css/fontawesome-all.css'
import './style/css/simple-line-icons.css'
import './style/css/style.css'
import './style/css/custom.css'
import './style/css/autocomplete.css'
import './style/css/infinityscroll.css'
import './style/css/react-redux-toastr.min.css'

const publicVapidKey = 'BI28-LsMRvryKklb9uk84wCwzfyiCYtb8cTrIgkXtP3EYlnwq7jPzOyhda1OdyCd1jqvrJZU06xHSWSxV1eZ_0o';

function registerServiceWorker(){
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(registration => {
        console.log('SW registered: ', registration);
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
    });
  }
}

function askPermission() {
  return new Promise(function(resolve, reject) {
    const permissionResult = Notification.requestPermission(function(result) {
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  })
  .then(function(permissionResult) {
    if (permissionResult !== 'granted') {
      throw new Error('We weren\'t granted permission.');
    }else if (permissionResult==='granted'){
      subscribeUserToPush()
    }
  });
}

async function subscribeUserToPush() {
  const registration = await navigator.serviceWorker.register('sw.js',  {scope: '/'})
  
  const subscribeOptions = {
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  };

  const subscription = await registration.pushManager.subscribe(subscribeOptions);
  console.log('Received PushSubscription: ', JSON.stringify(subscription));
  await fetch('http://localhost:3000/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json'
    }
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const store = configureStore();

ReactDOM.render((
     <Provider store={store}>
        <App/>
     </Provider>
), document.getElementById('root'));


registerServiceWorker()
askPermission()