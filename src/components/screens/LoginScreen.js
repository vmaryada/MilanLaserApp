import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Title, HelperText } from 'react-native-paper';
import FormInput from '../util/FormInput.js';
import FormButton from '../util/FormButton.js';
import { AuthContext } from '../../navigation/AuthProvider.js';
import useStatusBar from '../util/useStatusBar.js';
//import { useFocusEffect } from '@react-navigation/native';
//import console = require('console');
//import console = require('console');
//import console = require('console');

function LoginScreen({ navigation }) {
  useStatusBar('dark-content');
  const { login, errors} = useContext(AuthContext);
  const [exa, setExa] = useState(1);
  // const [firebaseErrors, setFirebaseErrors]= useState({})
  // console.log('namaste', errors.loginError);

  const [localErrors, setLocalErrors] = useState({ email: '', password: '' })
  //console.log(localErrors);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  /* useFocusEffect(()=>{
 console.log('focus ayindi chicha');
 
   },[]) */
  //console.log(email, password)
  const handleLogin = () => {
    let tempPasswordError = ''; let tempEmailError = '';
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (password === '') { tempPasswordError = 'Password cannot be empty' } else { }
    if (email === '') { tempEmailError = 'Email cannot be empty' }
    else if (!regex.test(email)) {
      tempEmailError = 'Please enter valid email'
    }
    setLocalErrors({ password: tempPasswordError, email: tempEmailError })

    if (tempEmailError === '' && tempPasswordError === '') { login(email, password) }
    else {
      console.log('else nadustundi')
    }
  }
  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
      <View style={styles.container}>
        <Image source={require('../../../assets/milan_logo.png')} style={styles.logo} />
        <Title style={styles.titleText}>Welcome to Milan Laser App</Title>
        <FormInput
          labelName='Email'
          value={email}
          autoCapitalize='none'
          onChangeText={userEmail => setEmail(userEmail)}
        />
        <HelperText type="error" visible={localErrors.email !== ''}>{localErrors.email}</HelperText>
        <FormInput
          labelName='Password'
          value={password}
          autoCapitalize='none'
          secureTextEntry={true}
          onChangeText={userPassword => setPassword(userPassword)}
        />
        <HelperText type="error" visible={localErrors.password !== ''}>{localErrors.password}</HelperText>
        <View style={{ marginVertical: 15 }}>{errors.loginError.code === 'auth/user-not-found' ? <Text style={{ fontSize: 16, color: 'red' }}>User not found</Text> : (errors.loginError.code === 'auth/wrong-password') ? <Text style={{ fontSize: 16, color: 'red' }}>Wrong password</Text> : null}</View>
        <FormButton
          title='Login'
          modeValue='contained'
          labelStyle={styles.loginButtonLabel}
          contentStyle={{ backgroundColor: '#01718f', minWidth: 180 }}
          onPress={handleLogin}
        />
        <FormButton
          title='New user? Join here'
          modeValue='text'
          uppercase={false}
          contentStyle={{ minWidth: 180 }}
          labelStyle={styles.navButtonText}
          onPress={() => { navigation.navigate('Signup') }}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 20,
    marginBottom: 10
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
    position: 'absolute',
    top: '12%',

  }
})
export default LoginScreen
