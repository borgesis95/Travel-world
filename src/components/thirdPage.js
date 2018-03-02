import React ,{Component} from 'react';
import  {View , Text ,StyleSheet,Image,ScrollView,Dimensions,TouchableOpacity } from 'react-native';
import { Container, Header, Content, Form, Item, Input ,
         Button ,Label,Body,Title,Icon,Left,Right,Card,CardItem,Thumbnail } from 'native-base';
         import { LinearGradient } from 'expo';
import { connect } from 'react-redux';
import {AddActions} from '../actions/AddActions';
import AppFooter from './appFooter.js';
import { Col, Row, Grid } from 'react-native-easy-grid';

 class  ThirdPage extends Component {
   static navigationOptions = {
     header: null,
     tabBarLabel:'Add',
     tabBarIcon: ({ tintColor }) => (
       <Icon name="ios-add-circle" style={{fontSize:26,color: tintColor }}/>
     )
   };

  constructor(props)
  {
    super(props);
    console.ignoredYellowBox = [
'Setting a timer'
];
    this.state=
    {
      members:"",
      streetName:"",
      number:"",
      zipCode:"",
      city:"",
    }
     this.checkCity = this.checkCity.bind(this)
  }

  checkCity(city)
  {
    cityName = city.toLowerCase();
    if(cityName=='catania'||cityName=='milano'||cityName=='roma')
    {

      this.setState({city:cityName});
    }
  }
  checkAndSend(name,date,type,members,address,number,city,cap,navigateTo,experienceDescription)
  {

    this.props.AddActions(this.props.uid,name,date,type,members,address,number,city,cap,navigateTo,experienceDescription);
  }


    render(){
          const {navigate,goBack,state}=this.props.navigation; // to navigate into other page .
        return(
          <Content>
            <Container>
                <LinearGradient
                  colors={['#56CCF2','#2F80ED']}
                  style={{ height:'100%'}}
                >
                  <Grid>
                    <Row style={{flex:0.2}}>
                      <Form style={styles.form}>
                        <Item  style={{width:'80%'}}
                        >
                              <Icon name='md-person-add'style={styles.icon}/>
                            <Input
                              placeholder="Number of people"
                              placeholderTextColor='white'
                              keyboardType='numeric'
                              onChangeText={(text)=>this.setState({members:text})}
                             style={{color:'white'}}/>
                        </Item>
                      </Form>
                    </Row>
                    <Row style={{flex:0.2}}>
                      <Form style={styles.secondForm}>

                        <Item  style={{width:'60%'}}
                        >
                              <Icon name='md-locate'style={styles.icon}/>
                            <Input
                              placeholder="Street name"
                              placeholderTextColor='white'

                              onChangeText={(text)=>this.setState({streetName:text})}
                             style={{color:'white'}}/>
                        </Item>
                        <Item  style={{width:'20%'}}
                        >
                            <Input
                              placeholder="Number"
                              placeholderTextColor='white'
                              keyboardType='numeric'
                              onChangeText={(text)=>this.setState({number:text})}
                             style={{color:'white'}}/>
                        </Item>
                      </Form>
                    </Row>

                    <Row style={{height:150}}>
                      <Form style={styles.secondForm}>

                        <Item  style={{width:'60%'}}
                        >
                              <Icon name='md-locate'style={styles.icon}/>
                            <Input
                              placeholder=" City"
                              placeholderTextColor='white'

                            onEndEditing={(city) => this.checkCity(city.nativeEvent.text)} // this take an event that contain a text!
                             style={{color:'white'}}/>
                        </Item>
                        <Item  style={{width:'20%'}}
                        >
                            <Input
                              placeholder="ZIP code"
                              placeholderTextColor='white'
                              keyboardType='numeric'
                              onChangeText={(text)=>this.setState({zipCode:text})}
                             style={{color:'white',fontSize:15}}/>
                        </Item>
                      </Form>

                    </Row>
                    <Row style={{flex:0.5,justifyContent:'center',alignItems:'center'}}>
                      <Button
                        onPress={(screen)=>this.checkAndSend(
                             state.params.name,
                             state.params.date,
                             state.params.type,
                             this.state.members,
                             this.state.streetName,
                             this.state.number,
                             this.state.city,
                             this.state.zipCode,
                             navigate,
                             state.params.experienceDescription,
                          )}
                        style={styles.button}>
                          <Text style={styles.text}> SUBMIT </Text>
                      </Button>
                    </Row>
                  </Grid>


                </LinearGradient>
            </Container>
          </Content>
        );
    }
}

//StyleSheet

const styles =StyleSheet.create({
  form:
  {
    right:10,
    flexDirection:'row',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    // top:40
  },
  secondForm:
  {
    flexDirection:'row',
    width:'100%',
    justifyContent:'center',
    alignItems:'flex-start',
  },

  icon:
  {
  //  fontSize:45,
    color:'white',
    //top:10,
  },

  text:
  {
    fontSize:20,
    alignSelf:'center',
    color:'black',
  },

  button:
  {
    alignSelf:'center',
    backgroundColor:'#feda4b',
    justifyContent:'center',
    flexDirection:'row',
    width:'90%',

  }
})

const mapStateToProps = state => ({
  uid:state.auth.uid
})

  export default connect(mapStateToProps,{AddActions})(ThirdPage);
