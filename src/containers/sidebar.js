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
import { NavigationActions } from 'react-navigation';

class Sidebar extends Component {

  constructor()
  {
    super();
    this.state={
      active:'Home',
    }
  }

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
     else return "Welcome,"
  }

  Email()
  {
    if(this.props.user != null) return  this.props.user.email;    //altrimenti se il nome non è stato configurato stampa l'email
  }



  UserPhoto()
  {
      if(this.props.user != null && this.props.user.url!="")  return this.props.user.url;
      else return "https://mir-s3-cdn-cf.behance.net/project_modules/disp/ce54bf11889067.562541ef7cde4.png";
  }

  //Reset main route with login solo se il logout invocato nella sidebar va a buon fine
  reset = () =>{

    //Imposto come pagina principale login  in modo che una volta effettuato il logout non è possibile tornare indietro senza permessi
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'login'})
      ]
    });

    //Dispatch del'action
    this.props.navigation.dispatch(resetAction);
  }


  //Il metodo si occupa di eseguire il logout una volta premuto il corrispondente bottone nella sidebar
  Logout()
  {


      this.props.actions.logoutUserStart();  //Inizio logout
      console.log("LOGOUT -> " + firebase.auth().currentUser);

      //Se è andato a buon fine allora invio allo store il cambio di stato invocando l'action logoutUserSuccess
      //ed invoco il metodo reset() che permette di resettare lo StackNavigator alla pagina di Login
      firebase.auth().signOut().then(() =>{
         console.log("UTENTE NON LOGGATO");
         AsyncStorage.clear();
         this.reset();
         this.props.actions.logoutUserSuccess();

      }).catch((error)=> this.props.actions.logoutUserFailed(error) );

  }

  render() {
/*    const navigate = this.props.navigate;  //  passo la variabile this.props.navigate da myHome.js a alla variabile navigate di questa screen
   //successivamente attraverso tale variabile passo da una screen all'altra specificando in quale screen andare dopo aver clccato l'apposito text (es. navigate(login))
*/
    return (

      <View style = {{ flex:1 ,flexDirection: 'column',justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: 'white',}}>

            <View style={styles.profile} >

              <View style={{justifyContent:'center',alignItems: 'center',backgroundColor:'white',width: 70, height: 70 ,borderRadius: 35,marginLeft:16}}>
                <Image source={{uri: this.UserPhoto()}} style={{ width: 70, height: 70, borderRadius:35,}}/>
              </View>

              <View style={{flex:1, flexDirection:'column', justifyContent:'flex-end' ,height:88,marginLeft:32}}>
                <Text style={styles.welcome}> { this.UserName() } </Text>
                <Text style={styles.email}> { this.Email() }</Text>
              </View>
            </View>


            <Button transparent full
              style={[styles.button, {backgroundColor: this.props.Screen == "Home"  ? '#D3D3D3' : 'transparent'}]}
              onPress={()=>{
                this.props.navigation.navigate('homepage')

              }}
            >
              <View style={{marginLeft:8}}>
                <Icon
                  style={{fontSize:24, color:'#4b4b4b'}}
                  name="md-home"
                />
              </View>

              <View>
                <Text style={styles.item}> Home </Text>
              </View>
            </Button>


            <Button transparent full
              style={[styles.button, {backgroundColor: this.props.Screen == "Profile" ? '#D3D3D3' : 'transparent'}]}
              onPress={()=>{
                this.props.navigation.navigate('ProfileScreen')

              }}
            >
              <View style={{marginLeft:8}}>
                <Icon
                  style={{fontSize:24, color:'#4b4b4b'}}
                  name="md-person"
                />
              </View>

              <View>
                <Text style={styles.item}> Profile </Text>
              </View>
            </Button>


            <Button transparent full
              style={[styles.button, {backgroundColor: this.props.Screen == "Add" ? '#D3D3D3' : 'transparent'}]}
              onPress={()=>{
                this.props.navigation.navigate('tab1')

              }}
            >
              <View style={{marginLeft:8}}>
                <Icon
                  style={{fontSize:24, color:'#4b4b4b'}}
                  name="md-add-circle"
                />
              </View>

              <View>
                <Text style={styles.item}> Add Experience </Text>
              </View>
            </Button>


            <Button transparent full
              style={[styles.button, {backgroundColor: this.props.Screen == "ExperienceCart" ? '#D3D3D3' : 'transparent'}]}
              onPress={()=>{
                this.props.navigation.navigate('experienceCart')

              }}
            >
              <View style={{marginLeft:8}}>
                <Icon
                  style={{fontSize:24, color:'#4b4b4b'}}
                  name="md-cart"
                />
              </View>

              <View>
                <Text style={styles.item}> My Experience </Text>
              </View>
            </Button>

            <Button transparent full style={styles.button} onPress={()=> this.Logout()} >
              <View style={{marginLeft:8}}>
                <Icon
                  style={{fontSize:24, color:'#4b4b4b'}}
                  name="md-exit"
                />
              </View>

              <View>
                <Text style={styles.item}> Logout </Text>
              </View>
            </Button>

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
  },
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    //backgroundColor: '#ecf0f1',
  },
  item:{
    fontSize: 15 ,
    color:'black' ,
    opacity: 0.87,

    marginLeft:12
  },
  button:{
    flexDirection: 'row',
    justifyContent: 'flex-start' ,
    marginTop:32,
    height:28
  },
  profile:{
    backgroundColor:'#1B5983',
    width: '100%'  ,
    height: 110,
    flexDirection:'row',
    alignItems:'center'
  },
  welcome:{
    fontSize: 18 ,
    color:'white' ,
    opacity: 1,

    //marginLeft: 16,
    //marginTop: 5
    marginBottom: 4,
  },
  email:{
    fontSize: 16 ,
    color:'white' ,
    opacity: 0.54,

    //marginLeft: 16,
    marginBottom: 16
  }
});

const mapStateToProps = state => ({
     uid:state.auth.uid,
     user: state.ProfileFetch.profile,                //Reducer che ritorna i dati aggiornati dal database
     Screen: state.CurrentScreen.Screen,
     loading: state.CurrentScreen.loading

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
