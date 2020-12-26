import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import tmdb from 'themoviedb-javascript-library';
import { tmdbImgUri, tmdbPromise, usePromise } from '../util.js';

function Person({ id }) {
    const dispatch = useDispatch()
    const [person, loading] = usePromise(() => {
        return Promise.all([
            tmdbPromise(tmdb.people.getById, { id }),
            tmdbPromise(tmdb.people.getMovieCredits, { id }),
        ]).then(([details, credits]) => {
            return {
                ...details,
                cast: credits.cast.sort((a, b) => a.release_date < b.release_date ? 1 : -1)
            }
        })
    })

    if(loading) {
        return "loading person...";
    }
    return <div className="person page">
        <h2>{ person.name }</h2>
        <img
            className="person-image"
            width="200"
            src={ tmdbImgUri(person.profile_path) } 
            alt="" 
        />
        <div className="credits">
            { person.cast.map((credit, i) => {
                return <div 
                    className="credit"
                    key={ credit.credit_id  }
                    onClick={ () => {
                        dispatch({ type: 'ADD_PATH', path: { kind: 'movie', id: credit.id }})
                    }}
                >
                    <img 
                        height="75" 
                        width="50" 
                        src={ tmdbImgUri(credit.poster_path) } alt="" />
                    <div className="credit-details">
                        <b> { credit.title } </b>
                        <span> { credit.release_date } </span>
                    </div>
                </div>
            })}
        </div>
    </div>
}

function Movie({ id }) {
    const dispatch = useDispatch()
    const [movie, loading] = usePromise(() => Promise.all([
        tmdbPromise(tmdb.movies.getById, { id }),
        tmdbPromise(tmdb.movies.getCredits, { id }),
    ]).then(([details, credits]) => {
        return {
            ...details,
            ...credits,
        }
    }))

    if(loading) {
        return "loading movie..."
    }
    return <div className="person page">
        <h2>{ movie.title }</h2>
        <img
            className="person-image"
            width="200"
            src={ tmdbImgUri(movie.poster_path) } alt="" 
        />
        <div className="credits">
            { movie.cast.map(credit => {
                return <div
                    className="credit"
                    key={ credit.credit_id }
                    onClick={ () => {
                        dispatch({ type: 'ADD_PATH', path: {
                            kind: 'person',
                            id: credit.id,
                        }})
                    }}
                >
                    <img width="50" height="75" src={ tmdbImgUri(credit.profile_path) } alt="" />
                    <span>{ credit.name }</span>
                </div>
            }) }
        </div>
    </div>

}

export default function Play() {
    const dispatch = useDispatch();
    const path = useSelector(state => state.path);
    if(path.length === 0) {
        return "loading..."
    }
    const current = path[path.length - 1]
    if(current.kind === 'person') {
        return <Person id={ current.id } />
    }
    else if(current.kind === 'movie') {
        return <Movie id={ current.id } />
    }
    return "idk what this thing is";
}
