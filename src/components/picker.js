//DA CANCELLARE


import React from 'react';
import { Button, Image, View } from 'react-native';
import { ImagePicker } from 'expo';
import * as firebase from 'firebase';


export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }

  _pickImage = async (useCamera) => {

    console.log('in pick image')
    var pickerResult

    if (!useCamera) {
      pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: .8,
        aspect: [4, 3],
        base64: true
      });
    } else {
      pickerResult = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, quality: .8, aspect: [4, 3], base64: true });
    }

    if (pickerResult.cancelled)
      return;

    let byteArray = this.convertToByteArray(pickerResult.base64);

    var uploadTask = firebase.storage().ref('/images/photo.jpg').put(byteArray);



// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', function(snapshot){
  // Observe state change events such as progress, pause, and resume
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
  switch (snapshot.state) {
    case firebase.storage.TaskState.PAUSED: // or 'paused'
      console.log('Upload is paused');
      break;
    case firebase.storage.TaskState.RUNNING: // or 'running'
      console.log('Upload is running');
      break;
  }
}, function(error) {
  // Handle unsuccessful uploads
}, function() {
  // Handle successful uploads on complete
  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  var downloadURL = uploadTask.snapshot.downloadURL;

  const { currentUser } = firebase.auth();                                                                                      //estraggo il corrente utente

  firebase.database().ref(`/users/${currentUser.uid}`)                                                                          //faccio riferimento alla tabella del corrente utente (UID) presente nella tabella users di firebase
   .set({ url: downloadURL })                                             //modifico i dati
     .then(() =>{   alert("Edit Success! " + downloadURL)                                                                  //Invoco ViewResults()  per estrapolare i nuovi dati e stamparli
      })
     .catch(error=>{  alert("Edit Error!") });
});



  }

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

  };
