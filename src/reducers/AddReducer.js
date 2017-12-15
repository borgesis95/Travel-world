
import {ADD_EXPERIENCE_SUCCESS} from '../actions/types';

const initialState={
    name:"",
    error:"",

}


export default (state=initialState,action) =>
{
    console.log("Reducer aggiungi");
     switch(action.type)
     {
         case ADD_EXPERIENCE_SUCCESS:
         console.log("ENTRATO!!!!");
           return {
                    type:action.type,
                    name: action.name,
                    date:action.date,
                    typexp:action.typexp,
                    members:action.members,
                    address:action.address,
                    number:action.number,
                    city:action.city,
                    cap:action.cap,

                    error:"",

                  }

        default: return initialState;
     }

}
