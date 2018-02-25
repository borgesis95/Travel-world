import React, { Component } from 'react';
import { AppRegistry, Text, Image ,StyleSheet, Dimensions,View,Platform} from 'react-native';
import { Container, Header, Content, DeckSwiper ,Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right,Row } from 'native-base';
import {Drawer} from 'native-base';

import AppHeader from '../components/appHeader.js';
import HomeBody  from '../containers/homeBody.js';
import AppFooter from '../components/appFooter.js';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import {currentScreen} from '../actions/currentScreen.js';
import Sidebar from '../containers/sidebar.js';


class HomePage extends Component {



  constructor(props) //EDIT BORGESI
  {
    super(props);
    console.ignoredYellowBox = [ 'Setting a timer' ];
  } // END EDIT

  static navigationOptions = {
    header: null,
    tabBarLabel:'Home',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-home" style={{fontSize:26,color: tintColor }}/>
    )
  };


  componentDidMount()
  {
    this.props.currentScreen("Home");
  }

  render() {

    const { navigate, goBack } = this.props.navigation;       //inserisco nella variabile navigate un riferimento allo StackNavigator di App.js
                                                             // Tale variabile sarà passata alle componenti di questa pagina (es. Sidebar)

    if(Platform.OS === 'ios')
    {
      /*  <AppFooter  navigate={navigate} goBack= {goBack} />*/
      return (
        <Container style= {{ width: Dimensions.get('window').width , height: Dimensions.get('window').height}}>

          <AppHeader navigate={navigate}/>
          <HomeBody navigate={navigate} />



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

export default connect (null, {currentScreen}) (HomePage);
