

const initialState={
    activityObject:"ancora vuoto",
    isLoading:false,
}

export default(state=initialState,action) =>
{
  switch(action.type)
  {
    case "FETCH_ACTIVITY_SUCCESS":
      return {...state,
              activityObject : action.activity,
              isLoading:true,
      }
    default:
     return state;
  }
} // end function ,
