
import React, { Component } from 'react';
import { AppRegistry, Text, Image, View, StyleSheet, TouchableWithoutFeedback, FlatList,TouchableOpacity ,KeyboardAvoidingView,Platform,Alert } from 'react-native';
import { Container, Header, Content, DeckSwiper ,Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right, Grid, Row,Col,Input,Item ,Spinner,List,ListItem,ActionSheet} from 'native-base';
import { LinearGradient, ImagePicker } from 'expo';
import { profileUpdateStart, profileUpdateSuccess, profileUpdateFailed, userFetchStart, userFetchSuccess, userFetchFailed,  }  from '../actions/ProfileActions.js';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as firebase from 'firebase';

//import Pick from '../components/picker.js';


class ProfileScreenBody extends Component {

  state = {
            name: "" ,
            age:  "" ,
            phone:"" ,
          }

  async componentWillMount()
  {

    if(Platform.OS === 'ios')
    {
      //  const { currentUser } = firebase.auth();                     //estraggo il corrente utente
         console.log("UID LOG did mount",this.props.uid);
       this.props.actions.userFetchStart();                         //inizio estrazione dati utente
       firebase.database().ref(`/users`).once('value').              //prelevo i datti dalla tabella/oggetto  user  in firebase
       then((snapshot)=> {                                          //snaphot contiene tutti gli UID degli utenti

         var items;
         snapshot.forEach((child) => {                             //scorro gli UID
           if( this.props.uid ==  child.key){                    //se UID del corrente utente è uguale allo UID esaminato nel database

               items= child.val();                                //allora copia tutti i dati (name,age,phone,email)  in items
           }

         });

         this.props.actions.userFetchSuccess(items)              //passa items all'action in modo da restituire successivamente i dati aggiornati tramite reducer ProfileFetch
       }).
       catch(error=>this.props.actions.userFetchFailed(error));  //se l'estrazione non è andata a buon fine ritorna errore
    }

    var name = this.props.ProfileFetch != null ? this.props.ProfileFetch.name : "" ;
    var age  = this.props.ProfileFetch != null ? this.props.ProfileFetch.age  : "" ;
    var phone= this.props.ProfileFetch != null ? this.props.ProfileFetch.phone: "" ;

    this.setState({name});
    this.setState({age});
    this.setState({phone});

  }

  loadSpinner()
  {
    if(this.props.ProfileLoading)
    {
      return(
        <Spinner />
      );
    }

    else {
      return( <Image style={{backgroundColor:'white',width:95,height: 95,borderRadius:10}} source={{uri: this.UserPhoto() }} /> );
    }

  }

  /*pickImage = async (uid,useCamera) => {

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



  }//pickImage */



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
                    this.ViewResults() ,
                    Alert.alert(
                      'Edit Success!',
                      "",
                      [
                        {text: 'Ok'},
                      ],
                      { cancelable: false }
                    );
                                                                //Invoco ViewResults()  per estrapolare i nuovi dati e stamparli
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
     if( this.props.ProfileFetch != null && this.props.ProfileFetch.url!="")  return this.props.ProfileFetch.url;
     else return "https://mir-s3-cdn-cf.behance.net/project_modules/disp/ce54bf11889067.562541ef7cde4.png";
  }


  picker = () =>{
    var BUTTONS = ["Camera","Gallery","Cancel"];
  var DESTRUCTIVE_INDEX = 2;
  var CANCEL_INDEX = 2;
  if ( this.actionSheet !== null )
  {
              // Call as you would ActionSheet.show(config, callback)
     this.actionSheet._root.showActionSheet({
       options: BUTTONS,
       cancelButtonIndex: CANCEL_INDEX,
       destructiveButtonIndex: DESTRUCTIVE_INDEX,
       title: "Select Image"
     },
    async buttonIndex => {
       //this.setState({ clicked: BUTTONS[buttonIndex] });
       var pickerResult;

       if(BUTTONS[buttonIndex] == "Camera")
       {

           pickerResult = await ImagePicker.launchCameraAsync({
                          allowsEditing: true,
                          quality: .8,
                          aspect: [3, 3],
                          base64: true
           });


       }else if(BUTTONS[buttonIndex] == "Gallery")
       {

           pickerResult = await ImagePicker.launchImageLibraryAsync({
                        allowsEditing: true,
                        quality: .8,
                        aspect: [3, 3],
                        base64: true
           });

       }else if(BUTTONS[buttonIndex] == "Cancel")
       {
          return;
       }  //END Select camera or gallery

       if (pickerResult.cancelled) return;

       let byteArray = this.convertToByteArray(pickerResult.base64);



       //estraggo il corrente utente
       const { currentUser } = firebase.auth();

       //Inizia upload photo

       var storageRef = firebase.storage().ref(`/images/${this.props.uid}`).child("photo.jpg");

       var uploadTask = storageRef.put(byteArray,  { contentType: 'image/jpg' }).          //inserisco l'immagine convertita in array di byte su firebase
       then(()=> storageRef.getDownloadURL().                                             //Se va bene estraggo url dove è posizionata la foto
                           then((url) => this.UpdatePhotoURL(this.props.uid,url) )                      //Se va bene passo url al metodo UpdatePhotoURL per aggiornare la foto
                           .catch(()  => alert("ERROR: photo not loaded"))               //Altrimenti se c'è un problema sull'estrazione dell'url

       )
       .catch(()=> alert("ERROR: photo not loaded"));                                   ////Altrimenti se c'è un problema sul caricamento della foto

     }, (i) => console.log(i));
  }

}


  modifyButton()
  {
    if(this.props.ProfileFetch != null && (this.state.name != this.props.ProfileFetch.name || this.state.age != this.props.ProfileFetch.age || this.state.phone != this.props.ProfileFetch.phone))
    {
      return(
        <TouchableOpacity style={{backgroundColor:'#5bb85c',height:40,justifyContent:'center' ,alignItems:'center'}} onPress={()=>this.UpdateProfile()}>
          <Text style={{color:'white',fontWeight:'bold'}}>EDIT</Text>
        </TouchableOpacity>
      )
    }
  }


  render() {

    const navigate = this.props.navigate;  //  passo la variabile this.props.navigate da myHome.js a alla variabile navigate di questa screen
   //successivamente attraverso tale variabile passo da una screen all'altra specificando in quale screen andare dopo aver clccato l'apposito text (es. navigate(login))



    return (



<Container>
<LinearGradient  colors={['#56CCF2','#2F80ED']}    style={{ height:'100%' , width: '100%'}} >
       <Content >


          <View style={{width:100,height:100,borderRadius:10, ...Platform.select({ ios: { marginTop:40, },android:{marginTop:30} }),backgroundColor:'white',alignSelf:'center',justifyContent:'center',alignItems:'center'}}>
            {this.loadSpinner()}
          </View>




           <List style={{backgroundColor:'white',marginTop: 30}}>
             <ListItem itemDivider >
               <Text style={{fontWeight:'bold', color:'black', opacity:0.75}} >Nome</Text>
             </ListItem>
             <Item regular style={{marginLeft:-1}}>
               <Input placeholder={this.UserName()}
                      onChangeText={(name)=>this.setState({name})}
                      style={{color:'black',marginLeft:10}}
               />
             </Item>

             <ListItem itemDivider >
               <Text style={{fontWeight:'bold', color:'black', opacity:0.75}}>Age</Text>
             </ListItem>
             <Item regular style={{marginLeft:-1}}>
               <Input placeholder={this.UserAge()}
                      onChangeText={(age)=>this.setState({age})}
                      style={{color:'black',marginLeft:10}}
                      keyboardType='numeric'
               />
             </Item>

             <ListItem itemDivider >
               <Text style={{fontWeight:'bold', color:'black', opacity:0.75}}>Phone</Text>
             </ListItem>
             <Item regular style={{marginLeft:-1}}>
               <Input placeholder={this.UserPhone()}
                      onChangeText={(phone)=>this.setState({phone})}
                      keyboardType='phone-pad'
                      style={{color:'black',marginLeft:10}}
               />
             </Item>
           </List>


           {this.modifyButton()}



         <View
            elevation={8}
            style={{position:'absolute',right:0,top:140,marginRight:24, backgroundColor:'white', borderRadius:20,width:40,height:40,justifyContent:'center',alignItems:'center',shadowColor: 'black',shadowOffset: { width: 0, height: 3 },shadowRadius: 5,shadowOpacity: 1.0,}}
          >
           <TouchableOpacity onPress={()=> this.picker()} >
              <Icon  name="md-create" />
           </TouchableOpacity>
          </View>

<ActionSheet ref={(c) => { this.actionSheet = c; }} />
       </Content>
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
