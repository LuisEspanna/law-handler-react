import {types} from '../index';
import {postData} from '../../../utils';
import {setAlert} from '../ui/ui';

import {URL_BASE} from '../../../urls';

export const startLogin = (user) => {
    return async ( dispatch ) => {
        postData(`${URL_BASE}/api/login`, user)
            .then(data => {
            if(data.status === 'ok'){
                dispatch(setUser(data.data));
            }else{
                alert(data.status);
            }           
        });
    }
}
 
export const startUploadProfession = (profession) => {
    return async ( dispatch ) => {
        postData(`${URL_BASE}/api/visitors`, {profession, date:new Date().getTime()})
        .then(data => {
            //console.log(data);
            dispatch(setAlert(true,"Guardado con éxito"));
        });
    }
}

export const setUser = (user) => ({
    type: types.SET_USER,
    payload: user
})

export const setProfession = (profession) => ({
    type: types.SET_PROFESSION,
    payload: profession
})



 