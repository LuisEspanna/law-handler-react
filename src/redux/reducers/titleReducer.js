import {types} from '../actions/';

const initState = []

function reducer( state = initState, action ) {
    
    switch ( action.type ) {
        case types.LOAD_TITLES:
            return action.payload
        
        case types.REMOVE_TITLE:
            return state.filter(title => title.id !== action.payload);

        case types.UPDATE_TITLE:
            let index = state.findIndex(t => (t.id === action.payload.id)); 

            return [...state.slice(0, index), Object.assign({},state[index],action.payload), ...state.slice(index+1)];
            
        case types.ADD_TITLE:
            return [...state, action.payload];

        default:
            return state;
    }
}

export default reducer;
