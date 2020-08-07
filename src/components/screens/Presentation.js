import React, {useState, useEffect} from 'react';
import {View, Text, Button, Dimensions, StyleSheet, StatusBar } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import * as ScreenOrientation from 'expo-screen-orientation';
//import console = require('console');
//import console = require('console');
export default function Presentation ({navigation}) {
    const [result, setResult] = useState(null);
    
    const _onOrientationDidChange = (orientation) => {
        if (orientation == 'PORTRAIT') {
          ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
        }
      };
      useEffect(() => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
        // Orientation.addOrientationListener(_onOrientationDidChange);
        ScreenOrientation.addOrientationChangeListener(_onOrientationDidChange)
      /*  let result = WebBrowser.openBrowserAsync('https://milanlaser.com/salespresentation?version=4', {enableBarCollapsing:true});
      setResult(result);  */
      _handlePressButtonAsync();
      })
    const _handlePressButtonAsync = async () => {
      let result = await WebBrowser.openBrowserAsync('https://milanlaser.com/salespresentation?version=4', {enableBarCollapsing:true});
      setResult(result);
    }; 
    useEffect(()=>{
    result !== null ? result.type === 'cancel'? navigation.navigate('Home'): null : null;
    },[result]) 
    return (
      <View style={styles.container}>
      <StatusBar hidden/>
        <Button title="Open WebBrowser"/>
        <Text>{result && JSON.stringify(result)}</Text>
      </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
    },
  });