import React, { Component } from 'react';
import { Text,StyleSheet , Platform,Dimensions,Image} from 'react-native';

import {Header,Left,Button,Icon,Right,Body,Title,Row,View} from 'native-base';
import SvgUri from 'react-native-svg-uri';


export default class appHeader extends Component {



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
        <Button transparent  onPress={()=>   alert("Premuto")  } >
           <Icon style={{marginTop:11,fontSize: 24,marginLeft:16, color:'white' ,flexDirection:'row',justifyContent:'flex-start',color:'white'}} name="md-power"  />
        </Button>
      );
    }
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
