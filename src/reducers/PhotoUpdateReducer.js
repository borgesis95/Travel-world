//DA CANCELLARE


const initialState={
    error:'',
    loading:true,
    photo: null
}

export default (state = initialState, action ) => {
  console.log("SONO NEL REDUCER: " + action.type);

  switch (action.type)
  {
    case "PHOTO_UPDATE_START":
    console.log("ENTRATO IN PHOTO_UPDATE_START");
      return { ...state ,
              loading:true,
              error: '',
              } // allow to put togheter inital state with loading and error

    case "PHOTO_UPDATE_SUCCESS":
     console.log("ENTRATO IN PHOTO_UPDATE_SUCCESS");

     return   {...state,
              loading:false ,
              photo:action.payload,
              error:''
              }

    case "PHOTO_UPDATE_FAIL":
     console.log("ENTRATO IN PHOTO_UPDATE_FAIL");
     return {...state ,
            loading:false ,
            error:action.payload
            }

    default: return state;
  }
}
