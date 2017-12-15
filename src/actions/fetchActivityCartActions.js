
import {FETCH_ACTIVITY_SUCCESS} from './types.js';
import firebase from 'firebase';


export const fetchActivityCart = () =>
{

  const {currentUser} = firebase.auth();

  return (dispatch) =>
  {
    loadActivityFromFirebase(currentUser,dispatch);
  }

} // end function .


const loadActivityFromFirebase  = (currentUser,dispatch) =>
{
  user  = firebase.database().ref(`/userCart/${currentUser.uid}`);
    user.once('value').then(function(data)
    {
    //  console.log("ID UTENTE",currentUser.uid);
        //console.log("OGGETTO",data.val());
      //  obj = data.val();
        var items = [];
        var i=  0;
        data.forEach((child,i) =>
         {
           items.push(child.val());
         });
      dispatch(
        {
          type:FETCH_ACTIVITY_SUCCESS,
          activity:items,
        }
      )// end dispatch
      // console.log("ITEM",item.val());
    }); // end callback
} // end this function
