import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import firebase from 'firebase';
import 'firebase/database';
import Lobby from './Lobby.js';
import Play from './Play.js';
import { useFirebaseRef } from '../util.js';


export default function Game() {
    const { gameId } = useParams();
    const statusRef = firebase.database()
        .ref('games')
        .child(gameId)
        .child('status')
    const [gameStatus] = useFirebaseRef(statusRef, 'LOADING')

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'JOIN_GAME', gameId });
    }, [gameId]);

    const name = useSelector(state => state.name);

    switch(gameStatus) {
        case 'LOADING':
            return "Loading..."
        case 'LOBBY':
            return <Lobby />
        case 'IN_GAME':
            if(name) {
                return <Play />
            }
            else {
                return "Waiting for current game to end";
            }
        default:
            return "No Game here"
    }
}
