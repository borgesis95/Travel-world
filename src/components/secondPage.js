import React ,{Component} from 'react';
import  {View , Text ,StyleSheet,Image,ScrollView,Dimensions,TouchableOpacity } from 'react-native';
import { Container, Header, Content, Form, Item, Input ,
         Button ,Label,Body,Title,Icon,Left,Right,Card,CardItem,Thumbnail } from 'native-base';
         import { LinearGradient } from 'expo';

import AppFooter from './appFooter.js';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class  SecondPage extends Component {
  static navigationOptions = {
    header: null
  };

      constructor(props)
      {
        super(props);
        console.ignoredYellowBox = [
    'Setting a timer'
    ];
        this.state={ type:""},
        this.changePage = this.changePage.bind(this)

      }
      changePage(typexp,name,navigate,date,experienceDescription){
      this.setState({type:typexp});
        navigate('tab3',{
                  type:typexp,
                  name: this.props.navigation.state.params.name,
                  date:this.props.navigation.state.params.date,
                  experienceDescription:this.props.navigation.state.params.experienceDescription
                })
     }
  render()
  {

      const {navigate,goBack,state} = this.props.navigation;
        return(
          <Container style={styles.container}>
            <LinearGradient
              colors={['#56CCF2','#2F80ED']}
              style={{ height:'100%'}}
            >
              <Row style={{flex:0.5,justifyContent:'center',alignItems:'center'}}>
                <Label  style={styles.label}> Choose  the type of experience </Label>
              </Row>
               <Row style={{justifyContent:'space-around',alignItems:'flex-start'}}>
                <TouchableOpacity style={styles.button} onPress={()=>this.changePage(
                     "Food",
                      this.props.navigation.state.params.name,
                      navigate,
                      this.props.navigation.state.params.date,
                      this.props.navigation.state.params.experienceDescription
                  )}>
                  <Image  source={require('../../assets/icons/004-burger.png')} style={styles.image} resizeMode='stretch'/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>this.changePage(
                      "Sport",
                      this.props.navigation.state.params.name,
                      navigate,
                      this.props.navigation.state.params.date,
                      this.props.navigation.state.params.experienceDescription
                  )}>
                  <Image source={require('../../assets/icons/002-football.png')} style={styles.image}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>this.changePage(
                     "Tourism",
                      this.props.navigation.state.params.name,
                      navigate,
                      this.props.navigation.state.params.date,
                      this.props.navigation.state.params.experienceDescription
                  )}>
                  <Image source={require('../../assets/icons/003-baggage.png')} style={styles.image}/>
               </TouchableOpacity>
              </Row>

                
                </LinearGradient>
                </Container>
        );
    }
}

const styles = StyleSheet.create({
    container:
    {
        backgroundColor:'#edae23',
        height:Dimensions.get('window').height,
        width:(Dimensions.get('window').width)
    },

    image:
    {
        // top:40,
       //  bottom:30,
       // backgroundColor:'yellow',
        height:80,
        width:80,
    },
    label:
    {
        fontWeight:'bold',
        color:'transparent',
        fontSize:20,
    },
    button:
    {
       // backgroundColor:'red',
        height:80,
        top:40,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',

    },
    icon:
    {
        height:50,
        width:50,
    },

    rowFooter:
    {
      flex:1,
      width:'100%',
      justifyContent:'space-around',
      alignItems:'center',
    },
    buttonfooter:
    {
        backgroundColor:'blue',
        height:50,
        width:'100%',
        display:'flex',
        flexDirection:'row',
        alignItems:'flex-end',
        justifyContent:'center',
        backgroundColor:'#4682B4',

    },
    text:
    {
      fontSize:20,
      alignSelf:'center',
      color:'white',
    },




})
