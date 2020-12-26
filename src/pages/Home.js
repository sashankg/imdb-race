import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function Home() {
    const [loading, setLoading] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory();

    if(loading) {
        return "Loading new game...";
    }

    return <div className="home page">
        <h1>IMDb RACE</h1>
        <button
            onClick={ () => { 
                dispatch({ type: 'CREATE_GAME', history });
                setLoading(true);
            }}
        >
            Create a Game
        </button>
    </div>
}
