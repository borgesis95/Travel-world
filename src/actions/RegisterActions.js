
import {REGISTER_USER_START ,REGISTER_USER_FAIL ,REGISTER_USER_SUCCESS} from './types';
import firebase from 'firebase';





export const RegisterUser = ({email,password})=> // Per la registrazione occorrono nome,
                                                             // cognome,email,password =>
{
     return (dispatch) => {

            dispatch({type: REGISTER_USER_START}); // spedice allo store questa azione .
            console.log(email);
            console.log(password);
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(user=>RegisterSuccess(dispatch,user))
                  .catch(error=>RegisterFail(dispatch,error));

        }
}




 const RegisterSuccess = (dispatch,user) =>
 {
    console.log("Registrazione Avvenuta con successo");
     dispatch({ type: REGISTER_USER_SUCCESS, payload: user});
      alert("Regisrazione avvenuta con successo")

     //Inizializzo tabella user
     const { currentUser } = firebase.auth();
     firebase.database().ref(`/users/${currentUser.uid}`)
      .set({ name: '', age: '', phone: '', email:user.email, url: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/ce54bf11889067.562541ef7cde4.png'  })

 }

 const RegisterFail = (dispatch, error)  => {
  alert(error.code);
  console.log("non sono riuscito neanche a creare un account");
  dispatch({ type: REGISTER_USER_FAIL, payload: error })
}
