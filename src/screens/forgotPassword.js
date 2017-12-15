

import React , {Component} from 'react';

import {View,Text,StyleSheet,Image,KeyboardAvoidingView} from 'react-native';
import { Container, Header, Content, Form, Item, Input,Button } from 'native-base';
import {connect} from 'react-redux';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {LinearGradient} from 'expo';
import {forgetPassword} from '../actions/forgetPswd';



class forgotPassword extends Component {
  constructor(props){
           super(props);
           state= {
                    email:''
                  }
  }
  static navigationOptions = {
     header: null
  };

    render()
    {
        return (
          <Container>
            <Content style={{ flex:1 }} contentContainerStyle={{ flex: 1 }} >
              <LinearGradient
                       colors={['#2b5876','#4e4376']}
                       style={{ height:'100%'}}
              >
            <Row style={{flex:0.3}}/>
            <Col style={{flex:1,justifyContent:'flex-end',alignItems:'center'}}>
              <Text style={{fontWeight:'bold',fontSize:20,color:'white'}}> Forgot Your Password? </Text>
               <Text  style={{fontSize:12,color:'white'}}> Just input email that you used to register </Text>
            </Col>

            <Row style={{flex:2,justifyContent:'center',top:20}}>
               <Form style={styles.form}>
                   <Item rounded style={{width:'90%'}}>
                        <Input
                               keyboardType='email-address'
                               disableFullscreenUI={true}
                               placeholder="Write your Email" style={{color:'white',textAlign:'center'}}
                               placeholderTextColor='white'
                               onChangeText={(email)=>this.setState({email})}
                        />
                   </Item>
              </Form>
            </Row>
            <Row style={{flex:1,justifyContent:'center'}}>
              <Button  style={styles.button}
               onPress={()=>this.props.forgetPassword(
                 {
                  email:this.state.email,
                  navigateTo: (screen)=> this.props.navigation.navigate(screen)
                 })}
              >
                  <Text style={styles.textToSubmit}>Send Email</Text>
              </Button>
            </Row>
            </LinearGradient>
       </Content>
    </Container>


        )
    }
} // end class

const styles = StyleSheet.create({

form:
{
    top:20,
    width:'100%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'center',
},



button:
{
  display:'flex',
  flexDirection:'row',
  justifyContent:'center',
  width:'80%',
  backgroundColor:'#feda4b',
},

text:
{
  fontWeight:'bold',
  textAlign:'right',
  color:'black',
},
textToSubmit:
{
  fontWeight:'bold',
  fontSize:13,
  alignSelf:'center',
}

});
export default connect(null, { forgetPassword } ) (forgotPassword);
