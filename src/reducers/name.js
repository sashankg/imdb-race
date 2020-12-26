export default function name(state, action) {
    switch (action.type) {
        case 'SET_NAME':
            return action.name;
        default:
            return state || null
    }
}
