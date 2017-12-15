const initialState={
    error:'',
    loading:true,
    profile: null
}

export default (state = initialState, action ) => {
  console.log("SONO NEL REDUCER: " + action.type);

  switch (action.type)
  {
    case "USER_FETCH_START":
    console.log("ENTRATO IN USER_FETCH_START");
      return { ...state ,
              loading:true,
              error: '',
              } // allow to put togheter inital state with loading and error

    case "USER_FETCH_SUCCESS":
     console.log("ENTRATO IN USER_FETCH_SUCCESS");
     console.log(action.payload);
     return   {...state,
              loading:false ,
              profile:action.payload ,
              error:''
              }

    case "USER_FETCH_FAIL":
     console.log("ENTRATO IN USER_FETCH_FAIL");
     return {...state ,
            loading:false ,
            profile:'',
            error:action.payload
            }

    default: return state;
  }
}
