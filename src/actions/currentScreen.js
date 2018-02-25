export const currentScreen = (Screen)=> // Per la registrazione occorrono nome,
                                                             // cognome,email,password =>
{
     return (dispatch) => {

            dispatch({type: "CURRENT_SCREEN_START"}); // spedice allo store questa azione .
            console.log("ACTION SCREEN-->>"+Screen);
            currentScreenSuccess(dispatch,Screen);

        }
}


 const currentScreenSuccess = (dispatch,Screen) =>
 {

    dispatch({ type: "CURRENT_SCREEN_SUCCESS", payload: Screen});

 }
