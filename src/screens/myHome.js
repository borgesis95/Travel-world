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

          <AppHeader navigate={navigate}/>
          <HomeBody navigate={navigate} />

        </Container>
      );
    }


  }
}
