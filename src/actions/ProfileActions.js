


//profileUpdateActions
export const profileUpdateStart = () => {

    return{
             type: "PROFILE_UPDATE_START" ,
    }

}


export const profileUpdateSuccess = () => {

    return{
             type: "PROFILE_UPDATE_SUCCESS" ,

    }

}


export const profileUpdateFailed = (error)=>{

  var errorMessage = error.message;
  console.log(errorMessage);
  alert(error);

     return{

              type: "PROFILE_UPDATE_FAIL",
              payload:error.message

      }

}


//  userFetchActions
export const userFetchStart = () => {

    return{
             type: "USER_FETCH_START" ,
    }

}


export const userFetchSuccess = (profile) => {

    return{
             type: "USER_FETCH_SUCCESS" ,
             payload: profile
    }

}


export const userFetchFailed = (error)=>{

  var errorMessage = error.message;
  console.log(errorMessage);
  alert(error);

     return{

              type: "USER_FETCH_FAIL",
              payload:error.message

      }

}
