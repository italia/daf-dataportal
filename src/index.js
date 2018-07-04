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



const store = configureStore();

ReactDOM.render((
     <Provider store={store}>
        <App/>
     </Provider>
), document.getElementById('root'));
