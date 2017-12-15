

//State non è lo stato dell'applicazione ma lo stato che restituisce il reducer se non ci sono payload da ritornare, dunque lo state dell'app rimane invariato
export default (state = null, action ) => {
  console.log("SONO NEL REDUCER: " + action.type);
  switch(action.type){
    case 'CITY_SELECTED':
         return action.payload;
         break;

    default: return state;
  }


}
