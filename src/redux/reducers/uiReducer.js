import {types} from '../actions/';

const initState = {
    main_loading: false,
    changes : false,
    alert:{
        show:false,
        message:"Alerta ejemplo"
    }
}

function reducer( state = initState, action ) {
    
    switch ( action.type ) {
        case types.SET_MAIN_LOADING:
            return {
                ...state,
                main_loading: action.payload
            }
        case types.SET_CHANGES:
            return {
                ...state,
                 changes: action.payload
            }
        case types.SET_ALERT:
            return {
                ...state,
                 alert: action.payload
            }
        default:
            return state;
    }
}

export default reducer;
