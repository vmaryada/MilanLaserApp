import React, { Fragment, useState, useEffect } from 'react'
import { View, StyleSheet,Image, Platform, Text, FlatList, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import { TextInput, Divider, IconButton } from 'react-native-paper';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AreaButton from '../util/AreaButton';
//import console = require('console');
function ImagePickerScreen ({route,navigation}){
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [showChosenPic, setShowChosenPic] = useState(false);
    const [chosenPicUri, setChosenPicUri] = useState(null);
    let camera;
//let photo = {};
    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestPermissionsAsync();
          setHasPermission(status === 'granted');

         if(Platform.OS === 'ios'){
             const{cameraRollStatus} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
         }
        })();
      }, []);

  useEffect(()=>{
pickImage();
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
navigation.navigate('HelpDeskTicketScreen', {uri: chosenPicUri})
}
const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    setChosenPicUri(result.uri);
    setShowChosenPic(true);
  }
    return(
        
            
             (hasPermission === null) ?  <View /> : hasPermission === false ? <Text>No access to camera</Text>  : <View style={{ flex: 1 }}>
  {!showChosenPic ? 
             <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:20}}></View>
  : <View style={{alignItems:'center', marginTop:35}}>
    <Image style={{width:'80%', height: '80%'}} source={{uri:chosenPicUri}}/>
<View style={{marginTop:15, flexDirection:'row'}}>
<AreaButton title='Cancel' onPress={()=>{setChosenPicUri(null), setShowChosenPic(false)}}>
</AreaButton><AreaButton title='Choose' onPress={handleChosenPic}></AreaButton></View>
  </View> }
        </View>
        
          
        
    )
}

export default ImagePickerScreen