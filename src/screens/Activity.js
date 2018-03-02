import React , {Component} from 'react';
import {View , StyleSheet, Image,Text,MapView,ScrollView}  from 'react-native';
import {Col,Row,Grid} from 'react-native-easy-grid';
import Maps from '../components/Maps.js';
import DescriptionsActivity from '../components/descriptionsActivity.js';
import firebase from 'firebase';
import { connect } from 'react-redux';
import {addInYourCart} from '../actions/ActivityActions';
import { LinearGradient } from 'expo';
import { Container, Header, Content, Form, Item, Input , Button
         ,Label,Body,Title,Icon,Left,Right,Card,CardItem,Thumbnail,Spinner } from 'native-base';

  class Activity extends Component {


  static navigationOptions = {
    header: null
  };
  constructor(props)
  {
    super(props);
     this.state=
     {
       key:"",
       items:"",
       userAdvert:"",

     }
  }
  async componentDidMount()
  {
     const {state} = this.props.navigation; // Con questo mi faccio passare la chiave dell'oggetto che l'utente ha scelto.
     const activityKey = state.params.key;
     // alert(state.params.key);
     var that = this;

     activityData = firebase.database().ref('/cityexperience'); // con reference recupero una specifico path del database
                                                                            // che mi permette di scrivere/leggere all'interno di
                                                                           // esso. parametro->(child/path);
    informationUser= firebase.database().ref('/users');
    activityData.once('value').then(function(data)
    {
        item = data.child(activityKey).val(); // ritorna un oggetto con tutti i parametri da passare.

      //  console.log("OGGETTO DATI",item);
        that.setState({items:item});
        that.setState({key:activityKey});

        keyAdvertiser = item.user;
        console.log("CHIAVE UTENTE",item.user);

        informationUser.once('value').then(function(data)
        {

           userAdvertiser = data.child(keyAdvertiser).val();
           console.log("DATI INSERZIONISTA",userAdvertiser);
           that.setState({userAdvert:userAdvertiser});

        }); // end annidate then

    });// end then function;

  }// End componentDidMount;
render()
  {
    const { navigate } = this.props.navigation;
    
if(this.state.items!="")
{

return(
<LinearGradient  colors={['#56CCF2','#2F80ED']}    style={{ height:'100%' , width: '100%'}} >
<Container>

    <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }} scrollEnabled={true}>
       <Maps
         address={this.state.items.address}
         city={this.state.items.city}
         cap={this.state.items.cap}
         color='red'
         >
      </Maps>
      <DescriptionsActivity
        phoneNumber={this.state.userAdvert.phone}
        experience={this.state.items.name}
        number={this.state.items.members}
        address={this.state.items.address}
        email={this.state.userAdvert.email}
        date= {this.state.items.date}
        description={this.state.items.experience}
      />
    <Row style={{flex:0.4,justifyContent:'center'}}>
        <Button
          large style={styles.button}
          onPress=
          {(screen)=>this.props.addInYourCart(this.props.uid,this.state.items.typexp,this.state.items.name,this.state.items.date,this.state.key,this.state.items.user,this.props.navigation.navigate,this.state.items.members)}
          >
          <Label style={{color:'black',alignSelf:'center',fontWeight:'bold'}}> Add in your cart </Label>
        </Button>
    </Row>


   </Content>
 </Container>
</LinearGradient>
      ) ;//end Return
}//end if
else {
  return(
    <Spinner/>
  );
}
  }//End Render
} // End Component;

const styles=StyleSheet.create({

button:
      {
        borderRadius:15,
        marginBottom:10,
        backgroundColor:'#feda4b',
        width:'98%',

        flexDirection:'row',
        justifyContent:'center',
      }

});//end stylehseet

const mapStateToProps = state => ({
  uid:state.auth.uid
})

  export default connect(mapStateToProps,{addInYourCart})(Activity);
