import React, { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { RadioButton, Divider, Text, Button, IconButton } from 'react-native-paper'
import stylesGlobal from '../../Styles.js';
import FormButton from '../util/FormButton.js';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';
//import { NavigationEvents } from 'react-navigation';
//import console = require('console');

//import console = require('console');

function QuoteCalculator({ navigation }) {
  const _onOrientationDidChange = (orientation) => {
    if (orientation == 'LANDSCAPE' || orientation == 'LANDSCAPE_LEFT' || orientation === 'LANDSCAPE_RIGHT') {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  };
  /*useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      console.log('focussed');
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  },[navigation]) */
  useFocusEffect(
    // console.log('focussed'),
    useCallback(() => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      // console.log('Screen was focused');
      // Do something when the screen is focused
      return () => { }
    }, [navigation])
  );
  useEffect(() => {
    // console.log('use effect running')
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    // Orientation.addOrientationListener(_onOrientationDidChange);
    ScreenOrientation.addOrientationChangeListener(_onOrientationDidChange)

  }, [])

  const [state, setState] = useState({ mode: 'monthly special', months: 36, disc_code: 250 })
  return (
    <View style={{ marginTop: 25 }}>
     <View style={{flexDirection: 'row'}}>
  <View style={{width:'15%', marginTop:9 }}>
    <IconButton icon='home' onPress={()=>{navigation.navigate('Home')}}  size={30} color='#01718f' style={{marginLeft:'5%'}}/>
    </View>
      <View style={{ flex: 1, alignItems: 'center', marginTop: 25, width: '70%' }}>
        <Text style={{fontSize:23, color: '#01718f'}}>Please Select the Options</Text>
      </View>
      <View style={{width:'15%'}}></View>
      </View>
      <Divider/>
      <View style={{flexDirection: 'row'}}>
      <View style={{width:'25%'}}><Text></Text></View>
      <View style={{width:'50%'}}>
      <RadioButton.Group
        onValueChange={value => setState({ ...state, mode: value })}
        value={state.mode}>
        <RadioButton.Item label="Monthly Special" value="monthly special" />
        <RadioButton.Item label="Previous Treatments" value="previous treatments" />
        <RadioButton.Item label="Discount Code" value="discount code" />
      </RadioButton.Group>
      <Divider />
      {state.mode == 'discount code' ? <View><RadioButton.Group
        onValueChange={value => setState({ ...state, disc_code: value })}
        value={state.disc_code}>
        <RadioButton.Item label="PS250" value={250} />
        <RadioButton.Item label="PS500" value={500} />
      </RadioButton.Group><Divider /></View> : <View></View>}
      <RadioButton.Group
        onValueChange={value => setState({ ...state, months: value })}
        value={state.months}>
        <RadioButton.Item label="36 Month Financing" value={36} />
        <RadioButton.Item label="24 Month Financing" value={24} />
      </RadioButton.Group>
      
      </View>
      <View style={{width:'25%'}}></View>
      </View>
      <Divider />
      <View style={{ alignItems: 'center', marginTop: 25 }}>

        <FormButton title='Go' modeValue="contained"
          contentStyle={{ backgroundColor: '#01718f', minWidth: 180 }}
          onPress={() => { navigation.navigate('QuoteCalculatorSecondScreen', { options: { mode: state.mode, months: state.months, disc_code: state.disc_code } }) }}
        />
      </View>
    </View>
  )
}
export default QuoteCalculator

