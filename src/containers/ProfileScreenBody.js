
import React, { Component } from 'react';
import { AppRegistry, Text, Image, View, StyleSheet, TouchableWithoutFeedback, FlatList,TouchableOpacity ,KeyboardAvoidingView } from 'react-native';
import { Container, Header, Content, DeckSwiper ,Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right, Grid, Row,Col,Input,Item ,Spinner} from 'native-base';
import { LinearGradient, ImagePicker } from 'expo';
import { profileUpdateStart, profileUpdateSuccess, profileUpdateFailed, userFetchStart, userFetchSuccess, userFetchFailed,  }  from '../actions/ProfileActions.js';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as firebase from 'firebase';

//import Pick from '../components/picker.js';


class ProfileScreenBody extends Component {

  state = {name:"" , age: "", phone:"" }

  loadSpinner()
  {
    if(this.props.ProfileLoading)
    {
      return(
     <Spinner color='black' />
      );
    }

    else {
      return(   <Thumbnail large circle source={{uri: this.UserPhoto() }} style={{ width: 90, height: 90, borderRadius:50, }}/> );
    }

  }

  pickImage = async (uid,useCamera) => {

    console.log('in pick image')
    var pickerResult;

    if (useCamera == true)
    {
        pickerResult = await ImagePicker.launchCameraAsync({
                       allowsEditing: true,
                       quality: .8,
                       aspect: [3, 3],
                       base64: true
        });

    } else
    {
      pickerResult = await ImagePicker.launchImageLibraryAsync({
                     allowsEditing: true,
                     quality: .8,
                     aspect: [3, 3],
                     base64: true
      });

    }




    if (pickerResult.cancelled) return;

    let byteArray = this.convertToByteArray(pickerResult.base64);



    //estraggo il corrente utente
    const { currentUser } = firebase.auth();

    //Inizia upload photo

    var storageRef = firebase.storage().ref(`/images/${uid}`).child("photo.jpg");

    var uploadTask = storageRef.put(byteArray,  { contentType: 'image/jpg' }).          //inserisco l'immagine convertita in array di byte su firebase
    then(()=> storageRef.getDownloadURL().                                             //Se va bene estraggo url dove è posizionata la foto
                        then((url) => this.UpdatePhotoURL(this.props.uid,url) )                      //Se va bene passo url al metodo UpdatePhotoURL per aggiornare la foto
                        .catch(()  => alert("ERROR: photo not loaded"))               //Altrimenti se c'è un problema sull'estrazione dell'url

    )
    .catch(()=> alert("ERROR: photo not loaded"));                                   ////Altrimenti se c'è un problema sul caricamento della foto



  }//pickImage



  atob = (input) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    let str = input
      .replace(/=+$/, '')
      .replace(/^data:image\/‌​(png|jpg);base64,/, '‌​');
    let output = '';

    // if (str.length % 4 == 1) {   throw new Error("'atob' failed: The string to be
    // decoded is not correctly encoded."); }
    for (let bc = 0, bs = 0, buffer, i = 0; buffer = str.charAt(i++); ~buffer && (bs = bc % 4
      ? bs * 64 + buffer
      : buffer, bc++ % 4)
      ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6))
      : 0) {
      buffer = chars.indexOf(buffer);
    }

    return output;
  }

  convertToByteArray = (input) => {

    var binary_string = this.atob(input);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes
  }


//------------------------------------------------------------------------------------------------------------------------------------------------

UpdatePhotoURL(uid,downloadURL)
{


  const { currentUser } = firebase.auth();                                                                                      //estraggo il corrente utente

  firebase.database().ref(`/users/${uid}`)                                                                          //faccio riferimento alla tabella del corrente utente (UID) presente nella tabella users di firebase
   .set({ name: this.props.ProfileFetch.name ,  age: this.props.ProfileFetch.age , phone: this.props.ProfileFetch.phone , email: this.props.ProfileFetch.email, url: downloadURL  })      //modifico i dati
     .then(() =>{   //this.props.actions.profileUpdateSuccess(),                                                              //se le modifiche sono andate a buon fine, cambio lo stato dell'applicazione comunicandolo allo store attraverso action e successivamente reducer
                    this.ViewResults() ,alert("Edit Success!")                                                                  //Invoco ViewResults()  per estrapolare i nuovi dati e stamparli
      })
     .catch(error=>{alert(error) });

}

//------------------------------------------------------------------------------------------------------------------------------------------------

  //Metodo che si occupa di mostrare i dati aggiornati
  ViewResults()
  {
      const { currentUser } = firebase.auth();                                  //estraggo il corrente utente

      this.props.actions.userFetchStart();                                      //inizio estrazione dati utente
      firebase.database().ref(`/users`).once('value').                          //prelevo i datti dalla tabella/oggetto  user  in firebase
      then((snapshot)=> {                                                       //snaphot contiene tutti gli UID degli utenti

         var items;
         snapshot.forEach((child) => {                                          //scorro gli UID
           if( currentUser.uid ==  child.key){                                  //se UID del corrente utente è uguale allo UID esaminato nel database

            items= child.val();                                                 //allora copia tutti i dati (name,age,phone,email)  in items
           }

         });

         this.props.actions.userFetchSuccess(items)                             //passa items all'action in modo da restituire successivamente i dati aggiornati tramite reducer ProfileFetch
    }).
    catch(error=>this.props.actions.userFetchFailed(error));                    //se l'estrazione non è andata a buon fine ritorna errore


  }


  //Metodo che si occupa della modifica dei dati dopo che l'utente preme il button (Edit)
  async UpdateProfile(){
      this.props.actions.profileUpdateStart();                                                                                       //inizio le modifiche



      const { currentUser } = firebase.auth();                                                                                      //estraggo il corrente utente
      var user = {"name": this.state.name , "age": this.state.age, "phone": this.state.phone  , "email": this.props.userAuth};    //inizzializzo l'oggetto user con i dati dell'utente

      //se il reducer contiene un valore valido ed allo stesso tempo un parametro(es. name) non è  cambiato allora riusa lo stesso parametro prendendolo dal reducer
      if( this.props.ProfileFetch != null && this.props.ProfileFetch.name !="" && this.state.name =="") user.name=this.props.ProfileFetch.name;
      if( this.props.ProfileFetch != null && this.props.ProfileFetch.age !="" && this.state.age =="")   user.age=this.props.ProfileFetch.age;
      if( this.props.ProfileFetch != null && this.props.ProfileFetch.phone !="" && this.state.phone =="") user.phone=this.props.ProfileFetch.phone;

      firebase.database().ref(`/users/${currentUser.uid}`)                                                                          //faccio riferimento alla tabella del corrente utente (UID) presente nella tabella users di firebase
       .set({ name: user.name,  age: user.age , phone: user.phone, email: user.email, url: this.UserPhoto() })                                             //modifico i dati
         .then(() =>{   this.props.actions.profileUpdateSuccess(),                                                              //se le modifiche sono andate a buon fine, cambio lo stato dell'applicazione comunicandolo allo store attraverso action e successivamente reducer
                        this.ViewResults() ,alert("Edit Success!")                                                                  //Invoco ViewResults()  per estrapolare i nuovi dati e stamparli
          })
         .catch(error=>{this.props.actions.profileUpdateFailed(error) });                                   //Se la modifica non va a buon dine restituisco errore.
  }


  //Se i dati estratti dal firebase sono diversi da null e diversi dal parametro di default allora restituisci il valore che sarà stampato nel componente <Text>
  UserName()
  {
    if( this.props.ProfileFetch != null )
    {

      return this.props.ProfileFetch.name;
    }

  }

  UserAge()
  {
     if( this.props.ProfileFetch != null )
     {
        return this.props.ProfileFetch.age;
     }
  }

  UserPhone()
  {
     if( this.props.ProfileFetch != null )
     {

        return this.props.ProfileFetch.phone;
     }
  }

  UserPhoto()
  {
     if( this.props.ProfileFetch != null )  return this.props.ProfileFetch.url;
  }




  render() {

    const navigate = this.props.navigate;  //  passo la variabile this.props.navigate da myHome.js a alla variabile navigate di questa screen
   //successivamente attraverso tale variabile passo da una screen all'altra specificando in quale screen andare dopo aver clccato l'apposito text (es. navigate(login))



    return (

<Container>
<LinearGradient  colors={['#56CCF2','#2F80ED']}    style={{ height:'100%' , width: '100%'}} >
           <View style={{ flex:1, flexDirection:'column', justifyContent:'center',  alignItems: 'center',  backgroundColor:'black' }}>

              {this.loadSpinner()}

              <View style={{flexDirection:'row', justifyContent:'space-around', alignItems: 'center', width: 110,height: 50, backgroundColor:'transparent' }}>
                  <TouchableOpacity onPress={ ()=> this.pickImage(this.props.uid,true)  } style={{alignSelf: 'flex-end', bottom: 8, borderRadius: 5, backgroundColor: '#ecf0f1', justifyContent: 'center',alignItems: 'center', width:30,height: 30}}>
                      <Icon  name="md-camera"  style= {{  fontSize:18 }}/>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={ ()=> this.pickImage(this.props.uid,false)  } style={{alignSelf: 'flex-end', bottom: 8, borderRadius: 5, backgroundColor: '#ecf0f1', justifyContent: 'center',alignItems: 'center', width:30,height: 30}}>
                      <Icon  name="md-images"  style= {{  fontSize:18 }}/>
                  </TouchableOpacity>
              </View>

           </View>


           <View  style= {{flex:2, flexDirection:'column',justifyContent:'flex-start',alignItems:'center', marginTop:40}}>

                <Item >
                    <Text style={styles.paragraph}>Name:  </Text>
                    <Input maxLength={21}  placeholder={this.UserName()} onChangeText={(name)=>this.setState({name})}  placeholderTextColor='black' />
                    <Icon style={{marginTop:5, marginRight:5, fontSize: 18}} name="md-close" onPress={()=> alert("ok")} />
                </Item>

                <Item style={{top:5}}>
                     <Text style={styles.paragraph}>Age:     </Text>
                     <Input maxLength={3} placeholder={this.UserAge()} keyboardType={"numeric"} onChangeText={(age)=>this.setState({age})} placeholderTextColor='black' />
                     <Icon style={{marginTop:5, marginRight:5, fontSize: 18}} name="md-close" />
                </Item>

                <Item style={{top:5}}>
                    <Text style={styles.paragraph}>Phone: </Text>
                    <Input maxLength={10} placeholder={this.UserPhone()} keyboardType={"numeric"} onChangeText={(phone)=>this.setState({phone})} placeholderTextColor='black' />
                    <Icon style={{marginTop:5, marginRight:5, fontSize: 18}} name="md-close" />
                </Item>

          </View>

          <Button full ligh style={{backgroundColor: '#ecf0f1'}} onPress={() => this.UpdateProfile() } >
            <Text style={{fontSize: 16,fontWeight: 'bold', textAlign: 'center', color: 'black',}} >EDIT</Text>
          </Button>
</LinearGradient>
</Container>



    );
  }

}

function mapStateToProps(state){

  return{
     uid:state.auth.uid,
     userAuth:state.auth.user,
     ProfileFetch: state.ProfileFetch.profile,
     ProfileLoading: state.ProfileFetch.loading,


  };
}

function mapDispatchToProps(dispatch){
    return {
      actions: {
        profileUpdateStart: bindActionCreators(profileUpdateStart, dispatch),
        profileUpdateSuccess: bindActionCreators(profileUpdateSuccess, dispatch),
        profileUpdateFailed: bindActionCreators(profileUpdateFailed, dispatch),
        userFetchStart: bindActionCreators(userFetchStart, dispatch),
        userFetchSuccess: bindActionCreators(userFetchSuccess, dispatch),
        userFetchFailed: bindActionCreators(userFetchFailed, dispatch),

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
    marginLeft:10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    backgroundColor: 'transparent',
  },
});



export default connect(mapStateToProps,mapDispatchToProps)(ProfileScreenBody);
