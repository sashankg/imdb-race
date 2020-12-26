import { useState, useEffect } from 'react';
import { useFirebaseRef, tmdbImgUri } from '../util.js';
import tmdb from 'themoviedb-javascript-library';


export default function ActorPicker({ firebaseRef, title }) {
    const [actor, loading] = useFirebaseRef(firebaseRef, null);

    const [query, setQuery] = useState("")
    const [results, setResults] = useState(null);

    function selectActor(id) {
        setResults(null);
        firebaseRef.set(id)
    }

    return <div className="actor-picker">
        <h3>{ title }</h3>
        { results ?  
                <Results 
                    results={ results } 
                    selectActor={ selectActor }
                /> :
            actor ?
                <ActorPreview id={ actor }/> :
                "No actor selected yet"
        }
        <div className="search">
            <input 
                className="search-input" 
                type="text" value={ query } 
                onChange={ e => setQuery(e.target.value) }
                size="1"
            />
            <button onClick={ () => {
                tmdb.search.getPerson({ query }, data => {
                    const parsed = JSON.parse(data);
                    setResults(parsed.results);
                    setQuery("");
                }, error => {
                    setResults(null);
                })
            }}>
                Search
            </button>
        </div>
    </div>
}

function ActorPreview({ id }) {
    const [actor, setActor] = useState(null);
    useEffect(() => {
        tmdb.people.getById({ id }, data => {
            console.log(data)
            setActor(JSON.parse(data))
        }, error => {
        })
    }, [id])
    if(actor) {
        return <div className="actor-preview">
            <img className="person-image" height="200" src={ tmdbImgUri(actor.profile_path)} alt="" />
            <span>{ actor.name }</span>
        </div>
    }
    else {
        return "Loading..."
    }
}

function Results({ results, selectActor }) {
    return <div className="search-results">
        { results.map(result => {
            return <span className="search-results-item" onClick={ () => selectActor(result.id) } key={ result.id }>{ result.name }</span>
        }) }
    </div>
}
