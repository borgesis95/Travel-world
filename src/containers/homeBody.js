import React, { Component } from 'react';
import { AppRegistry, Text, Image, View, StyleSheet, TouchableWithoutFeedback, FlatList,TouchableOpacity, Dimensions  } from 'react-native';
import { Container, Header, Content, DeckSwiper ,Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';
import {citySelected} from '../actions/citySelected.js';
import {cityFetchStart,cityFetchSuccess,cityFetchFailed }    from '../actions/DBactions.js';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import { LinearGradient } from 'expo';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as firebaseApp from 'firebase';

/*
const cards = [
  {
    name: 'Catania',
    image: require('./Catania.jpg'),
  },
  {

    name: 'Milano',
    image: require('./Milano.jpg'),

  },
  {

    name: 'Roma',
    image: require('./Milano.jpg'),

  },

];

*/

let flagFetchCity = false;

class HomeBody extends Component {


  //Il metodo componentDidMount viene eseguito una volta sola per tutto il tempo di esecuzione ed è invocato all'apertura della pagina (quindi ritornando inedietro da una pagina successiva a questa pagina, la funzione non viene invocata nuovamente)
  async componentDidMount(){

     if(flagFetchCity == false){
       //Estrazione delle città da firebase . Snapshot è l'array di oggetti contententi i dettagli di ogni città
       this.props.actions.cityFetchStart();
       firebaseApp.database().ref(`/city`).once('value').
       then((snapshot)=> this.props.actions.cityFetchSuccess(snapshot.val())).
       catch(error=>this.props.actions.cityFetchFailed(error));



       flagFetchCity= true;
     }

  }


  render(){


    if(this.props.isLoading == false )
    {
      return(

          <Container>
            <LinearGradient  colors={['#56CCF2','#2F80ED']}    style={{ height:'100%' , width: '100%'}} >
               <FlatList
                  data={this.props.city}

                  keyExtractor={ (item) => { return item.name } }

                  renderItem={ ({item}) =>
                     <TouchableOpacity  activeOpacity={0.6}  onPress={() =>{ this.props.actions.citySelected(item); this.props.navigate('FiltersScreen');} }  >
                        <Card style={{ alignSelf: 'center', width:'98%',borderRadius: 5 }}>

                           <CardItem cardBody style={{borderRadius: 5 }} >
                              <Image style={{ height: 170, width: null, flex: 1,borderTopLeftRadius: 5,  borderTopRightRadius: 5 }} source={{uri: item.image}}  />
                           </CardItem>

                           <CardItem style={{ borderRadius: 5 }}>
                              <Text style={styles.paragraph} >{item.name}</Text>
                           </CardItem>

                       </Card>
                    </TouchableOpacity>
                  }
                />

             </LinearGradient>
          </Container>
        );

    }else  //Spinner
    {
      return(
        <View>
          <LinearGradient  colors={['#56CCF2','#2F80ED']}    style={{ height:'100%' , width: '100%',flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}} >
                <Text style= {{ fontSize: 18, fontWeight: 'bold', color: '#fafad2',  top: 5, backgroundColor:'transparent' }} > JUST A MOMENT... </Text>
                   <Bubbles size={10} color="#FFF" style={{backgroundColor:'transparent'}}/>
                <Text style= {{ fontSize: 16, fontWeight: 'bold', color: '#fafad2',  bottom: 5,backgroundColor:'transparent' }}>  LOADING CITY </Text>
            </LinearGradient>
        </View>

      );
    }





  }
}

function mapStateToProps(state){

  return{
    isLoading : state.FetchCity.loading,
    city : state.FetchCity.city,

  };
}

function mapDispatchToProps(dispatch){
    return {
      actions: {
        citySelected: bindActionCreators(citySelected, dispatch),
        cityFetchStart: bindActionCreators(cityFetchStart, dispatch),
        cityFetchSuccess: bindActionCreators(cityFetchSuccess, dispatch),
        cityFetchFailed: bindActionCreators(cityFetchFailed, dispatch),

    }
  };



}



const styles = StyleSheet.create({
  container: {

    //backgroundColor: 'dodgerblue',
    justifyContent: 'center',
    //alignSelf: 'stretch',
    alignItems: 'center',
    shadowOffset: { height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2,

    backgroundColor: '#ecf0f1',
  },
  paragraph: {

    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
});



export default connect(mapStateToProps,mapDispatchToProps)(HomeBody);
