import React , {Component} from 'react';
import  {View , Text ,StyleSheet,Dimensions,KeyboardAvoidingView } from 'react-native';
import { Container, Header, Content, Form, Item, Input , Button ,Label,Body,Title,Icon,Left,Spinner,Right,Card,CardItem,Thumbnail } from 'native-base';
import {RegisterUser } from '../actions/RegisterActions';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo';
import { Col, Row, Grid } from 'react-native-easy-grid';
class RegisterForm extends Component {
  constructor(props)
  {
    super(props)
    this.state = {email:'' , password:''};
  }

  static navigationOptions = {
    header: null
  };

  loadSpinner()
  {
    if(!this.props.isLoading)
    {
      return(
     <Spinner color='black' />
      );
    }

    else {
      return(<Text style={styles.textToSubmit}>CREATE ACCOUNT</Text> );
    }

  }

render()
{
  return (
    <Container>
      <Content style={{ flex:2 }} contentContainerStyle={{ flex: 1 }} >
        <LinearGradient
                 colors={['#2F80ED','#2F80ED']}
                 style={{ height:'100%'}}
        >
        <Row style={styles.rowone}/>
        <Col style={styles.coltwo}>
          <Form>
            <Item floatingLabel style={styles.form}>
              <Label style={{color:'#E5F8FF'}}> E-mail </Label>
                <Input style={styles.input}
                     keyboardType='email-address'
                     onChangeText={(email)=>this.setState({email})}
                />
            </Item>
            <Item floatingLabel style={styles.form}>
              <Label style={{color:'#E5F8FF'}}> Password</Label>
              <Input   style={styles.input}
                       secureTextEntry={true}
                       onChangeText={(password)=>this.setState({password})}
              />
            </Item>
          </Form>
        </Col>

        <Row style={styles.rowthree}>
          <Button  rounded large  style={styles.buttonToSubmit}
                     onPress={()=>this.props.RegisterUser({   // call with action a loginUser function  that allow you to access to firebaseDB
                      email:this.state.email,
                      password:this.state.password, })}
          >
          {this.loadSpinner()}
        </Button>
      </Row>
</LinearGradient>
</Content>
</Container>
)
}
} // end render method

const mapStateToProps = state => ({
    isLoading:state.Register.loading,
     error:state.Register.error
})

const styles = StyleSheet.create({


  rowone:
  {
     //backgroundColor: '#635DB7',
      flex:1,
      display:'flex',
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'flex-end',
  },
   coltwo:
  {

    flex:2,
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',

  },

  rowthree :
  {

    flex:1,
    display:'flex',
    marginLeft:10,
    marginRight:10,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'

  },
  form:
  {
    bottom:10,
    width:'80%',
    alignSelf:'center',
    marginLeft:10,
    marginRight:10,
  },
  input:
  {
    marginLeft:10,
    color:'#E5F8FF',
  },
  text:
  {
    color:'#E5F8FF'
  },
  textToSubmit:
  {
    fontWeight:'bold',
    fontSize:13,
    alignSelf:'center',
  },
  buttonToSubmit:
  {
    justifyContent:'center',
    backgroundColor:'#feda4b',
    width:'80%'
  }


});
export default connect(mapStateToProps, { RegisterUser } ) (RegisterForm); // this function connect component
                                                                    // with the store
