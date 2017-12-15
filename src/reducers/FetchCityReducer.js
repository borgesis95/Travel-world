
const initialState={
    error:'',
    loading:true,
    city: null
}

export default (state = initialState, action ) => {
  console.log("SONO NEL REDUCER: " + action.type);

  switch (action.type)
  {
    case "CITY_FETCH_START":
    console.log("ENTRATO IN CITY_FETCH_START");
      return { ...state ,
              loading:true,
              error: '',
              } // allow to put togheter inital state with loading and error

    case "CITY_FETCH_SUCCESS":
     console.log("ENTRATO IN CITY_FETCH_SUCCESS");
     console.log(action.payload);
     return   {...state,
              loading:false ,
              city:action.payload ,
              error:''
              }

    case "CITY_FETCH_FAIL":
     console.log("ENTRATO IN CITY_FETCH_FAIL");
     return {...state ,
            loading:false ,
            city:'',
            error:action.payload
            }

    default: return state;
  }


  /*
  switch(action.type){
    case 'CITY_FETCH':
         return action.payload;
         break;

    default: return state;
  }
*/

}
