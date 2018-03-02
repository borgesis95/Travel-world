
import {ADD_EXPERIENCE,ADD_EXPERIENCE_SUCCESS} from './types.js';
import firebase from 'firebase';

export const AddActions =  (uid,names,date,type,members,address,number,city,cap,navigateTo,experienceDescription) => // attenction to name of variables
{

    // DA AGGIUNGERE UID

   //  const { currentUser } = firebase.auth();  // utente
  //  console.log("CurrentUser uid",currentUser.uid);

    return (dispatch)=>
    {
      control = checkBeforeUpdateFirebase(names,date,type,members,address,number,city,cap);
        if(control)
        {
          sendDateIntoFirebase(uid,names,date,type,members,address,number,city,cap,dispatch,navigateTo,experienceDescription);
        }

        else
        {

        }

    }

   };

   const checkBeforeUpdateFirebase= (names,date,type,members,address,number,city,cap) =>
   {
     let check = true;

     if(date=="")
     {
       alert("Controllare la data");
       check=false;
     }

     if(names=="")
     {

       alert("Controllare il nome");
       check=false;
     }

     if(type=="")
     {
       alert("Controllare il tipo");
       check=false;
     }

     if(members=="")
     {
       alert("inserire numero partecipanti");
       check=false;
     }
     if(city=="")
     {
       alert("Controlla la città (disponibili solo milano,roma,catania)");
       check=false;
     }
     if(cap=="")
     {
       alert("Controlla il cap");
       check=false;
     }
     if(number=="")
     {
       alert("controllare numero civico");
       check=false;
     }


     if(check==true)
      {
        //alert("Ottimo , tutti dati corretti!");
        return true;
      }
      return false;
   }
   // Pass parameters with the first letter in Lowercase because not have problem
   //with dispatch's function.
   const sendDateIntoFirebase =(uid,names,Dates,Types,Members,Address,Numbers,City,Cap,dispatch,navigateTo,experienceDescription) =>
   {
 /*
     var dateConvert= Dates;
     var temp=dateConvert.split("-");
     Dates = temp[1] + "/" + temp[2] + "/" + temp[0];
    */
    
     Dates = convertUsToEuropeDate(Dates);

    firebase.database().ref(`/cityexperience`).push({
             user:uid,
             name:names,
             date:Dates,
             typexp:Types,
             members:Members,
             address:Address,
             number:Numbers,
             city:City,
             cap:Cap,
             experience:experienceDescription,

       }).then(()=>
      {
        dispatch({
           type:ADD_EXPERIENCE_SUCCESS,
           name:names,
           date:Dates,
           typexp:Types,
           members:Members,
           address:Address,
           number:Numbers,
           city:City,
           cap:Cap,
        })
        alert( "dati inseriti!" );
        setTimeout( function ( ) {
            navigateTo('homepage');
          }, 100 );
         // setTimeout(alert("timer"),2000);

      } // end then

      );

   } // end function;

 const convertUsToEuropeDate=   (data) =>
   {
     var dateConvert= data;
     var temp=dateConvert.split("-");
     data = temp[0] + "/" + temp[1] + "/" + temp[2];
     return data;
   }
