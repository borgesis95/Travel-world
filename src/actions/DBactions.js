import * as firebaseApp from 'firebase';



export const cityFetchStart = () => {

    return{
             type: "CITY_FETCH_START" ,
    }

}


export const cityFetchSuccess = (city) => {

    return{
             type: "CITY_FETCH_SUCCESS" ,
             payload: city
    }

}


export const cityFetchFailed = (error)=>{

  var errorMessage = error.message;
  console.log(errorMessage);
  alert(error);

     return{

              type: "CITY_FETCH_FAIL",
              payload:error.message

      }

}




export const experienceFetchStart = () => {
console.log("EXPERIENCE_FETCH_START");
    return{
             type: "EXPERIENCE_FETCH_START" ,
    }

}


export const experienceFetchSuccess = (experience) => {
console.log("EXPERIENCE_FETCH_SUCCESS");
    return{
             type: "EXPERIENCE_FETCH_SUCCESS" ,
             payload: experience
    }

}


export const experienceFetchFailed = (error)=>{

  var errorMessage = error.message;
  console.log(errorMessage);
  alert(error);

     return{

              type: "EXPERIENCE_FETCH_FAIL",
              payload:error.message

      }

}




/*
export const experienceFetch = (experience) => {

  console.log("carichiamo le EXPERIENCE da firebase");


  return{
     type: 'EXPERIENCE_FETCH',
     payload: experience


  }

};

*/
