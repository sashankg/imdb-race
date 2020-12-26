export default function* watchAddPath() {
    yield takeEvery('ADD_PATH', addPath)
}

