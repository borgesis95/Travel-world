import React, { Component } from 'react';
import { AppRegistry, Text, Image, View, StyleSheet, TouchableWithoutFeedback, FlatList,TouchableOpacity, Platform ,Dimensions } from 'react-native';
import { Container, Header, Content, DeckSwiper ,Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';
import {citySelected} from '../actions/citySelected.js';
import AppHeader from '../components/appHeader.js';
import CityScreenBody  from '../containers/CityScreenBody.js';
import AppFooter from '../components/appFooter.js';
import Sidebar from '../containers/sidebar.js';
import { NavigationActions } from 'react-navigation';
import {Drawer} from 'native-base';
import {connect} from 'react-redux';


export default class CityScreen extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    flag: false,

  };

  //Funzione che si occupa della chiusura della sidebar e di aggiornare il suo stato (chiusa)
  closeDrawer = () => {
    this.drawer._root.close();          //eseguo la chiusura
     this.setState({ flag: false });   //stato = chiusa
  };

    //Funzione che si occupa dell'apertura della sidebar e di aggiornare il suo stato (aperta)
  openDrawer = () => {
    this.drawer._root.open();          //eseguo l'apertura
     this.setState({ flag: true });   //stato = aperta

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

  render(){
    const {navigate,goBack}  = this.props.navigation;

    return(

      <Container style={{width: Dimensions.get('window').width , height: Dimensions.get('window').height}}>
          

          <Drawer
             ref={(ref) => { this.drawer = ref; } }
             content={ <Sidebar navigate={navigate} reset={()=> this.func()} /> }
             onClose={() =>{ this.closeDrawer() } /* alla chiusura della sidebar, invoco closeDrawer*/}
             onOpen={() =>{  this.openDrawer() }  /* all'apertura della sidebar, invoco closeDrawer*/}

          >

            <AppHeader
               openDrawer= { () => this.openDrawer()   /* Passo la funzione openDrawer()  al componente  AppHeader del file appHeader.js*/  }
               closeDrawer={ () => this.closeDrawer()  /* Passo la funzione closeDrawer()  al componente  AppHeader del file appHeader.js*/ }


            />

            <CityScreenBody navigate={navigate} />

        </Drawer>

        <AppFooter  navigate={navigate} goBack= {goBack}  />

      </Container>




    );



  }
}
