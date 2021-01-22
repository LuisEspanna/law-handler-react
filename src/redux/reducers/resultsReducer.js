import {types} from '../actions/';

const initState = {
    results:[],
    current_result:undefined
};

function reducer( state = initState, action ) {
    
    
    switch ( action.type ) {
        case types.LOAD_RESULTS:
            return {
                ...state,
                results: (action.payload)?[...action.payload]:[]
            };
            
        case types.ADD_RESULT:
            return {
                ...state,
                results: [...state.results, ...action.payload.results]
            };
        
        case types.SET_CURRENT_RESULT:
        return {
            ...state,
            current_result: {
                ...action.payload
            }
        };

        default:
            return state;
    }
}

export default reducer;