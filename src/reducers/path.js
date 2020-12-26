export default function path(state, action) {
    switch(action.type) {
        case 'ADD_PATH':
            return state.concat([action.path]);
        case 'START_PATH':
            return [action.start]
        default:
            return state || []
    }
}
