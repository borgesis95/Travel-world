import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Constants } from 'expo';
import {Content,Container,Icon, Right,Header,Card,Title,Text,CardItem,Body, Thumbnail, Button,Row,Col} from 'native-base';
import {loginUser } from '../actions/AuthActions';
import { connect } from 'react-redux';
import {AsyncStorage} from 'react-native';
import {logoutUserStart, logoutUserSuccess, logoutUserFailed,} from '../actions/LogoutActions';
import * as firebase from 'firebase';
import {bindActionCreators} from 'redux';
import {userFetchStart, userFetchSuccess, userFetchFailed} from '../actions/ProfileActions.js';


class Sidebar extends Component {

  async componentDidMount(){
   //  const { currentUser } = firebase.auth();                     //estraggo il corrente utente
      console.log("UID LOG did mount",this.props.uid);
    this.props.actions.userFetchStart();                         //inizio estrazione dati utente
    firebase.database().ref(`/users`).once('value').              //prelevo i datti dalla tabella/oggetto  user  in firebase
    then((snapshot)=> {                                          //snaphot contiene tutti gli UID degli utenti

      var items;
      snapshot.forEach((child) => {                             //scorro gli UID
        if( this.props.uid ==  child.key){                    //se UID del corrente utente è uguale allo UID esaminato nel database

            items= child.val();                                //allora copia tutti i dati (name,age,phone,email)  in items
        }

      });

      this.props.actions.userFetchSuccess(items)              //passa items all'action in modo da restituire successivamente i dati aggiornati tramite reducer ProfileFetch
    }).
    catch(error=>this.props.actions.userFetchFailed(error));  //se l'estrazione non è andata a buon fine ritorna errore

  }


  UserName(){                                                    //se i dati estratti sono diversi da null e l'utente ha già messo il suo nome allora stampo il nome dell'utente
     if(this.props.user != null && ( this.props.user.name !="" && this.props.user.name !="Name" ) ) return this.props.user.name;
     else if(this.props.user != null) return  this.props.user.email;    //altrimenti se il nome non è stato configurato stampa l'email
  }




  UserPhoto()
  {
      if(this.props.user != null)  return this.props.user.url;
  }





  //Il metodo si occupa di eseguire il logout una volta premuto il corrispondente bottone nella sidebar
  Logout(){
     AsyncStorage.clear();
    
      this.props.actions.logoutUserStart();

                                                                        //Inizio logout
     //Se è andato a buon fine allora invio allo store il cambio di stato invocando l'action logoutUserSuccess
     //e passo logout che è un oggetto che invoca il metodo reset() passato dalle Screen
     firebase.auth().signOut().                                                                                   //Eseguo il logout
      then(() => this.props.actions.logoutUserSuccess({  logout: () => this.props.reset()})

      ).
      catch((error)=> this.props.actions.logoutUserFailed(error));                                                //se il logout non va a buon fine restituisco errore

  }

  render() {
    const navigate = this.props.navigate;  //  passo la variabile this.props.navigate da myHome.js a alla variabile navigate di questa screen
   //successivamente attraverso tale variabile passo da una screen all'altra specificando in quale screen andare dopo aver clccato l'apposito text (es. navigate(login))

    return (


          <View style = {{ flex:1 , width: '100%' ,flexDirection: 'column',justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'white',}}>

            <View  style = {{ flex:3, width: '100%' , flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#ecf0f1'}}>
                  <Thumbnail large circle source={{uri: this.UserPhoto()}} style={{ width: 120, height: 120, borderRadius:60,}}/>
                  <Text style={styles.Username}> { this.UserName() } </Text>
            </View>

            <CardItem button style={{flex:1,flexDirection: 'row', backgroundColor: 'transparent', }} onPress={()=>navigate('ProfileScreen')} >
                <Icon  name="person" />
                <Text>My Account</Text>

                <Right>
                  <Icon name="ios-arrow-forward-outline" />
                </Right>
            </CardItem>

            <CardItem button style={{flex:1,flexDirection: 'row', backgroundColor: 'transparent'}} onPress={()=>navigate('tab1')} >
                <Icon  name="ios-add-circle-outline" />
                <Text>Add Experience</Text>

                <Right>
                  <Icon name="ios-arrow-forward-outline" />
                </Right>
            </CardItem>

            <CardItem button style={{flex:1,flexDirection: 'row', backgroundColor: 'transparent'}} onPress={()=>navigate('experienceCart')}>
                <Icon  name="paper-plane" />
                <Text>My Experience</Text>

                <Right>
                  <Icon name="ios-arrow-forward-outline" />
                </Right>
            </CardItem>

            <CardItem button style={{flex:1,flexDirection: 'row', backgroundColor: 'transparent'}} onPress={()=> this.Logout() } >
                <Icon  name="md-exit" />
                <Text >Logout</Text>

                <Right>
                  <Icon name="ios-arrow-forward-outline" />
                </Right>
            </CardItem>


         </View>



    );
  }
}




const styles = StyleSheet.create({

  Username: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'darkblue',
    backgroundColor: 'transparent'
  },
  textWithIcon:{
    flex:1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'red',
    borderColor: 'red',
    borderBottomWidth: 3
  }
});

const mapStateToProps = state => ({
     uid:state.auth.uid,
     user: state.ProfileFetch.profile,                //Reducer che ritorna i dati aggiornati dal database


});

function mapDispatchToProps(dispatch){
    return {
      actions: {
        userFetchStart: bindActionCreators(userFetchStart, dispatch),
        userFetchSuccess: bindActionCreators(userFetchSuccess, dispatch),
        userFetchFailed: bindActionCreators(userFetchFailed, dispatch),
        logoutUserStart: bindActionCreators(logoutUserStart, dispatch),
        logoutUserSuccess: bindActionCreators(logoutUserSuccess, dispatch),
        logoutUserFailed: bindActionCreators(logoutUserFailed, dispatch),
        //reset: bindActionCreators(reset, dispatch),
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps ) (Sidebar);
