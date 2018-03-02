import {LOGIN_USER_START,LOGIN_USER_SUCCESS,LOGIN_USER_FAIL} from './types';
import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';
import { Permissions, Notifications } from 'expo';

export const loginUser = ({email,password,navigateTo,navigation}) =>
{
    return (dispatch)=>{
      dispatch({type: LOGIN_USER_START});
            console.log("Siamo nella action di login", email,password);
           firebase.auth().signInWithEmailAndPassword(email,password).
           then((user)=>loginUserSuccess(user,dispatch,navigateTo,navigation)).catch(error=>loginUserFailed(error,dispatch));

    }
}


const loginUserSuccess = async (user,dispatch,navigateTo,navigation) => {

  token =  await registerForPushNotificationsAsync(user.uid);

    dispatch({
                type:LOGIN_USER_SUCCESS ,
                email:user.email,
                uid:user.uid,

             });

             //dispatch action to reset the main route
             navigation.dispatch(resetAction)


    //navigateTo('homepage');

}


const loginUserFailed = (error,dispatch)=>{

  var errorMessage = error.message;
  console.log(errorMessage);
  alert(error);
     dispatch({

              type:LOGIN_USER_FAIL,
              payload:error.message

            });

}


//Reset main route with homepage
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'homepage'})
  ]
})

async function registerForPushNotificationsAsync(uid) {
 const { status: existingStatus } = await Permissions.getAsync(
   Permissions.NOTIFICATIONS
 );
 let finalStatus = existingStatus;

 // only ask if permissions have not already been determined, because
 // iOS won't necessarily prompt the user a second time.
 if (existingStatus !== 'granted') {
   // Android remote notification permissions are granted during the app
   // install, so this will only ask on iOS
   const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
   finalStatus = status;
 }

 // Stop here if the user did not grant permissions
 if (finalStatus !== 'granted') {
   return;
 }

 // Get the token that uniquely identifies this device
 let token = await Notifications.getExpoPushTokenAsync();
 var str = token.split('[');
 final = str[1].split(']');
 console.log("stringa 1",str[1]);
 console.log("STRINGA TOKEN",final[0]);
 var database = firebase.database();
 await firebase.database().ref('TokenUtentiPush/'+uid+'/'+final[0]).set({
   expoToken:token,
  });
 // console.log("TOKEN",token);

 return token;

}
