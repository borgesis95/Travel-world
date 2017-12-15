import {FORGET_PASSWORD_SUCCESS , FORGET_PASSWORD_FAIL } from '../actions/types';

const initialState=
{
    email:'',
    error:''
}

export default(state=initialState,action) =>
{
    switch(action.type)
    {
        case FORGET_PASSWORD_SUCCESS:
        console.log("entrato in forget password succes");
        return { ...state,
                email:action.payload,
                error:'STATUS OK',
               }

        case FORGET_PASSWORD_FAIL:
        console.log("fail password");
        return{...state,
                email:'',
                error:action.error,
              }
        default :return state;
    }
}


