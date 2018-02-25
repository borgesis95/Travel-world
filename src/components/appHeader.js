import React, { Component } from 'react';
import { Text,StyleSheet , Platform,Dimensions,Image,AsyncStorage} from 'react-native';
import { connect } from 'react-redux';
import {Header,Left,Button,Icon,Right,Body,Title,Row,View} from 'native-base';
import SvgUri from 'react-native-svg-uri';
import {logoutUserStart, logoutUserSuccess, logoutUserFailed,} from '../actions/LogoutActions';
import { NavigationActions } from 'react-navigation';
import {bindActionCreators} from 'redux';

class appHeader extends Component {



  HamburgerIcon(){
    if(Platform.OS !== 'ios')
    {
      return(
        <Button transparent  onPress={()=>   this.props.navigate('DrawerOpen') /* Al tocco sul button invoca la funzione sidebar() */  } >
          <Icon style={{fontSize: 24, color:'white' ,flexDirection:'row',justifyContent:'flex-start'}} name='menu' />
        </Button>
      );
    }
  }

  LogoutIcon(){
    if(Platform.OS === 'ios')
    {
      return(
        <Button transparent  onPress={()=>   this.Logout()  } >
           <Icon style={{marginTop:11,fontSize: 24, color:'white' ,flexDirection:'row',color:'white'}} name="md-power"  />
        </Button>
      );
    }
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
  Logout(){
     AsyncStorage.clear();

      this.props.actions.logoutUserStart();

                                                                        //Inizio logout
     //Se è andato a buon fine allora invio allo store il cambio di stato invocando l'action logoutUserSuccess
     //e passo logout che è un oggetto che invoca il metodo reset() passato dalle Screen

     this.reset();


  }


  render() {
    return (

      <View style={styles.wrapper}>

        <Left style={styles.left}>
          {this.HamburgerIcon()}
        </Left>

        <Body style= {styles.body }>
          <Text style={styles.title}> Travel World </Text>
        </Body>

        <Right style={styles.right}>
          {this.LogoutIcon()}
        </Right>

      </View>
    );
  }
}






const styles = StyleSheet.create({
  wrapper: {
    flexDirection:'row',
    height: 45,
    ...Platform.select({
        ios: { height:60, },
    }),
    backgroundColor: 'darkblue',
    justifyContent: 'center',
    //alignSelf: 'stretch',
    alignItems: 'center',
    shadowOffset: { height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2,

  },
  text: {
    fontSize: 18,
    color: 'white',

  },
  body: {
    flex:3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
  left: {
    flex:1,

  },
  right: {
    flex:1,

  },
  title:{
    color:'white',
    fontWeight:'bold',
    fontSize:20,
    ...Platform.select({
        ios: { marginTop:10, },
    }),
  }

});

function mapDispatchToProps(dispatch){
    return {
      actions: {
        logoutUserStart: bindActionCreators(logoutUserStart, dispatch),
        logoutUserSuccess: bindActionCreators(logoutUserSuccess, dispatch),
        logoutUserFailed: bindActionCreators(logoutUserFailed, dispatch),
        //reset: bindActionCreators(reset, dispatch),
    }
  };
}
export default connect(null, mapDispatchToProps ) (appHeader);
