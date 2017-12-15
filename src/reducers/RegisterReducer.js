

import {REGISTER_USER_START ,REGISTER_USER_FAIL ,REGISTER_USER_SUCCESS} from '../actions/types';

const InitialState
={
    user:null,
    error:'',
    loading:true
 }

 export default (state=InitialState,action) =>

 {
     switch(action.type)
     {
         case REGISTER_USER_START:
            return{...state,loading:false, error:''};

         case REGISTER_USER_SUCCESS:
          console.log("REGISTER_USER_SUCCESS REDUCER");
            return{...state,loading:true,user:action.payload};

         case REGISTER_USER_FAIL:
            console.log("REGISTER_USER_FAIL REDUCER");
            return {...state,loading:true,error:action.payload};

        default: return state;
     }


 }
