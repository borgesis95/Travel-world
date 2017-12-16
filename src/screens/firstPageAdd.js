import React ,{Component} from 'react';
import  {View , Text ,StyleSheet,Image,ScrollView,Dimensions } from 'react-native';
import { Container, Header, Content, Form, Item, Input ,
         Button ,Label,Body,Title,Icon,Left,Right,Card,CardItem,Thumbnail } from 'native-base';

import { Col, Row, Grid } from 'react-native-easy-grid';
import FirstPage from '../components/firstPage';
import SecondPage from '../components/secondPage';

export default class firstPageAdd extends Component{
 render()
 {
     return(
               <View>
                 <FirstPage/>
                 <SecondPage/>
               </View>

     );
 }

}
