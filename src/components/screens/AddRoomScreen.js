import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { IconButton, Title } from 'react-native-paper';
import FormInput from '../util/FormInput';
import FormButton from '../util/FormButton';
import {db} from '../../../App.js';
//import useStatusBar from '../utils/useStatusBar.js';
//const admin = require('firebase-admin');
//fs = require('react-native-fs')
//import firestore from '@react-native-firebase/firestore';
function AddRoomScreen({navigation}) {
 // useStatusBar('dark-content');
    const [roomName, setRoomName] = useState('');
    const handleButtonPress = () => {
      db.collection('THREADS').add({name: roomName, latestMessage: {text: `you joined ${roomName}`, createdAt: new Date().getTime()}})
      .then((docRef)=>{
    docRef.collection('MESSAGES').add({text: `You joined ${roomName}`, createdAt: new Date().getTime(), system: true})    
    navigation.navigate('Home');
 })
}
    return (
        <View style={styles.rootContainer}>
        <View style={styles.closeButtonContainer}>
          <IconButton  icon='close-circle' size={36} color='#6646ee' onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.innerContainer}>
          <Title style={styles.title}>Create a new chat room</Title>
<FormInput labelName='Room Name' value={roomName} onChangeText={(text) => setRoomName(text)} clearButtonMode='while-editing'
          />
<FormButton title='Create' modeValue='contained' labelStyle={styles.buttonLabel} onPress={() => handleButtonPress()}
 disabled={roomName.length === 0} />
        </View>
      </View>
    )
}
const styles = StyleSheet.create({
    rootContainer: {
      flex: 1,
    },
    closeButtonContainer: {
      position: 'absolute',
      top: 30,
      right: 0,
      zIndex: 1,
    },
    innerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      marginBottom: 10,
    },
    buttonLabel: {
      fontSize: 22,
    },
  });
export default AddRoomScreen
