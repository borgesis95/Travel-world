
const initialState={
    error:'',
    loading:true,
    experience: null
}

export default (state = initialState, action ) => {
  console.log("SONO NEL REDUCER: " + action.type);

  switch (action.type)
  {
    case "EXPERIENCE_FETCH_START":
    console.log("ENTRATO IN CITY_FETCH_START");
      return { ...state ,
              loading:true,
              error: '',
              } // allow to put togheter inital state with loading and error

    case "EXPERIENCE_FETCH_SUCCESS":
     console.log("ENTRATO IN CITY_FETCH_SUCCESS");
     console.log(action.payload);
     return   {...state,
              loading:false ,
              experience:action.payload ,
              error:''
              }

    case "EXPERIENCE_FETCH_FAIL":
     console.log("ENTRATO IN CITY_FETCH_FAIL");
     return {...state ,
            loading:false ,
            experience:'',
            error:action.payload
            }

    default: return state;
  }

}


/*

export default (state = null, action ) => {
  console.log("SONO NEL REDUCER: " + action.type);
  switch(action.type){
    case 'EXPERIENCE_FETCH':
         return action.payload;
         break;

    default: return state;
  }


}
*/
