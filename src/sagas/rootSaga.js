import { all, put } from 'redux-saga/effects';
import firebase from 'firebase';
import 'firebase/auth';
import createGame from './createGame.js';
import joinGameSaga from './joinGame.js';
import setName from './setName.js';
import startGame from './startGame.js';
import addPath from './addPath.js';

export default function* rootSaga() {
    yield all([
        createGame(),
        joinGameSaga(),
        setName(),
        startGame(),
    ]);
}
