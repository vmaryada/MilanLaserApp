import React, { useContext, useState, Fragment } from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Title, HelperText, Divider } from 'react-native-paper';
import FormInput from '../util/FormInput.js';
import FormButton from '../util/FormButton.js';
import { AuthContext } from '../../navigation/AuthProvider.js';
import useStatusBar from '../util/useStatusBar.js';
//import { useFocusEffect } from '@react-navigation/native';
//import console = require('console');
//import console = require('console');
//import console = require('console');

function ForgotPassword({ navigation }) {
  useStatusBar('dark-content');
  const { passwordReset, errors, passwordEmailSent} = useContext(AuthContext);
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
     let tempEmailError = '';
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //  if (password === '') { tempPasswordError = 'Password cannot be empty' } else { }
    if (email === '') { tempEmailError = 'Email cannot be empty' }
    else if (!regex.test(email)) {
      tempEmailError = 'Please enter valid email'
    }
    setLocalErrors({ email: tempEmailError })

    if (tempEmailError === '') { passwordReset(email) }
    else {
      console.log('else nadustundi')
    }
  }
  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
      <View style={styles.container}>
        <Image source={require('../../../assets/milan_logo.png')} style={styles.logo} />
        <Title style={styles.titleText}>Forgot Password</Title>
       {!passwordEmailSent ? <Fragment><FormInput
          labelName='Email'
          value={email}
          autoCapitalize='none'
          onChangeText={userEmail => setEmail(userEmail)}
          keyboardType='email-address'
        />
        <HelperText type="error" visible={localErrors.email !== ''}>{localErrors.email}</HelperText>
     
        <View style={{ marginVertical: 15 }}>{errors.passwordReset.code === 'auth/user-not-found' ? <Text style={{ fontSize: 16, color: 'red' }}>User not found</Text> :  null}</View>
        <FormButton
          title='Submit'
          modeValue='contained'
          labelStyle={styles.loginButtonLabel}
          contentStyle={{ backgroundColor: '#01718f', minWidth: 180 }}
          onPress={handleLogin}
/></Fragment> : <View style={{margin:15}}>
<Text style={{fontSize:16, color:'#01718f'}}>A link to reset your password has been sent to your email. Please visit that link and reset your password</Text>
<Divider style={{marginVertical:15}}/>
</View> }
        <FormButton
          title='Login?'
          modeValue='text'
          uppercase={false}
          contentStyle={{ minWidth: 180 }}
          labelStyle={styles.navButtonText}
          onPress={() => { navigation.navigate('Login') }}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    marginTop: 55,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 20,
    marginBottom: 10,
    marginTop:25
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
  }
})
export default ForgotPassword
