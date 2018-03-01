import {LOGOUT_USER_START,LOGOUT_USER_SUCCESS,LOGOUT_USER_FAIL} from './types';
import {Toast} from 'native-base';
import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';

export const logoutUserStart = () =>
{
    return { type: "LOGOUT_USER_START" }
}



export const logoutUserSuccess = () => {

    return { type: "LOGOUT_USER_SUCCESS" }

}


export const logoutUserFailed = (error)=>{

    var errorMessage = error.message;
    console.log(errorMessage);
    alert(error);

    return {

              type: "LOGOUT_USER_FAIL",
              payload:error.message

    }

}
