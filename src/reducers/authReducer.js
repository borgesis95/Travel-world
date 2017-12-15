import {LOGIN_USER_START,LOGIN_USER_SUCCESS,LOGIN_USER_FAIL,LOGOUT_USER_START,LOGOUT_USER_SUCCESS,LOGOUT_USER_FAIL,}  from '../actions/types';

const initialState={
    user:null,
    error:'',
    loading:true
}

export default (state=initialState,action) => {

  switch (action.type)
  {
    case LOGIN_USER_START:
      return { ...state ,
              loading:false,
              error: '',
              }

    case LOGIN_USER_SUCCESS:
     return   {...state,
              loading:true ,
              user:action.email ,
              uid:action.uid,
              isLogged:true,
              error:''
              }

    case LOGIN_USER_FAIL:
     return {...state ,
            loading:true ,
            email:'',
            error:action.payload
            }

    case LOGOUT_USER_START:
         console.log("ENTRATO IN LOGOUT_USER_START");
         return { ...state , loading:true,   error: ''} // allow to put togheter inital state with loading and error

    case LOGOUT_USER_SUCCESS:
        console.log("ENTRATO IN LOGOUT_USER_SUCCESS");
        console.log(action.payload);
        return   {...state, loading: false , user: null , error:'' }

    case LOGOUT_USER_FAIL:
        console.log("ENTRATO IN LOGOUT_USER_FAIL");
        return {...state , loading:false , email:'', error:action.payload }

    default:
      return state;

  }


}
