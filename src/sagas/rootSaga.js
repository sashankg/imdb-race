import { all } from 'redux-saga/effects';
import createGame from './createGame.js';
import joinGameSaga from './joinGame.js';
import setName from './setName.js';
import startGame from './startGame.js';

export default function* rootSaga() {
    yield all([
        createGame(),
        joinGameSaga(),
        setName(),
        startGame(),
    ]);
}
