import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, Vibration, Keyboard, Animated } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
//import * as AuthSession from 'expo-auth-session';
import { Title } from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage';
import FormInput from '../util/FormInput.js';
import FormButton from '../util/FormButton.js';
import { AuthContext } from '../../navigation/AuthProvider.js';
import useStatusBar from '../util/useStatusBar.js';
import { Ionicons } from '@expo/vector-icons';
import Loading from '../util/Loading.js';
import { db } from '../util/db.js'
//import console = require('console');
import * as Analytics from 'expo-firebase-analytics';
//mport jsforce from 'jsforce';
//import { useFocusEffect } from '@react-navigation/native';
//import console = require('console');
//import console = require('console');
//import console = require('console');

function LoginPasscode({ navigation }) {
  useStatusBar('dark-content');
  const { setAuthenticated } = useContext(AuthContext);
  const [exa, setExa] = useState(1);
  const [passcodeText, setPasscodeText] = useState('');
  const [passcodeFromFirebase, setpasscodeFromFirebase] = useState(null);
  // console.log(passcodeFromFirebase);
  const [loading, setLoading] = useState(true);
  const [transX, setTransX] = useState(0);
  const snapshot = db.collection('appPassword')
  const [offlineMode, setOfflineMode] = useState(false);
  /* snapshot.get().then(querySnapshot => {
     querySnapshot.docs.map((doc) => {
     setpasscodeFromFirebase(doc.data().password)
     })
   }) */
  /* useEffect(()=>{
     snapshot.get().then(querySnapshot => {
       querySnapshot.docs.map((doc) => {
       setpasscodeFromFirebase(doc.data().password)
       })
     })
   },[]) */
  const noTokenFound = () => {
    0
    NetInfo.fetch().then(state => {
      //  console.log('Connection type', state.type);
      state.isConnected ? setOfflineMode(false) : setOfflineMode(true);
    });
    setLoading(true);
    snapshot.get().then(querySnapshot => {
      querySnapshot.docs.map((doc) => {
        setpasscodeFromFirebase(doc.data().password)
        //  console.log('token', doc.data().password)
        setLoading(false);
      })
    })
  }

  useEffect(() => {
    /* NetInfo.fetch().then(state => {
       console.log('Connection type', state.type);
       state.isConnected?setOfflineMode(false) : setOfflineMode(true);
     }); */
    var milanToken = AsyncStorage.getItem('milanAppToken', (err, result) => {
      //   console.log(result);
      var resultObj = JSON.parse(result);
      var currentTime = new Date().getTime()
      //  console.log(currentTime);
      // console.log(resultObj.token);
      // console.log(resultObj.expiresAt);
      result !== null ? (resultObj.token === 'm9fqchixgo') && (currentTime < parseInt(resultObj.expiresAt)) ? setAuthenticated(true) : noTokenFound() : noTokenFound()
    });
  }, [])
  // console.log(passcodeText);
  const [localErrors, setLocalErrors] = useState({ email: '', password: '' })
  //console.log(localErrors);
  const addNumber = (num) => {
    passcodeText.length < 5 ? setPasscodeText(passcodeText + num) : null
  }

  const deleteNumber = () => {
    setPasscodeText(passcodeText.slice(0, -1))
  }
  const handleWrongPassword = () => {
    setTimeout(() => setTransX(-20), 100)
    setTimeout(() => setTransX(20), 150)
    setTimeout(() => setTransX(0), 200)
    Vibration.vibrate();
    setPasscodeText('');
  }
  const handleCorrectPassword = () => {
    Analytics.logEvent('LoggedIn', {});
    setAuthenticated(true);
    AsyncStorage.setItem('milanAppToken', JSON.stringify({ token: 'm9fqchixgo', expiresAt: (new Date().getTime() + (60 * 60 * 1000)).toString() }))
    // AsyncStorage.setItem( 'milanTokenExpiresAt', (new Date().getTime() + (6*60*60*1000)).toString() )
  }
  useEffect(() => {
    passcodeText.length === 4 ?
      (passcodeText === passcodeFromFirebase) ? handleCorrectPassword() : handleWrongPassword()
      : null
  }, [passcodeText])
  /* const handleLogin = () => {
     let tempPasswordError = ''; let tempEmailError = '';
     var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
     if (password === '') { tempPasswordError = 'Password cannot be empty' } else { }
     if (email === '') { tempEmailError = 'Email cannot be empty' }
     else if (!regex.test(email)) {
       tempEmailError = 'Please enter valid email'
     }
     setLocalErrors({ password: tempPasswordError, email: tempEmailError })
 
     if (tempEmailError === '' && tempPasswordError === '') {
       conn.login(email, password, function(err, userInfo) {
         if (err) { return console.error(err); }
         // Now you can get the access token and instance URL information.
         // Save them to establish connection next time.
         console.log(conn.accessToken);
         console.log(conn.instanceUrl);
         // logged in user property
         console.log("User ID: " + userInfo.id);
         console.log("Org ID: " + userInfo.organizationId);
         // ...
       });
       }
     else {
       console.log('local errors')
     }
   } */
  return (


    loading ? <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Loading /></View> :
      <View style={styles.container}>
        <ImageBackground source={require('../../../assets/lockScreen.jpg')} style={styles.backgroundImage} imageStyle={styles.backgroundImageImage} >
          <Image source={require('../../../assets/milan_logo.png')} style={styles.logo} />
          <Title style={styles.titleText}>Welcome to Milan Laser App</Title>
          {offlineMode ? <Text style={{ color: 'red' }}>No Internet Connection</Text> : null}
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 20 }}> Enter Passcode</Text>
            <Animated.View style={{ marginRight: transX, flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}>
              <View style={{ ...styles.passcodeWrapper, backgroundColor: passcodeText.length > 0 ? 'black' : null }}>
                <Text> </Text>
              </View>
              <View style={{ ...styles.passcodeWrapper, backgroundColor: passcodeText.length > 1 ? 'black' : null }}>
                <Text> </Text>
              </View>
              <View style={{ ...styles.passcodeWrapper, backgroundColor: passcodeText.length > 2 ? 'black' : null }}>
                <Text> </Text>
              </View>
              <View style={{ ...styles.passcodeWrapper, backgroundColor: passcodeText.length > 3 ? 'black' : null }}>
                <Text> </Text>
              </View>
            </Animated.View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap', marginTop: 15, width: 240, height: 342 }}>
              <TouchableOpacity onPress={() => addNumber(1)}>
                <View style={styles.numberWrapper}>
                  <Text style={styles.numberText}>1</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => addNumber(2)}>
                <View style={styles.numberWrapper}>
                  <Text style={styles.numberText}>2</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => addNumber(3)}>
                <View style={styles.numberWrapper}>
                  <Text style={styles.numberText}>3</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => addNumber(4)}>
                <View style={styles.numberWrapper}>
                  <Text style={styles.numberText}>4</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => addNumber(5)}>
                <View style={styles.numberWrapper}>
                  <Text style={styles.numberText}>5</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => addNumber(6)}>
                <View style={styles.numberWrapper}>
                  <Text style={styles.numberText}>6</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => addNumber(7)}>
                <View style={styles.numberWrapper}>
                  <Text style={styles.numberText}>7</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => addNumber(8)}>
                <View style={styles.numberWrapper}>
                  <Text style={styles.numberText}>8</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => addNumber(9)}>
                <View style={styles.numberWrapper}>
                  <Text style={styles.numberText}>9</Text>
                </View>
              </TouchableOpacity>
              <View style={{ ...styles.numberWrapperTransparent }}>

              </View>
              <TouchableOpacity onPress={() => addNumber(0)}>
                <View style={styles.numberWrapper}>
                  <Text style={styles.numberText}>0</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={deleteNumber}>
                <View style={{ ...styles.numberWrapperTransparent }}>
                  <Text style={styles.numberText}><Ionicons name='ios-backspace' style={{ fontSize: 35 }} /></Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    flex: 1
  },
  titleText: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 25
  },
  loginButtonLabel: {
    fontSize: 20
  },
  navButtonText: {
    marginTop: 15,
    fontSize: 16,
    color: '#01718f'
  },
  logo: {
    width: 180,
    height: 70,
    marginTop: 55
  },
  numberWrapper: {
    width: 65,
    height: 65,
    borderRadius: 65,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginVertical: 10
  },
  numberWrapperTransparent: {
    width: 65,
    height: 65,
    borderRadius: 65,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  },
  numberText: {
    fontSize: 30,
  },
  passcodeWrapper: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    marginHorizontal: 10
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  backgroundImageImage: {
  }
})
export default LoginPasscode
