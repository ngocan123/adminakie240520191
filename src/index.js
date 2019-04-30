import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axioApi from './config/axioConfig';
import App from './App';
import * as serviceWorker from './serviceWorker';
let token = localStorage.getItem('token');    
if(token){
	axioApi.defaults.headers.common['x-access-token'] = localStorage.getItem('token');       
	axioApi.get('/api/auth/checkToken').then((res) => { 
        localStorage.setItem('user_id', res.data._id);
	}).catch((err) => {
        localStorage.removeItem('token');
    });   
}
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
