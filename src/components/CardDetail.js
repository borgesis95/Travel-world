
/*
 Classe che mi consente di visualizzare il carrello delle attività acquistate dall'utente .
*/
import React , {Component} from 'react';
import {View , StyleSheet, Image,Text,MapView,ScrollView}  from 'react-native';
import {Col,Row,Grid} from 'react-native-easy-grid';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo';

import { Container, Header, Content, Form, Item, Input , Button
         ,Label,Body,Title,Icon,Left,Right,Card,CardItem,Thumbnail,Spinner } from 'native-base';

export default class CardDetail extends Component
{
  choseIcon(type)
  {
    switch(type)
    {
      case 'Sport':
      {
        return(
                 <Image   source={require('../../assets/icons/002-sports.png')}
                   style={styles.icon}
                 />
             );
      }// End sport case

      case 'Food':
      {
        return(
                <Image   source={require('../../assets/icons/001-pizza.png')}
                  style={styles.icon}
                />
              );
      }

      case 'Tourism':
      {
        return(
                <Image   source={require('../../assets/icons/003-photo-camera.png')}
                  style={styles.icon}
                />
              );
      }

    } // end switch

  }
  render()
  {
    return(
         <Card style={{height:100,marginBottom:0,width:'98%',alignSelf:'center'}}>
            <Row style={styles.row}>
                  {this.choseIcon(this.props.type)}
            <Col style={styles.col}>
                <Text style={styles.title}>{this.props.nameActivity}</Text>
                <Text style={styles.text}>{this.props.data}</Text>
                <Text style={styles.text}>{this.props.type}</Text>
           </Col>
           </Row>
         </Card>

        );


  } // end render
} // End Class
const styles = StyleSheet.create({
  row:
  {
    alignItems:'center',
  },
  col:
  {

      left:30,

      alignItems:'flex-start',
      justifyContent:'flex-start',
      width:40,
      height:'100%',

  },
  icon:
  {
    width:70,
    height:70,
    marginLeft:10
  },

  text:
  {
    color:'grey',
    top:10,
  },

  title:
  {
    top:4,
    fontSize:20,
     // fontWeight:'bold',
  }

});
