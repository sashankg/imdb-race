import firebase from 'firebase';
import 'firebase/database';
import { takeLatest, put,  select } from 'redux-saga/effects';

export default function* watchUpdateName() {
    yield takeLatest('UPDATE_NAME', setName);
}

function* setName({ name, gameId }) {
    const oldName = yield select(state => state.name);
    if(oldName && oldName !== name) {
        const scoresRef = firebase.database().ref('games')
            .child(gameId)
            .child('scores')
        const oldScoreSnapshot = yield scoresRef.child(oldName).once('value');
        const oldScore = oldScoreSnapshot.val();
        yield scoresRef.child(oldName).set(null);
        scoresRef.child(name).set(oldScore);
        scoresRef.child(name).onDisconnect().set(null);
    }

    yield put({ type: 'SET_NAME', name });
}
