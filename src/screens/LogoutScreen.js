import React, { Component } from 'react';
import { AppRegistry, Text, Image ,StyleSheet, Dimensions,View,Platform,Keyboard,TouchableOpacity} from 'react-native';
import { Container, Content,Drawer,Icon,Button,Spinner,Card } from 'native-base';
import {connect}  from 'react-redux';
import {AsyncStorage} from 'react-native';
import {logoutUserStart, logoutUserSuccess, logoutUserFailed,} from '../actions/LogoutActions';
import * as firebase from 'firebase';
import { NavigationActions } from 'react-navigation';
import {bindActionCreators} from 'redux';
import { LinearGradient } from 'expo';

console.ignoredYellowBox = ['Setting a timer'];

class Logout extends Component {

  constructor(props)
  {

    super(props);
    this.state={
       confirm: false,
    }

  } // END EDIT



  static navigationOptions = ({navigation}) => ({
    header: null,
    tabBarVisible: true,

    tabBarLabel:'Logout',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-exit" style={{
        ...Platform.select({
            ios: { fontSize:26, },
            android:{fontSize:20}
        }),color: tintColor }}/>
    ),

  });


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


  render()
  {
     if(this.state.confirm == true)
     {
       return(

         <LinearGradient  colors={['#56CCF2','#2F80ED']}    style={{ height:'100%' , width: '100%',flexDirection:'column',justifyContent:'center',alignItems:'center'}} >
           <Spinner color='white' />
           <Text style={{color:'white'}}> Disconnecting...</Text>
         </LinearGradient>
       );

     }else
     {

       return(
         <LinearGradient  colors={['#56CCF2','#2F80ED']}    style={{ height:'100%' , width: '100%',justifyContent:'center',alignItems:'center'}} >
            <View
              elevation={8}
              style={{width:'80%',height:'40%' ,backgroundColor:'#f9f9f9',borderRadius:8,shadowColor: 'black',shadowOffset: { width: 0, height: 3 },shadowRadius: 5,shadowOpacity: 1.0,}}
            >

              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'black',fontWeight:'bold',opacity:0.85,fontSize:16}}>Do you want to leave? </Text>
              </View>

              <View style={{flex:1,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('homepage')}>
                  <Text style={{color:'#0672f7',fontWeight:'bold',fontSize:14}}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{ this.setState({load: true}), this.Logout() }}>
                  <Text style={{color:'#0672f7',fontWeight:'bold',fontSize:14}}>Confirm</Text>
                </TouchableOpacity>
              </View>

            </View>
         </LinearGradient>
       );
     }

  }
}

function mapDispatchToProps(dispatch){
    return {
      actions: {
        logoutUserStart: bindActionCreators(logoutUserStart, dispatch),
        logoutUserSuccess: bindActionCreators(logoutUserSuccess, dispatch),
        logoutUserFailed: bindActionCreators(logoutUserFailed, dispatch),

    }
  };
}
export default connect(null, mapDispatchToProps ) (Logout);
