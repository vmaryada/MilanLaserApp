import React, { useContext, useState, useEffect, Fragment, useCallback } from 'react';
import { View, ScrollView, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { Title, Button, List, Divider, Text, IconButton } from 'react-native-paper';
import FormButton from '../../components/util/FormButton';
import { AuthContext } from '../../navigation/AuthProvider.js';
//import { Title } from 'react-native-paper';
import { db } from '../util/db.js';
import Loading from '../util/Loading';
import useStatusBar from '../util/useStatusBar.js';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';
import * as Analytics from 'expo-firebase-analytics'; 
//import console = require('console');
//import { navigate } from '@react-navigation/routers/lib/typescript/src/CommonActions';
//import console = require('console');
export default function HomeScreen({ navigation }) {
  const [connectedColor, setConnectedColor] = useState('red');
  const [offlineMode, setOfflineMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allyAppLink, setAllyAppLink] = useState('');
  const [allyPortalLink, setAllyPortalLink] = useState('');
  const [presentationLink, setPresentationLink] = useState('');

  const _onOrientationDidChange = (orientation) => {
    if (orientation == 'LANDSCAPE' || orientation == 'LANDSCAPE_LEFT' || orientation === 'LANDSCAPE_RIGHT') {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  };
  
  useFocusEffect(
    useCallback(() => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      return () => { }
    }, [navigation])
  );
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    ScreenOrientation.addOrientationChangeListener(_onOrientationDidChange)

  }, [])


  useEffect(() => {
    console.log('use effect Home');

    NetInfo.fetch().then(state => {
      // console.log('Connection type', state.type);
      state.isConnected ? setConnectedColor('green') && setOfflineMode(false) : setConnectedColor('red') && setOfflineMode(true);
    });
    setLoading(true);
    var docRef = db.collection('links').doc('urls');
    docRef.get().then(doc => {
      setAllyAppLink(doc.data().allyApp);
      setAllyPortalLink(doc.data().allyPortal);
      setPresentationLink(doc.data().presentation);
      setLoading(false);
    })
  }, [])

  useStatusBar('dark-content');
  const { logout } = useContext(AuthContext);
  return (
    <View style={{flex:1}}>
      <ImageBackground source={require('../../../assets/homeScreen.jpg')} style={styles.backgroundImage} imageStyle={styles.backgroundImageImage}>
    <ScrollView contentContainerStyle={styles.container}>
    
      {offlineMode ? <Text style={{ color: 'red' }}>Device is not connected to the internet. Some of the features are disabled.</Text> : null}
      <Text style={{ fontSize: 65, color: connectedColor, position: 'absolute', top: -80, right: 22 }}>.</Text>
      <Title style={styles.titleText}>Hello, you are now logged in.</Title>
      {loading ? <Loading /> : <Fragment><FormButton modeValue='contained' contentStyle={styles.orangeButtonContent} style={styles.homeScreenButtons}
        onPress={() => { Analytics.logEvent('SalesPresentation', {}); navigation.navigate('Browser', { url: presentationLink }) }} title='Sales Presentation' disabled={offlineMode} />
        <FormButton modeValue='contained' contentStyle={styles.orangeButtonContent} style={styles.homeScreenButtons}
          onPress={() => { Analytics.logEvent('QuoteCalculator', {}); navigation.navigate('QuoteCalculator') }} title='Quote Calculator' disabled={offlineMode} />
        <FormButton modeValue='contained' contentStyle={styles.navyButtonContent} style={styles.homeScreenButtons}
          onPress={() => { Analytics.logEvent('AllyLendingApplication', {}); navigation.navigate('Browser', { url: allyAppLink }) }} title='Ally Lending - Application' disabled={offlineMode} />
        <FormButton modeValue='contained' contentStyle={styles.navyButtonContent} style={styles.homeScreenButtons}
          onPress={() => {Analytics.logEvent('AllyLendingPortal', {}); navigation.navigate('Browser', { url: allyPortalLink }) }} title='Ally Lending - Login' disabled={offlineMode} />
        <FormButton modeValue='contained' contentStyle={styles.navyButtonContent} style={styles.homeScreenButtons}
          onPress={() => {Analytics.logEvent('CommissionCalculator', {}); navigation.navigate('CommissionCalculator') }} title='Commission Calculator' />
        <FormButton modeValue='contained' contentStyle={styles.navyButtonContent} style={styles.homeScreenButtons}
          onPress={() => {Analytics.logEvent('StoreRankCalculator', {}); navigation.navigate('StoreRankCalculator') }} title='Store Rank Calculator' />
        <FormButton modeValue='contained' contentStyle={styles.navyButtonContent} style={styles.homeScreenButtons}
          onPress={() => {Analytics.logEvent('HelpDeskTicket', {}); navigation.navigate('HelpDeskTicketScreen'); }} title='Create A Help Desk Ticket' disabled={offlineMode} />
        <FormButton modeValue='contained' contentStyle={styles.navyButtonContent} style={styles.homeScreenButtons}
          onPress={() => {Analytics.logEvent('LeadScreen', {}); navigation.navigate('LeadScreen') }} title='Create A Lead' disabled={offlineMode} />
        <FormButton title='Logout' modeValue='text' contentStyle={{ minWidth: 180 }} uppercase={false} labelStyle={{color:'#01718f', fontSize:20}}
          onPress={() => { logout()}}
        />
      </Fragment>
      }

      {/*<FormButton modeValue='contained' contentStyle={styles.navyButtonContent} style={styles.homeScreenButtons}
    onPress={()=>{navigation.navigate('LoginScreenSalesforce')}} title='SF Login'/> */}
    
    </ScrollView>
    </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 55
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
  orangeButtonContent: {
    minWidth: 290,
    backgroundColor: '#f93500',
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  navyButtonContent :{
    minWidth: 290,
    backgroundColor: '#003a44',
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  titleText: {
    fontSize: 20,
    marginBottom: 25
  },
  backgroundImage: {
   flex:1
  },
    backgroundImageImage:{
      resizeMode:'cover',
    }
});