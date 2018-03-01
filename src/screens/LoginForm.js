
import React , {Component} from 'react';
import  {View , Text ,StyleSheet,Image,Dimensions,TouchableOpacity } from 'react-native';
import { Container, Header, Content, Form, Item, Input , Button ,Label,Body,Title,Icon,Left,Right,Card,CardItem,Thumbnail,Spinner } from 'native-base';
import {loginUser,loginWithFacebook } from '../actions/AuthActions';
import { connect } from 'react-redux';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {LinearGradient} from 'expo';
class LoginForm extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props)
  {
    super(props)
    this.state={
      email:"prova@gmail.com",
      password:"123456"
    }
  }

  loadSpinner()
  {
    if(this.props.isLoading)
    {
      return(
     <Spinner color='black' />
      );
    }

    else {
      return(   <Text style={styles.textToSubmit}>Sign in</Text> );
    }

  }


render()
{
const { navigate } = this.props.navigation;
return (
<Content style={{ flex:1 }} scrollEnabled={false}>
  <LinearGradient
           colors={['#2F80ED','#2F80ED']}  /*['#2b5876','#4e4376']*/
           style={{ height:'100%'}}
  >
  <Container>
      <Row  style={styles.firstRow}>
<<<<<<< HEAD
        <Image
          style={{width:180,height:180,marginTop:30,borderRadius:90}}
          source={require('../../assets/logo.png')}
          >
        </Image>
=======
        <View elevation={8} style={{width:180,height:180,marginTop:30, borderRadius:100,backgroundColor:'white',shadowColor: 'black',shadowOffset: { width: 0, height: 3 },shadowRadius: 5,shadowOpacity: 1.0,}}>
          <Image
            style={{width:180,height:180, borderRadius:100}}
            source={require('../../assets/logo.png')}
          />
        </View>
>>>>>>> bc8c38b311ccf27c56d97878e9ce16ea1067528e
      </Row>
      <Col style={styles.secondColumn}>
        <Form style={{right:5,}}>
          <Item   floatingLabel style={{width:'80%'}}>
            <Label style={{marginLeft:10,color:'white'}}> Username</Label>
            <Icon name="ios-person-outline" style={{color:'white'}} />
            <Input
              onChangeText={(email)=>this.setState({email})}
              style={{color:'white'}}
            />
          </Item>
          <Item   floatingLabel style={{width:'80%'}} >
            <Icon name="ios-key-outline" style={{color:'white'}} />
            <Label style ={{marginLeft:10,color:'white'}}> Password</Label>
            <Input
              style={{color:'white'}}
              secureTextEntry={true}
              onChangeText ={(password)=>this.setState({password})}
            />
          </Item>
        </Form>
      </Col>
      <Row style={styles.thirdRow}>
        <Button  rounded iconLeft light
          style={styles.buttonLogin}
          onPress={()=>
          this.props.loginUser({   // call with action a loginUser function
          // that allow you to access to firebaseDB
          email:this.state.email,
          password:this.state.password,
          navigateTo: (screen) => this.props.navigation.navigate(screen),
          navigation: this.props.navigation
          })}
          >
        {this.loadSpinner()}
        </Button>
      </Row>
      <Row style={styles.lastRow}>
        <TouchableOpacity onPress={()=>navigate('register')}>
          <Text style={styles.createAndForgot}> Create An Account </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigate('forgotPassword')}>
          <Text style={styles.createAndForgot}> Forgot a password?</Text>
        </TouchableOpacity>
      </Row>


</Container>
</LinearGradient>
</Content>
)
}
} // end render method
    const mapStateToProps = state => ({
    isLoading:state.auth.loading,
    error:state.auth.error,
    user:state.auth.user
    })
    const styles = StyleSheet.create({

    buttonLogin:
    {
      alignSelf:'center',
      width:'90%',
      backgroundColor:'#feda4b',
      display:'flex',
      flexDirection:'row',
      justifyContent:'center'
    } ,
    firstRow:
    {


      flex:1,
      justifyContent:'center',
      alignItems:'flex-start',
    },

    thirdRow:
    {

      flex:0.6,
      justifyContent:'center',
      alignItems:'flex-end'
    } ,


    secondColumn:
    {

      justifyContent:'center',
      flex:2,
      alignItems:'center',
    } ,

    buttonSignUp:
    {
      alignSelf:'center',width:'40%',
      backgroundColor:'#FF8C00',
      display:'flex',
      flexDirection:'row',
      justifyContent:'center',
      marginLeft:10,
    },
    lastRow:
    {


      flex:0.2,
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-around',
    },
    createAndForgot:
    {
      alignSelf:'flex-start',

      fontSize:15,
      color:'white',
    },

    textToSubmit:
    {
        fontWeight:'bold',
        fontSize:15,
        alignSelf:'center',
    }
    });
export default connect(mapStateToProps, { loginUser}) (LoginForm); // this function connect component
// with the store
