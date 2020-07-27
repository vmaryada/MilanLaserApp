import React, { useContext, useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback,ScrollView, Keyboard, KeyboardAvoidingView} from 'react-native';
import { Title, IconButton, HelperText } from 'react-native-paper';
import FormInput from '../util/FormInput.js';
import FormButton from '../util/FormButton.js';
import {AuthContext} from '../../navigation/AuthProvider.js';
import {logo} from '../../../assets/milan_logo.png';

 function SignupScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword]= useState('');
    const [localErrors, setLocalErrors] = useState({ email: '', password: '', confirmPassword: '' })
   const {register, errors} = useContext(AuthContext);
   console.log(errors);
   let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   const handleSignup = () => {
    var tempEmailError= ''; 
    var tempPasswordError= '';
    var tempConfirmPasswordError ='';
    email === ''? tempEmailError = 'Email Cannot be empty' : !regex.test(email)? tempEmailError = 'Please Enter a valid email' : null;
    password === ''? tempPasswordError ='Password Cannot be empty' : password.length < 6 ? tempPasswordError = 'Password should be at least 6 characters' : null
    password !== confirmPassword ? tempConfirmPasswordError = 'Passwords do not match' : null
    setLocalErrors ({email:tempEmailError, password: tempPasswordError, confirmPassword: tempConfirmPasswordError});
    if (tempEmailError === '' && tempPasswordError === '' && tempConfirmPasswordError==='') { register(email, password) }
    else {
      console.log('else nadustundi')
    }

  }
    return (
<KeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
      <View style={styles.container}>   
      <Image source={require('../../../assets/milan_logo.png')} style={styles.logo}/>
        <Title style={styles.titleText}>Register you Account</Title>
         
       <FormInput
          labelName='Email'
          value={email}
          autoCapitalize='none'
          onChangeText={userEmail => setEmail(userEmail)}
          keyboardType='email-address'
        />
        <HelperText type="error" visible={localErrors.email!==''}>{localErrors.email}</HelperText>
        <FormInput
          labelName='Password'
          value={password}
          secureTextEntry={true}
          onChangeText={userPassword => setPassword(userPassword)}
        />
        <HelperText type="error" visible={localErrors.password!==''}>{localErrors.password}</HelperText>
        <FormInput
          labelName='Confirm Password'
          value={confirmPassword}
          secureTextEntry={true}
          onChangeText={userPassword => setConfirmPassword(userPassword)}
        />
        <HelperText type="error" visible={localErrors.confirmPassword!==''}>{localErrors.confirmPassword
        }</HelperText>
    <View style={{ marginVertical: 5 }}>{errors.signupError.code === 'auth/email-already-in-use' ? <Text style={{ fontSize: 16, color: 'red' }}>Email already has a account</Text> : (errors.loginError.code === 'auth/wrong-password') ? <Text style={{ fontSize: 16, color: 'red' }}>Wrong password</Text> : null}</View>

     <View style={{marginTop:25}}><FormButton
          title='Signup'
          modeValue='contained'
          labelStyle={styles.loginButtonLabel}
          onPress={handleSignup}
          contentStyle={{backgroundColor: '#01718f', minWidth: 180 }}
        /></View> 
        <IconButton
          icon='keyboard-backspace'
          size={30}
          style={styles.navButton}
         // color='#01718f'
          onPress={() => navigation.goBack()}
        />
        
      </View>
      
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f5f5f5',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:55
    },
    titleText: {
      fontSize: 20,
      marginBottom: 10,
      marginTop:25
    },
    loginButtonLabel: {
      fontSize: 22
    },
    navButtonText: {
      fontSize: 18
    },
    navButton: {
      marginTop: 15
    },
    logo: {
      width:180,
      height:70,
    }
  });
 
export default SignupScreen
