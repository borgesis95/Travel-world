import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation'


export default class AppFooter extends Component {

  constructor() //EDIT BORGESI
  {
    super();
    console.ignoredYellowBox = ['Setting a timer'];
  } // END EDIT


  render() {

    const navigate = this.props.navigate;
    const goBack = this.props.goBack;


    return (

        <Footer style={styles.wrapper}>
          <FooterTab style={{backgroundColor:'darkblue'}}>

            <Button vertical onPress={() => this.props.navigation.goBack()}  >
              <Icon name="md-arrow-round-back"  style={styles.icons} />
              <Text style={styles.text}>Back</Text>
            </Button>

            <Button vertical onPress={() => this.props.navigation.navigate('ProfileScreen')}  >
              <Icon name="ios-person" style={styles.icons} />
              <Text style={styles.text}>Profile</Text>
            </Button>

            <Button vertical onPress={() => this.props.navigation.navigate('homepage')}  >
              <Icon name="ios-home" style={styles.icons} />
              <Text style={styles.text}>Home</Text>
            </Button>


            <Button vertical onPress={() => this.props.navigation.navigate('tab1')  } >
              <Icon name="ios-add-circle" style={styles.icons} />
              <Text style={styles.text} >Add</Text>
            </Button>

            <Button vertical onPress={() => this.props.navigation.navigate('experienceCart')  } >
              <Icon name="ios-cart" style={styles.icons} />
              <Text style={styles.text}>Cart</Text>
            </Button>

          </FooterTab>
        </Footer>

    );
  }
}



const styles = StyleSheet.create({
  wrapper: {
    height: 45,
    backgroundColor: 'darkblue',
    justifyContent: 'center',
    //alignSelf: 'stretch',
    alignItems: 'center',
    shadowOffset: { height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2
  },
  text: {
    fontSize: 9,
    color:'white'
  },
  icons: {
    fontSize: 23,
    color:'white'
  }
});
