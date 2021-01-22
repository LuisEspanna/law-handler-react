import {types} from '../index';

export const setMainLoading = ( status ) => ({
    type: types.SET_MAIN_LOADING,
    payload: status
})

export const setChanges = ( status ) => ({
    type: types.SET_CHANGES,
    payload: status
})

export const setAlert = ( show, message ) => ({
    type: types.SET_ALERT,
    payload: {
        show, 
        message
    }
})
 