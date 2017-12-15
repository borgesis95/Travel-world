import React, { Component } from 'react';
import { AppRegistry, Text, Image, View, StyleSheet, TouchableWithoutFeedback, FlatList,TouchableOpacity  } from 'react-native';
import { Container, Header, Content, DeckSwiper ,Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right,Spinner } from 'native-base';
import {experienceFetchStart,experienceFetchSuccess,experienceFetchFailed}    from '../actions/DBactions.js';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import { LinearGradient } from 'expo';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as firebaseApp from 'firebase';



class CityScreenBody extends Component {



  async componentDidMount(){

       //Estrazione delle esperienze da firebase. Snapshot è l'array di oggetti contentente tutti i dettagli delle esperienze
        this.props.actions.experienceFetchStart();
      //  mycity=this.props.city.
        firebaseApp.database().ref(`/cityexperience`).once('value').
        then((snapshot) => {
        var items = [];
        snapshot.forEach((child) => {                                          //Scorriamo ogni esperienza
          if(this.props.city.name.toLowerCase() ==  child.val().city  &&  this.props.typeExperience == child.val().typexp ){       //Se la città della corrente esperienza è uguale alla città selezionata nella home dall'utente

              items.push({                                                    //inserisci tutti i suoi dettagli in un oggetto che a sua volta sarà inserito in un cassetto dell'array items
                val: child.val(),                                             //oggetto contentente i campi(cap,city,date,name) a cui è possibile accedere (per esempio al nome della città ) mediante items[i].val.city
                key: child.key                                               //identidicatore esperienza
              });
          }

        });
        this.props.actions.experienceFetchSuccess(items)
      }).
        catch(error=>this.props.actions.experienceFetchFailed(error));



    }



  dateNumberToMonth = (x) => {
    var month = new Array();
    month[1] = "JAN";
    month[2] = "FEB";
    month[3] = "MAR";
    month[4] = "APR";
    month[5] = "MAY";
    month[6] = "JUNE";
    month[7] = "JULY";
    month[8] = "AUG";
    month[9] = "SEPT";
    month[10] = "OCT";
    month[11] = "NOV";
    month[12] = "DEC";
    var n = month[x];

        return n;
  };



  render(){

    const {navigate}  = this.props.navigate;

    const colorCard = 'transparent';

    if(this.props.isLoading == false )
    {
      if(this.props.experience.length == 0  )
      {
           return(
              <LinearGradient  colors={['#56CCF2','#2F80ED']}    style={{ height:'100%' , width: '100%'}} >
                <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white', alignSelf: 'center', backgroundColor: 'transparent' }}> NOT EXPERIENCE FOUND! </Text>
              </LinearGradient>
           );

      }else{
        return(

           <Container>
            <LinearGradient  colors={['#56CCF2','#2F80ED']}    style={{ height:'100%' , width: '100%'}} >

              <FlatList
                data={this.props.experience}

                keyExtractor={ (item) => { return item.key } }

                renderItem={ ({item}) =>

                  <TouchableOpacity activeOpacity={0.8}  onPress={() =>{ this.props.navigate('Activity',{key:item.key});} }>
                    <Card>
                      <LinearGradient  colors={['#dde9f4','#9bbed4']}    style={{ height:'100%' , width: '100%', flexDirection: 'row'}} >

                          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                             <Image   source={require('../../assets/calendar.png')} style={{  width:70 ,height: 65, marginRight: 20}} >
                                 <CardItem style={{ height: 60, backgroundColor: 'transparent', flexDirection: 'column' , justifyContent: 'space-around' }}>

                                     <Text style= {{ fontSize: 14, fontWeight: 'bold', color: 'white', bottom: 10, backgroundColor: 'transparent' }}> {this.dateNumberToMonth(item.val.date.substring(3, 5))} </Text>
                                     <Text style= {{ fontSize: 20, fontWeight: 'bold', color: 'black', backgroundColor: 'transparent'}} > {item.val.date.substring(0, 2)} </Text>
                                 </CardItem>
                             </Image>

                          </View>



                          <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'  }}>

                             <View style={{ flexDirection: 'column', justifyContent: 'space-around',  height: 100, flex:1}} >

                                  <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black', backgroundColor:'transparent'}} > {item.val.name} </Text>
                                  <Text style={{fontSize: 15,  color: 'black', backgroundColor: 'transparent'}}>{item.val.address} n° {item.val.number}, {item.val.cap}</Text>

                                  <View style={{height: 20, width: 55,flexDirection: 'row', justifyContent: 'space-around' }}>
                                      <Icon style={{ fontSize: 20, backgroundColor: 'transparent'}}  name="md-people" />
                                      <Text style={{ fontSize: 14,  color: 'black', right: 5, backgroundColor: 'transparent' }}> {item.val.members} </Text>
                                  </View>

                             </View>

                          </View>


                      </LinearGradient>
                    </Card>
                  </TouchableOpacity>


                }
              />

            </LinearGradient>
           </Container>

        );
      }
    }else{ //LOADED

      return(
        <View>
            <LinearGradient  colors={['#56CCF2','#2F80ED']}    style={{ height:'100%' , width: '100%', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}} >
                <Text style= {{ fontSize: 18, fontWeight: 'bold', color: '#fafad2', top: 5 , backgroundColor: 'transparent'}} > JUST A MOMENT... </Text>
                   <Bubbles size={10} color="#FFF" />
                <Text style= {{ fontSize: 16, fontWeight: 'bold', color: '#fafad2', bottom: 5,backgroundColor: 'transparent' }}>  LOADING EXPERIENCES FOR THIS CITY </Text>
            </LinearGradient>
        </View>

      );
    }

  }
}

function mapStateToProps(state){

  return{
     city :      state.ActiveCity,
     typeExperience: state.ActiveTypeExperience,
     isLoading : state.FetchExperience.loading,
     experience: state.FetchExperience.experience

  };
}

function mapDispatchToProps(dispatch){
    return{
      actions: {
        experienceFetchStart: bindActionCreators(experienceFetchStart, dispatch),
        experienceFetchSuccess: bindActionCreators(experienceFetchSuccess, dispatch),
        experienceFetchFailed: bindActionCreators(experienceFetchFailed, dispatch),

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



export default connect(mapStateToProps,mapDispatchToProps)(CityScreenBody);
