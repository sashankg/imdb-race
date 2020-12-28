import { takeEvery, select } from 'redux-saga/effects';
import firebase from 'firebase/app';
import 'firebase/auth';

export default function* watchLeaveGame() {
    yield takeEvery('LEAVE_GAME', leaveGame);
}

export function* leaveGame() {
    yield firebase.auth().currentUser.delete();
}
