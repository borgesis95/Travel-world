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
    header: null
  };

  componentDidMount()   // when the component is rendered call the fetchActivityCart to take object from database.
  {
        this.props.fetchActivityCart();
  }
  closeDrawer = () => {
    this.drawer._root.close();          //eseguo la chiusura
  };

    //Funzione che si occupa dell'apertura della sidebar e di aggiornare il suo stato (aperta)
  openDrawer = () => {
    this.drawer._root.open();          //eseguo l'apertura
  };

  //Reset main route with login solo se il logout invocato nella sidebar va a buon fine
  func = () =>{
    //Imposto come pagina principale login  in modo che una volta effettuato il logout non è possibile tornare indietro senza permessi
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'login'})
      ]
    });

    //Dispatch del'action
    this.props.navigation.dispatch(resetAction);
  }
  render()
  {
  const { navigate, goBack } = this.props.navigation;
  if(this.props.load)
  {
    return(


<Container>
  <Drawer
     ref={(ref) => { this.drawer = ref; } }
     content={ <Sidebar navigate={navigate} reset={()=> this.func()} /> }
     onClose={() =>{ this.closeDrawer() } /* alla chiusura della sidebar, invoco closeDrawer*/}
     onOpen={() =>{  this.openDrawer() }  /* all'apertura della sidebar, invoco closeDrawer*/}
   >

    <AppHeader
       openDrawer= { () => this.openDrawer()   /* Passo la funzione openDrawer()  al componente  AppHeader del file appHeader.js*/  }
       closeDrawer={ () => this.closeDrawer()  /* Passo la funzione closeDrawer()  al componente  AppHeader del file appHeader.js*/ }
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
    </Drawer>
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

export default connect(mapStateToProps,{fetchActivityCart})(ExperienceCart);
