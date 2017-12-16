import React from 'react';
import  {StyleSheet ,Text, View ,StatusBar , Platform , ScrollView , AsyncStorage,AppState} from 'react-native';
 // import {Provider } from 'react-redux';// makes the redux store avaible with the connect  ;
  import appReducer from './reducers';  // appReducer is a file that combine all reducers and it's
  import { Provider } from 'react-redux';
  import { createStore, applyMiddleware } from 'redux'; // allow to use createStore
                                    // include all reducers
import {logger } from 'redux-logger'; //need to install
                                      // allow to know ( i think) what will be tne next state
import ReduxThunk from 'redux-thunk' ; // need to install
                                      // Redux Thunk middleware allows you to write action creators
                                      //that return a function instead of an action

import * as firebase from 'firebase';

import {StackNavigator,TabNavigator } from 'react-navigation'; // need to install
import LoginForm from './screens/LoginForm';
import RegisterForm from './screens/RegisterForm';
import myHome from './screens/myHome.js';

import FirstScreen from './screens/myHome.js';
import Activity from './screens/Activity.js';
import firstPage from './components/firstPage';
import thirdPage from './components/thirdPage';
import secondPage from './components/secondPage';
import ProfileScreen from './screens/ProfileScreen';
import ExperienceCart from './screens/ExperienceCart';
import forgotPassword from './screens/forgotPassword';
import firstPageAdd from './screens/firstPageAdd';
import AddExperience from './screens/AddExperience';
import CityScreen   from './screens/CityScreen.js'
import FiltersScreen   from './screens/FiltersScreen.js'



const initialState ={};
let store = createStore(appReducer,applyMiddleware(logger,ReduxThunk));

class App extends React.Component{

  constructor(){
       super();
       this.state ={isReady: false,
                    isStoreLoading: false,
                    store: store
       };
  }

 async componentWillMount(){
      await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),

    });

    this.setState({ isReady: true });

     var config = { // change this value
    apiKey: "AIzaSyDUamjc54156nXyLLQdI8PxFnnJh4rdqoA",
    authDomain: "todolist-firebase-87ae5.firebaseapp.com",
    databaseURL: "https://todolist-firebase-87ae5.firebaseio.com",
    projectId: "todolist-firebase-87ae5",
    storageBucket: "todolist-firebase-87ae5.appspot.com",
    messagingSenderId: "859404817701"
    };
    firebase.initializeApp(config);

    var self = this;
       AppState.addEventListener('change', this._handleAppStateChange.bind(this));
       this.setState({isStoreLoading: true});
       AsyncStorage.getItem('completeStore').then((value)=>{
         if(value && value.length){                                // se in getItem c'è lo store allora lo converto in JSON
           let initialStore = JSON.parse(value);
           self.setState({store: createStore(appReducer, initialStore, applyMiddleware(logger,ReduxThunk))});
         }
         else
         {
         self.setState({store: store});                           // altrimenti carico un un nuovo store .
         }
      self.setState({isStoreLoading: false});
      }).catch((error)=>{
       self.setState({store: store});
       self.setState({isStoreLoading: false});
       })

   }

   /*
     Prima di distruggere l'applicazione salva lo store con AsyncStorage
   */
   componentWillUnmount() {
   AppState.removeEventListener('change', this._handleAppStateChange.bind(this));
   }

   _handleAppStateChange(currentAppState) {
  //  alert("SALVA LO STORE");
    let storingValue = JSON.stringify(this.state.store.getState())
    AsyncStorage.setItem('completeStore', storingValue);
  }



// in React a middleware  is placed in the midlle between
// action and reducer for example asynchronus API ,logging ...
render(){
   if (!this.state.isReady)
   {
      return <Expo.AppLoading />;
    }
    /*const store = createStore(MainReducer,
                                   initialState,           // into intialState could be restore a previously user session
                                   applyMiddleware(logger,ReduxThunk)
                                   );
         */


  const ExperienceNavigator = StackNavigator({
    tab1: {screen:firstPage },
    tab2: {screen:secondPage},
    tab3: {screen:thirdPage},
  },
);


const MainNavigator = StackNavigator({


    // myhome andrà eliminato alla fine del test
     homepage : {screen: myHome},
     login: {screen: LoginForm},
     firstAdd: {screen:ExperienceNavigator},
     forgotPassword: {screen: forgotPassword},
     register: { screen:RegisterForm},
     experienceCart:{screen: ExperienceCart},
     CityScreen:  {screen: CityScreen},
     FiltersScreen:  {screen: FiltersScreen},
     Activity: {screen:Activity},
     tab1: {screen:firstPage },
     tab2: {screen:secondPage},
     tab3: {screen:thirdPage},
     ProfileScreen:  {screen: ProfileScreen },
});

const LoginNavigator = StackNavigator({
    login: {screen: LoginForm},
    homepage : {screen: myHome},
    firstAdd: {screen:ExperienceNavigator},
    forgotPassword: {screen: forgotPassword},
    register: { screen:RegisterForm},
    experienceCart:{screen: ExperienceCart},
    CityScreen:  {screen: CityScreen},
    FiltersScreen:  {screen: FiltersScreen},
    Activity: {screen:Activity},
    tab1: {screen:firstPage },
    tab2: {screen:secondPage},
    tab3: {screen:thirdPage},
    ProfileScreen:  {screen: ProfileScreen },
});


if(this.state.isStoreLoading==true){
                                       return <Text>Caricamento</Text>
                                     }else
                                  {  console.log("STORE",this.state.store);
                                      console.log("STORE TUTO",this.state.store.getState());
                                      console.log('VERO O FALSO',this.state.store.getState().auth.isLogged);
                                      if(this.state.store.getState().auth.isLogged)
                                      {
                                        return(
                                          <Provider store={this.state.store}>
                                             <View style={{flex:1}}>
                                                   <MainNavigator/>
                                             </View>
                                          </Provider>
                                        );
                                      }
                                      else {
                                        return (

                                          <Provider store={this.state.store}>
                                             <View style={{flex:1}}>
                                                   <LoginNavigator/>
                                             </View>
                                          </Provider>
                                        );
                                      }
                                     }


    }
}
export default App;
