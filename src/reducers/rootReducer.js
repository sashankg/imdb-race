import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import loading from './loading.js';
import name from './name.js';
import path from './path.js';

export default function createRootReducer(history) {
    return combineReducers({
        router: connectRouter(history),
        loading,
        name,
        path,
    });
}
