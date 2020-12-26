import { takeEvery, put } from 'redux-saga/effects';
import firebase from 'firebase';
import 'firebase/database';
import { push } from 'connected-react-router';
import pickName from './pickName.js';

export default function* watchCreateGame() {
    yield takeEvery('CREATE_GAME', createGame);
}

function* createGame({ history }) {

    const game = firebase.database().ref('games').push()

    yield game.set({
        status: 'LOBBY',
        start: 56323,
        end: 56322,
    });

    yield history.push('/game/' + game.key);
}
