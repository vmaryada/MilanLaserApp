import React, {useContext, useState, useEffect} from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
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
  useStatusBar('dark-content');
  const {logout} = useContext(AuthContext);
  return (
    <View style={styles.container}>
    <Title style={styles.titleText}>Hello, you are now logged in.</Title>
    <FormButton modeValue='contained' contentStyle={styles.buttonContent} style={styles.homeScreenButtons}
     onPress={()=>{navigation.navigate('QuoteCalculator')}} title='Quote Calculator'/>
    <FormButton modeValue='contained' contentStyle={styles.buttonContent} style={styles.homeScreenButtons}
    onPress={()=>{navigation.navigate('CommissionCalculator')}} title='Commission Calculator'/>
    <FormButton modeValue='contained' contentStyle={styles.buttonContent} style={styles.homeScreenButtons}
    onPress={()=>{navigation.navigate('StoreRankCalculator')}} title='Store Rank Calculator' />
    <FormButton modeValue='contained' contentStyle={styles.buttonContent} style={styles.homeScreenButtons}
    onPress={()=>{navigation.navigate('LeadScreen')}} title='Create A Lead' />
    <FormButton modeValue='contained' contentStyle={styles.buttonContent} style={styles.homeScreenButtons}
    onPress={()=>{navigation.navigate('HelpDeskTicketScreen')}} title='Create A Help Desk Ticket' />
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
     minWidth:240,
     backgroundColor: '#01718f' 
  },
  titleText: {
      fontSize: 20,
      marginBottom: 25
  }
});