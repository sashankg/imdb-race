export default function game(state, action) {
    switch (action.type) {
        case 'SET_GAME':
            return action.game;
        case 'LEAVE_GAME':
            return null;
        default:
            return state || null
    }
}
