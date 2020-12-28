import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

import firebase from 'firebase/app';
import 'firebase/analytics';

import { createBrowserHistory } from 'history'

import tmdb from 'themoviedb-javascript-library';

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { ConnectedRouter, routerMiddleware } from 'connected-react-router';

import createRootReducer from './reducers/rootReducer.js'
import rootSaga from './sagas/rootSaga.js';

import { Provider } from 'react-redux'; 

var firebaseConfig = {
    apiKey: "AIzaSyDYh3s186-9ch6BXsLz4eEEVu1HywMMQc0",
    authDomain: "imdb-60097.firebaseapp.com",
    databaseURL: "https://imdb-60097-default-rtdb.firebaseio.com",
    projectId: "imdb-60097",
    storageBucket: "imdb-60097.appspot.com",
    messagingSenderId: "669782877452",
    appId: "1:669782877452:web:cf21c616a384898a389529",
    measurementId: "G-WFHP0HEF6Y"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

tmdb.common.api_key = '80e27a5eb5a48874fc103066ef663e97';

const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    createRootReducer(history),
    applyMiddleware(
        sagaMiddleware, 
        routerMiddleware(history)
    ),
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={ store }>
            <ConnectedRouter history={ history }>
                <App />
            </ConnectedRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
