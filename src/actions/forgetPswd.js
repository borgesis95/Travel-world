import {FORGET_PASSWORD_SUCCESS, FORGET_PASSWORD_FAIL} from './types';
import firebase from 'firebase';


export const forgetPassword = ({email,navigateTo}) =>
{
    return(dispatch) =>
    {
        firebase.auth().sendPasswordResetEmail(email)
             .then(function() 
             {
                console.log(email);
                navigateTo('login');
                return  dispatch({type:FORGET_PASSWORD_SUCCESS,payload:email})
             })
            .catch(function(error)
             {
               console.log("errore numero",error.code);
                 alert(error.code);  
                return dispatch({type:FORGET_PASSWORD_FAIL,payload:error.code})
             });
    }
}