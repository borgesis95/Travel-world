import React ,{Component} from 'react';
import {View,StyleSheet,Text,Image} from 'react-native';
import {Col,Row,Grid} from 'react-native-easy-grid';
import { MapView } from 'expo';
import { Container, Header, Content, Form, Item, Input , Button
         ,Label,Body,Title,Icon,Left,Right,Card,CardItem,Thumbnail,Spinner } from 'native-base';

export default class DescriptionsActivity extends Component
{
  render()
  {
    return(
        <View style={{flex:2}}>
          <Row style={styles.firstRow}>
             <Label style={styles.title}>{this.props.experience}</Label>
          </Row>

          <Row style={{flex:3}}>
            <Label style={styles.email}>{this.props.description}</Label>
          </Row>
          <Row style={{flex:1.2}}>
            <Image  source={require('../../assets/icons/001-gmail.png')} style={styles.emailIcons}/>
            <Text style={styles.email}>{this.props.email }</Text>
          </Row>
          <Row style={{flex:1.2}}>
            <Image  source={require('../../assets/icons/002-smartphone.png')} style={styles.smartphoneIcons} />
            <Text style={styles.phone}>{this.props.phoneNumber }</Text>
          </Row>
          <Row style={{flex:1.2}}>
            <Image  source={require('../../assets/icons/003-calendar.png')} style={styles.calendarIcons}/>
            <Text style={styles.phone}>  {this.props.date }</Text>
          </Row>
          <Row style={{flex:1.2}}>
            <Image  source={require('../../assets/icons/004-gps.png')} style={styles.maps}/>
            <Text style={styles.phone}>  {this.props.address }, {this.props.number}</Text>
          </Row>

        </View>

    );
  }//end Render
}


const styles= StyleSheet.create({
  firstRow:
  {
    left:8,
    flex:1,
    justifyContent:'flex-start',
  },
  title:
  {
    alignSelf:'center',
    fontWeight:'bold',
    fontSize:30,
    color:'white',
  },
  actDescription:
  {
    fontSize:20,
    fontWeight:'bold',
    color:'white',
    marginLeft:10,
  },
  smartphoneIcons:
  {
    right:5,
    alignSelf:'center',
    height:30,
    width:36,
  },
  emailIcons:
  {
    left:1,
    height:30,
    width:30,
  },
  calendarIcons:
  {
    alignSelf:'center',
    left:1,
    width:29,
    height:30,
  },

  maps:
  {
    width:30,
    height:30,
  },


  email:
  {
    color:'white',
    left:10,
    fontSize:17
  },

  phone:
  {
    color:'white',
    left:3,
    fontSize:17,
  }
})
