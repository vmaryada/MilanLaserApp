import React, { Fragment, useState, useEffect } from 'react'
import { View, StyleSheet, Image, Platform, Text, FlatList, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
//import { TextInput, Divider, IconButton } from 'react-native-paper';
//import { Camera } from 'expo-camera';
//import * as Permissions from 'expo-permissions';
//import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
//import * as ImagePicker from 'expo-image-picker';
import AreaButton from '../util/AreaButton';
import { Divider } from 'react-native-paper';
//import console = require('console');
//import {CommonActions} from '@react-navigation/native';
//import console = require('console');
function QuotePrint({navigation}) {
// console.log(route.params.screenShot);
 // const [showChosenPic, setShowChosenPic] = useState(true);
  //const [chosenPicUri, setChosenPicUri] = useState(route.params.screenShot);

  return (
    <ScrollView contentContainerStyle={{justifyContent:'center', flex:1}}>
        <View style={{ alignItems: 'center', marginHorizontal:25}}>
        <Text style={{fontSize:24, color:'green'}}>Quote has been saved to Camera Roll. Please go to Camera Roll to print the Quote.</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'center'}}>
        <AreaButton title="Go Back to Quote" onPress={()=>{navigation.goBack()}}/>
        <AreaButton title="Go Home" onPress={()=>{navigation.navigate('Home')}}/>
        </View>
        </ScrollView>
       

  )
}

export default QuotePrint