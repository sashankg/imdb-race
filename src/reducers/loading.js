export default function loading(state, action) {
    switch(action.type) {
        case 'START_LOADING':
            return { 
                ...state, 
                [action.task]: true,
            };
        case 'STOP_LOADING':
            return {
                ...state,
                [action.task]: false,
            };
        default:
            return state || { };
    }
}
