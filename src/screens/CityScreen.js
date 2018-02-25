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


  render(){
    const {navigate,goBack}  = this.props.navigation;

    if(Platform.OS === 'ios')
    {
      /*<AppFooter  navigate={navigate} goBack= {goBack} />*/
      return (
        <Container style= {{ width: Dimensions.get('window').width , height: Dimensions.get('window').height}}>

          <AppHeader navigate={navigate}/>
          <CityScreenBody navigate={navigate} />



        </Container>
      );

    }else
    {
      return (
        <Container style= {{ width: Dimensions.get('window').width , height: Dimensions.get('window').height}}>

          <AppHeader navigate={navigate}/>
          <CityScreenBody navigate={navigate} />

        </Container>
      );
    }

  }
}
