import { 
    takeLatest, 
    select, 
    all, 
    take, 
    put,
    cancel,
    takeEvery,
} from 'redux-saga/effects';
import pickName from './pickName.js';
import firebase from 'firebase/app';
import 'firebase/database';
import { onFirebaseChange } from '../util.js';

export default function* watchJoinGame() {
    yield takeLatest('JOIN_GAME', joinGame)
}

function* joinGame({ gameId }) {
    const gameRef = firebase.database().ref('games').child(gameId)
    const statusSnapshot = yield gameRef.child('status').once('value');
    var name = yield select(state => state.name)
    if(statusSnapshot.val() === 'IN_GAME') {
        yield onFirebaseChange(gameRef.child('status'))
    }

    if(!name) {
        name = yield pickName();
    }

    const gameSnapshot = yield gameRef.once('value')
    if(gameSnapshot.val()) {
        const scoreRef = gameRef
            .child('scores')
            .child(name);
        scoreRef.onDisconnect().set(null);
        yield scoreRef.set(0);

        while(true) {
            const status = yield onFirebaseChange(gameRef.child('status'))
            if(status === 'IN_GAME') {
                const start = yield gameRef.child('start').once('value');
                const end = yield gameRef.child('end').once('value');
                console.log(start.val(), end.val());
                yield put({ type: 'START_PATH', start: { kind: 'person', id: start.val() } });
                while(true) {
                    const { path } = yield take('ADD_PATH');
                    console.log(path);
                    if(path.kind === 'person' && path.id === end.val()) {
                        yield gameRef.child('status').set('LOBBY');
                        yield gameRef.child('winner').set(name);
                        yield scoreRef.set(firebase.database.ServerValue.increment(1));
                        break;
                    }
                }
            }
        }
    }
}
