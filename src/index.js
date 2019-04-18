import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App'
import configureStore from './configureStore'
import { Provider } from 'react-redux';

require('./style/css/simple-line-icons.css')
require('./style/css/style.css')
require('./style/css/custom.css')
require('./style/css/autocomplete.css')
require('./style/css/infinityscroll.css')
require('./style/css/react-redux-toastr.min.css')
require('./style/fontawesome/css/all.css')
// require('@fortawesome/fontawesome-free/css/all.css')
// require('@fortawesome/fontawesome-free/js/all.js')
require('flag-icon-css/css/flag-icon.min.css')
require('react-grid-layout/css/styles.css')
require('react-resizable/css/styles.css')

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

const store = configureStore();

ReactDOM.render((
     <Provider store={store}>
        <App/>
     </Provider>
), document.getElementById('root'));


registerServiceWorker()