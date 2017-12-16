import React, { Component } from 'react';
import { AppRegistry, Text, Image, View, StyleSheet, TouchableWithoutFeedback, FlatList,TouchableOpacity  } from 'react-native';
import { Container, Header, Content, DeckSwiper ,Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';
import {typeExperienceSelected}    from '../actions/typeExperienceSelected.js';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import { LinearGradient } from 'expo';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as firebaseApp from 'firebase';



class FiltersScreenBody extends Component {
  state = { loaded: false, }



  render(){

    const {navigate}  = this.props.navigate;

      return(
        <Container>
          <LinearGradient  colors={['#56CCF2','#2F80ED']}    style={{ height:'100%' , width: '100%'}} >
            <View style= {{ flex:1, flexDirection: 'column', justifyContent: 'space-around', }}>
              <TouchableOpacity style={{flex:1}} activeOpacity={0.6}  onPress={() =>{ this.props.typeExperienceSelected("Food"); this.props.navigate('CityScreen');} }  >
                <Card >
                  <Image  style={{  height: '100%', width: '100%', borderRadius: 2, alignSelf: 'center' }} source={require('../../assets/1.png')} />
                </Card>
              </TouchableOpacity>

              <TouchableOpacity style={{flex:1}} activeOpacity={0.6}  onPress={() =>{ this.props.typeExperienceSelected("Food"); this.props.navigate('CityScreen');} }  >
                <Card>
                  <Image  style={{  height: '100%', width: '100%', borderRadius: 2, alignSelf: 'center' }} source={require('../../assets/2.png')} />
                </Card>
              </TouchableOpacity>

              <TouchableOpacity style={{flex:1}}  activeOpacity={0.6}  onPress={() =>{ this.props.typeExperienceSelected("Food"); this.props.navigate('CityScreen');} }  >
                <Card>
                  <Image  style={{  height: '100%', width: '100%', borderRadius: 2, alignSelf: 'center' }} source={require('../../assets/3.png')} />
                </Card>
              </TouchableOpacity>

             </View>
          </LinearGradient>
        </Container>
      );



  }
}



function mapDispatchToProps(dispatch){
    return  bindActionCreators({ typeExperienceSelected : typeExperienceSelected}, dispatch)

}



const styles = StyleSheet.create({
  container: {

    //backgroundColor: 'dodgerblue',
    justifyContent: 'center',
    //alignSelf: 'stretch',
    alignItems: 'center',
    shadowOffset: { height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2,

    backgroundColor: '#ecf0f1',
  },
  paragraph: {

    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
});



export default connect(null,mapDispatchToProps)(FiltersScreenBody);
