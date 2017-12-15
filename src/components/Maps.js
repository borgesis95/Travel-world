import React ,{Component} from 'react';
import {View,StyleSheet,Text} from 'react-native';
import {Col,Row,Grid} from 'react-native-easy-grid';
import { MapView } from 'expo';
import { Container, Header, Content, Form, Item, Input , Button
         ,Label,Body,Title,Icon,Left,Right,Card,CardItem,Thumbnail,Spinner } from 'native-base';
 import Geocoder from 'react-native-geocoding';
export default class Maps extends Component{
  constructor(props)
  {
    Geocoder.setApiKey('AIzaSyCf4lRPSJDMTEsV6CTGUbq5BXYcOi7pdnk');
    super(props)
    {
      this.state=
      {
        streetName:this.props.address,
        cap:this.props.cap,
        city:this.props.city,

        region:{
          load:false,
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },

      }
    }
  } // End Constructor,
  convertLocationInCoordinate(streetName,city,cap) // This function allow to convert the street name with parameters like
                                                  // city and cap in geographical coordinates
  {
    locationName=streetName+" ,"+city+""+cap;
    var that = this;
    var loc;
    loc = Geocoder.getFromLocation(locationName).then(
      json => {
                var location = json.results[0].geometry.location;
                this.setState(
                  {
                    region:
                    {

                      latitude:location.lat,
                      longitude:location.lng,
                      latitudeDelta:0.005,
                      longitudeDelta:0.005,
                        load:true,
                    }
           })
                  this.setState({latitude:location.lat});
                  this.setState({longitude:location.lng});
      },
                error =>{ alert("Non è possibile caricare la mappa")}
            );

  } // end function ;
printMaps()
{
  if(this.state.region.load)
  {
    return(

            <MapView
              style={styles.map}
              initialRegion={this.state.region}

            >
              <MapView.Marker
                 title='Roma'
                  coordinate={this.state.region}
                  pinColor={this.props.color}
                  image={this.props.iconMarker}
                  />

          </MapView>


          );
  } //---------end if
  else // if the map not still finished loading
  {
    return(
      <View>
            <Spinner></Spinner>
      </View>
          );
  }
}//----end function

componentDidMount()
{
  this.convertLocationInCoordinate(this.props.address,this.props.city,this.props.cap);
}
  render()
  {
    return(
      <View style={{borderRadius:10,flex:1.65}}>
          {this.printMaps()}
      </View>
    );//end return
  }//end render
}//end Component
const styles = StyleSheet.create({
  map:
  {
    borderRadius:10,
    alignSelf:'center',
    width:'99%',
    height:280,

  }

});//end Stylesheet
