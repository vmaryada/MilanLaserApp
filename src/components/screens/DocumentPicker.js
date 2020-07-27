import React, { Fragment, useState, useEffect } from 'react'
import { View, StyleSheet,Image, Platform, Text, FlatList, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import { TextInput, Divider, IconButton } from 'react-native-paper';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import AreaButton from '../util/AreaButton';
import {CommonActions} from '@react-navigation/native';
//import console = require('console');
function ImagePickerScreen ({route,navigation}){
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [showChosenPic, setShowChosenPic] = useState(false);
    const [chosenPicUri, setChosenPicUri] = useState(null);
    let camera;
//let photo = {};
  /*  useEffect(() => {
        (async () => {
          const { status } = await Camera.requestPermissionsAsync();
          setHasPermission(status === 'granted');

         if(Platform.OS === 'ios'){
             const{cameraRollStatus} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
         }
        })();
      }, []); */

  useEffect(()=>{
pickFile();
  },[])    
  /*  const handleCameraSwitch= ()=>{
        type === Camera.Constants.Type.back ? setType(Camera.Constants.Type.front) : setType(Camera.Constants.Type.back)
    }
 const takePicture = async()=>{
    if(camera){
        let photo = await camera.takePictureAsync();
        console.log(photo);
        setChosenPicUri(photo.uri);
        setShowChosenPic(true);
    }
} */
const handleChosenPic=()=>{

}
const pickFile = async () => {
    let result = await DocumentPicker.getDocumentAsync();
    navigation.dispatch(CommonActions.setParams({}));
  (result.uri !== undefined && result.uri !== null) ? navigation.navigate('HelpDeskTicketScreen', {file: {uri: result.uri, name:result.name}}) : navigation.goBack()
  }
    return(
       <View>

       </View>
        
          
        
    )
}

export default ImagePickerScreen