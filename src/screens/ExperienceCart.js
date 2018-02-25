import React , {Component} from 'react';
import {View , StyleSheet, Image,Text,  ScrollView,Dimensions,Platform}  from 'react-native';
import {Col,Row,Grid} from 'react-native-easy-grid';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo';
import CardDetail from '../components/CardDetail.js';
import {fetchActivityCart} from '../actions/fetchActivityCartActions';
import { Container, Header, Content, Form, Item, Input , Button
   ,Label,Body,Title,Icon,Left,Right,Card,CardItem,Thumbnail,Spinner,Drawer } from 'native-base';
import AppHeader from '../components/appHeader.js';
import HomeBody  from '../containers/homeBody.js';
import AppFooter from '../components/appFooter.js';
import Sidebar from '../containers/sidebar.js';
import { NavigationActions } from 'react-navigation';
import {currentScreen} from '../actions/currentScreen.js';

class ExperienceCart extends Component{
   constructor(props)
   {
     super(props)
     this.state =
     {
       arr:[],
     }

   }
  static navigationOptions = {
    header: null,
    tabBarLabel:'Cart',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-cart" style={{fontSize:26,color: tintColor }}/>
    ),
  };

  componentDidMount()   // when the component is rendered call the fetchActivityCart to take object from database.
  {
        this.props.fetchActivityCart();
        this.props.currentScreen("ExperienceCart");
  }


  render()
  {
  const { navigate, goBack } = this.props.navigation;



      if(Platform.OS === 'ios')
      {
        /*<AppFooter  navigate={navigate} goBack= {goBack} />*/
        if(this.props.load)
        {
          return(

            <Container style= {{ width: Dimensions.get('window').width , height: Dimensions.get('window').height}}>

                <AppHeader
                   navigate={navigate}
                />

                <Content>
                  <LinearGradient
                    colors={['#56CCF2','#2F80ED']}
                    style={{ height:'100%'}}
                  >
                    {
                      this.props.obj.map((item,index)=>
                      {
                        return(
                          <CardDetail
                            key={index}
                            keyNumber={item.ActivityKey}
                            nameActivity={item.nameActivity}
                            data={item.dateActivity}
                            type={item.type}
                          />
                        );
                      }) // end map
                    }
                  </LinearGradient>
                </Content>



            </Container>

          );
        }// end if
        else
        {
          return(
            <Container>
                <Spinner></Spinner>
            </Container>
          );
        }

      }else
      {
        if(this.props.load)
        {
          return(

            <Container style= {{ width: Dimensions.get('window').width , height: Dimensions.get('window').height}}>

                <AppHeader navigate={navigate}/>

                <Content>
                  <LinearGradient
                    colors={['#56CCF2','#2F80ED']}
                    style={{ height:'100%'}}
                  >
                    {
                      this.props.obj.map((item,index)=>
                      {
                        return(
                          <CardDetail
                            key={index}
                            keyNumber={item.ActivityKey}
                            nameActivity={item.nameActivity}
                            data={item.dateActivity}
                            type={item.type}
                          />
                        );
                      }) // end map
                    }
                  </LinearGradient>
                </Content>

            </Container>

          );
        }// end if
        else
        {
          return(
            <Container>
                <Spinner></Spinner>
            </Container>
          );
        }
      }





  }//end render
} // End Component

mapStateToProps = state => (
  {
    load:state.ActivityCart.isLoading,
    user:state.auth.user,
    obj:state.ActivityCart.activityObject,
  }
)


const styles = StyleSheet.create({
  statusBar:
  {
    height:28,
    backgroundColor:'red',
    top:28,
  }
});

export default connect(mapStateToProps,{fetchActivityCart,currentScreen})(ExperienceCart);
