import { useState, useEffect } from 'react';
import tmdb from 'themoviedb-javascript-library';

export function tmdbPromise(fn, ...args) {
    return new Promise((fulfill, reject) => {
        fn(...args, (data) => {
            fulfill(JSON.parse(data));
        }, reject);
    })
}

export function gameKeySelector(state) {
    console.log(state.router);
    return state.router.location.pathname.substring(6);
}

export function onFirebaseChange(ref) {
    console.log('ref');
    return new Promise((fulfill, reject) => {
        let initial = null
        function onValueChange(snapshot) {
            const val = snapshot.val();
            console.log(initial, val);
            if(initial && initial !== val) {
                fulfill(val)
                ref.off('value', onValueChange);
            }
            else {
                initial = val;
            }
        }
        ref.on('value', onValueChange);
    })
}

export function useFirebaseRef(ref, defaultValue) {
    const [loading, setLoading] = useState(true);
    const [val, setVal] = useState(defaultValue);
    useEffect(() => {
        function onValueChange(snapshot) {
            setVal(snapshot.val());
            setLoading(false);
        }
        ref.on('value', onValueChange);
        return () => {
            ref.off('value', onValueChange);
        }
    }, [ref, setVal]);

    return [val, loading];
}

export function tmdbImgUri(path) {
    if(path) {
        return `${ tmdb.common.images_uri }w500${ path }`;
    }
    return ""
}

export function usePromise(promiseFn, defaultValue) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(defaultValue);
    useEffect(() => {
        promiseFn().then(result => {
            setData(result)
            setLoading(false)
        })
    }, [setData])

    return [data, loading]
}
