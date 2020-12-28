import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/database';
import { useFirebaseRef } from '../util.js';
import Confetti from 'react-confetti';

import ActorPicker from '../components/ActorPicker.js';

function Scoreboard({ gameRef }) {
    const [scores, loading] = useFirebaseRef(gameRef.child('scores'));
    if(loading || !scores) {
        return "loading scoreboard...";
    }

    return <table
        className="scoreboard"
        cellSpacing="0"
    >
        <thead>
            <tr>
                <th>Player</th>
                <th>Wins</th>
        </tr>
    </thead>
    <tbody>
        { Object.keys(scores).map((name, i) => {
            return <tr 
                className={ i % 2 === 0 ? "shaded" : null }
                key={ name }
            >
                <td>{ name }</td>
                <td>{ scores[name] }</td>
                </tr>
        }) }
        </tbody>
    </table>
}

export default function Lobby() {
    const { gameId } = useParams();
    const gameRef = firebase.database()
        .ref('games')
        .child(gameId)

    const name = useSelector(state => state.name);
    const [newName, setNewName] = useState("");

    const [winner] = useFirebaseRef(gameRef.child('winner'));

    const dispatch = useDispatch();

    const qrCode = `https://api.qrserver.com/v1/create-qr-code/?data=${ gameId }&amp;size=100x100`
    return <div className="lobby page">
        { winner === name ?  <Confetti number={ 50 }/> : null }
        <h2>LOBBY</h2>
        <h3>{ winner ? `${ winner } won` : null }</h3>
        <div className="name">
            <span>Your Name: </span>
            <input
                type="text" 
                placeholder={ name }
                value={ newName }
                onChange={ e => setNewName(e.target.value) }
            />
            { newName.length > 0 ? 
                    <button
                        onClick={ () => { 
                            dispatch({
                                type: 'UPDATE_NAME', 
                                name: newName,
                                gameId,
                            })
                            setNewName("");
                        } }
                    >
                        Change Name
                    </button> : null
            }
        </div>
        <Scoreboard gameRef={ gameRef }/>
        <div className="start-end">
            <ActorPicker firebaseRef={ gameRef.child('start') } title="Start" />
            <ActorPicker firebaseRef={ gameRef.child('end') }  title="End" />
        </div>
        <button 
            className="start-button"
            onClick={ () => dispatch({ type: 'START_GAME', gameId }) }>
            Start Game
        </button>
    </div>
}
