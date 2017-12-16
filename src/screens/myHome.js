import React, { Component } from 'react';
import { AppRegistry, Text, Image ,StyleSheet, Dimensions,View,Platform} from 'react-native';
import { Container, Header, Content, DeckSwiper ,Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right,Row } from 'native-base';
import {Drawer} from 'native-base';

import AppHeader from '../components/appHeader.js';
import HomeBody  from '../containers/homeBody.js';
import AppFooter from '../components/appFooter.js';

import { NavigationActions } from 'react-navigation';

import Sidebar from '../containers/sidebar.js';



export default class HomePage extends Component {



  constructor(props) //EDIT BORGESI
  {
    super(props);
    console.ignoredYellowBox = [ 'Setting a timer' ];
  } // END EDIT
  static navigationOptions = {
    header: null
  };

  state = {
    flag: false,

  };

  //Funzione che si occupa della chiusura della sidebar e di aggiornare il suo stato (chiusa)
  closeDrawer = () => {
    this.drawer._root.close();          //eseguo la chiusura

  };

    //Funzione che si occupa dell'apertura della sidebar e di aggiornare il suo stato (aperta)
  openDrawer = () => {
    this.drawer._root.open();          //eseguo l'apertura

  };

  //Reset main route with login solo se il logout invocato nella sidebar va a buon fine
  func = () =>{

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

  render() {

    const { navigate, goBack } = this.props.navigation;       //inserisco nella variabile navigate un riferimento allo StackNavigator di App.js
                                                             // Tale variabile sarà passata alle componenti di questa pagina (es. Sidebar)

    if(Platform.OS === 'ios')
    {
      return (
        <Container style= {{ width: Dimensions.get('window').width , height: Dimensions.get('window').height}}>

          <AppHeader/>
          <HomeBody navigate={navigate} />

          <AppFooter  navigate={navigate} goBack= {goBack} />

        </Container>
      );

    }else
    {
      return (
        <Container style= {{ width: Dimensions.get('window').width , height: Dimensions.get('window').height}}>
            <Drawer
               ref={(ref) => { this.drawer = ref; } }
               content={ <Sidebar navigate={navigate} reset={()=> this.func()} /> }
            >

              <AppHeader
                 openDrawer= { () => this.openDrawer()   /* Passo la funzione openDrawer()  al componente  AppHeader del file appHeader.js*/  }
              />

              <HomeBody navigate={navigate} />

          </Drawer>
          
        </Container>
      );
    }


  }
}
