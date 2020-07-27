import React, {useContext, useState, useEffect} from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { Title, List, Divider, Text, IconButton } from 'react-native-paper';
import FormButton from '../../components/util/FormButton';
import {AuthContext} from '../../navigation/AuthProvider.js';
//import { Title } from 'react-native-paper';
//import {db} from '../../../App';
import Loading from '../util/Loading';
import useStatusBar from '../util/useStatusBar.js';
//import { navigate } from '@react-navigation/routers/lib/typescript/src/CommonActions';
//import console = require('console');
export default function HomeScreen({navigation}) {
  const [connectedColor, setConnectedColor] = useState('red');
  const [offlineMode, setOfflineMode] = useState(false);
  useEffect(()=>{
    NetInfo.fetch().then(state => {
      console.log('Connection type', state.type);
      state.isConnected? setConnectedColor('green')&&setOfflineMode(false) : setConnectedColor('red')&&setOfflineMode(true);
    });
  }, [])
  
  useStatusBar('dark-content');
  const {logout} = useContext(AuthContext);
  return (
    <View style={styles.container}>
   {offlineMode?<Text style={{color:'red'}}>Device is not connected to the internet. Some of the features are disabled.</Text>:null}
    <Text style={{fontSize: 65, color:connectedColor, position:'absolute', top:-80, right:22}}>.</Text>
    <Title style={styles.titleText}>Hello, you are now logged in.</Title>
    <FormButton modeValue='contained' contentStyle={styles.buttonContent} style={styles.homeScreenButtons}
     onPress={()=>{navigation.navigate('QuoteCalculator')}} title='Quote Calculator' disabled={offlineMode}/>
    <FormButton modeValue='contained' contentStyle={styles.buttonContent} style={styles.homeScreenButtons}
    onPress={()=>{navigation.navigate('CommissionCalculator')}} title='Commission Calculator'/>
    <FormButton modeValue='contained' contentStyle={styles.buttonContent} style={styles.homeScreenButtons}
    onPress={()=>{navigation.navigate('StoreRankCalculator')}} title='Store Rank Calculator' />
    <FormButton modeValue='contained' contentStyle={styles.buttonContent} style={styles.homeScreenButtons}
    onPress={()=>{navigation.navigate('LeadScreen')}} title='Create A Lead'  disabled={offlineMode}/>
    <FormButton modeValue='contained' contentStyle={styles.buttonContent} style={styles.homeScreenButtons}
    onPress={()=>{navigation.navigate('HelpDeskTicketScreen')}} title='Create A Help Desk Ticket'  disabled={offlineMode}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
   // justifyContent: 'center',
    alignItems: 'center',
    marginTop:35
  },
  listTitle: {
    fontSize: 22,
  },
  listDescription: {
    fontSize: 16,
  },
  homeScreenButtons: {
      marginBottom: 15,
     
  },
  buttonContent: {
     minWidth:290,
     backgroundColor: '#01718f',
     paddingHorizontal:15,
     paddingVertical:5 
  },
  titleText: {
      fontSize: 20,
      marginBottom: 25
  }
});