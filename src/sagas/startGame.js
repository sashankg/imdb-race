import { takeEvery, put, select, take } from 'redux-saga/effects';
import firebase from 'firebase';
import 'firebase/database';
import { gameKeySelector } from '../util.js'

export default function* watchStartGame() {
    yield takeEvery('START_GAME', startGame);
}

function* startGame({ gameId }) {
    const gameRef = firebase.database()
        .ref('games')
        .child(gameId)

    yield gameRef.child('start_time').set(Date.now())
    yield gameRef.child('status').set('IN_GAME')
}
