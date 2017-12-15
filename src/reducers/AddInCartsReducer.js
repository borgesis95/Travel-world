

export default(state=null,action) =>
{
  switch(action.type)
  {
    case 'ADD_IN_CART_SUCCESS':
      return{...state,
              advertiserKey:action.advertiserKey,
              activityKey:action.activityKey,
            }
   default:
          return state;
  }
}
