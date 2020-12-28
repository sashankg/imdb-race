import { takeEvery } from 'redux-saga/effects';
import firebase from 'firebase/app';
import 'firebase/database';

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
