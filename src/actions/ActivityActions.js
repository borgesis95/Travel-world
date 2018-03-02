import {ADD_IN_CART_SUCCESS} from './types.js';
import firebase from 'firebase';

export const  addInYourCart = (uid,typexp,name,date,activityKey,advertiserKey,navigateTo,number) =>
{
  const { currentUser } = firebase.auth();  // utente
  console.log("CurrentUser uid",currentUser.uid); // cosi mi vengono restituiti i dati
                                       // dell'utente


   return (dispatch) =>
   {
        if(updateNumberExperience(activityKey,dispatch,number,navigateTo,currentUser))
        {
          insertIntoCartDatabase(uid,typexp,name,date,activityKey,advertiserKey,dispatch,currentUser,navigateTo);
          navigateTo("homepage");
          refToData = firebase.database().ref('/cityexperience/'+activityKey);
          console.log("CHIAVE",activityKey);
          refToData.update({members:(number-1)});
        }
        else
        {
            alert(typexp);
            alert("Numero di partecipanti massimo raggiunto");
        }
   }
}

const insertIntoCartDatabase =(uid,typexp,name,date,activityKey,advertiserKey,dispatch,currentUser,navigateTo,number)=>
{
  isLoad = false;

  ref= firebase.database().ref(`/userCart/${uid}`)
   ref.child(activityKey).once('value', function(snapshot) {
     var exists = snapshot.val();
     console.log("ESISTE",exists);
     if((exists === null))
      {
        callbackDatabase(uid,typexp,name,date,advertiserKey,activityKey,dispatch,navigateTo,number,currentUser);
        auto_sendNotification(uid);


      }// end if

      else
      {
          alert("Hai già inserito questa attività nel carrello");
      }
   });

}// end function .

const updateNumberExperience = (activityKey,dispatch,number,navigateTo,currentUser) =>
{
  if(number>0)
  {

    return true;

  }
  else return false;

} // end function;

const callbackDatabase = (uid,typexp,name,date,advertiserKey,activityKey,dispatch,navigateTo,number,currentUser) =>
{


  firebase.database().ref(`/userCart/${uid}/${activityKey}`).set(
    {
      type:typexp,
      nameActivity:name,
      dateActivity:date,
      AdvertiserKey:advertiserKey,
      ActivityKey:activityKey,
    }
  ).then(()=>
   {
    dispatch
    ({
      type:ADD_IN_CART_SUCCESS,
      nameActivity:name,
      typeExp:typexp,
      dateActivity:date,
      AdvertiserKey:advertiserKey,
      ActivityKey:activityKey,
    })

    alert("Aggiunto nel carrello");

  }); // end then

}

const auto_sendNotification =(uid) =>{

  
  ref= firebase.database().ref(`/TokenUtentiPush/${uid}`)
  ref.once('value',function(snapshot) {
        snapshot.forEach(function(data){
          console.log("TOKEN",data.val().expoToken);
          return fetch('https://exp.host/--/api/v2/push/send', {
              body: JSON.stringify({
                to: data.val().expoToken,
                title: 'Aggiunto nel carrello',
                body: 'complimenti,Hai aggiunto una attività!',
                sound:"default",
              }),
              headers: {
                'Content-Type': 'application/json',
              },
              method: 'POST',
        });

        }) // forEach
  })

}
