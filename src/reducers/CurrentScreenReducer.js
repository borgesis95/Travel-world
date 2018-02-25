
const InitialState={
    Screen:'',
    loading:false
 }

 export default (state=InitialState,action) =>
 {

     switch(action.type)
     {
         case "CURRENT_SCREEN_START":
            return{...state,loading:true};

         case "CURRENT_SCREEN_SUCCESS":
          console.log("CURRENT_SCREEN_SUCCESS REDUCER " + action.payload);
            return{...state,loading:false, Screen: action.payload};


        default: return state;
     }


 }
