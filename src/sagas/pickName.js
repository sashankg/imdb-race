import { put } from 'redux-saga/effects';
import tmdb from 'themoviedb-javascript-library';
import { tmdbPromise } from '../util.js';

export default function* pickName() {
    const actors = yield tmdbPromise(tmdb.people.getPopular, {});
    const i = Math.floor(Math.random() * actors.results.length);
    console.log(actors.results.length, i);
    const name = actors.results[i].name.replace(/[.$#\[\]]/g, '');

    yield put({ type: 'SET_NAME', name });

    return name;
}
