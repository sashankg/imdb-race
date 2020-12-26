import { takeEvery, select } from 'redux-saga/effects';
import firebase from 'firebase';
import 'firebase/auth';

export default function* watchLeaveGame() {
    yield takeEvery('LEAVE_GAME', leaveGame);
}

export function* leaveGame() {
    console.log('hello');
    yield firebase.auth().currentUser.delete();
}
