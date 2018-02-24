import React, { Component } from 'react';
import { AppRegistry, Text, Image, View, StyleSheet, TouchableWithoutFeedback, FlatList,TouchableOpacity,Platform ,Dimensions } from 'react-native';
import { Container, Header, Content, DeckSwiper ,Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';
import {citySelected} from '../actions/citySelected.js';
import AppHeader from '../components/appHeader.js';
import ProfileScreenBody  from '../containers/ProfileScreenBody.js';
import AppFooter from '../components/appFooter.js';
import Sidebar from '../containers/sidebar.js';
import { NavigationActions } from 'react-navigation';
import {Drawer} from 'native-base';
import {connect} from 'react-redux';


export default class ProfileScreen extends Component {
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
      return (
        <Container style= {{ width: Dimensions.get('window').width , height: Dimensions.get('window').height}}>
          <AppHeader/>
          <ProfileScreenBody navigate={navigate} />

          <AppFooter  navigate={navigate} goBack= {goBack} />

        </Container>
      );

    }else
    {
      /*<Drawer
        ref={(ref) => { this.drawer = ref; } }
        content={ <Sidebar navigate={navigate} reset={()=> this.func()} /> }


      >
        <AppHeader
          openDrawer= { () => this.openDrawer()    }

        />

        <ProfileScreenBody navigate={navigate} />

      </Drawer>*/

      return (

        <Container style= {{ width: Dimensions.get('window').width , height: Dimensions.get('window').height}}>

            <AppHeader navigate={navigate}/>
            <ProfileScreenBody navigate={navigate} />

        </Container>

      );
    }

  }
}
