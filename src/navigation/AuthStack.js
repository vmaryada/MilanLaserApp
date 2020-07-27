import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from '../components/screens/SignupScreen.js';
import LoginScreen from '../components/screens/LoginScreen.js';
import ForgotPassword from '../components/screens/ForgotPassword.js';

function AuthStack() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator initialRouteName = 'Login' headerMode= 'none'>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Signup" component={SignupScreen}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
        </Stack.Navigator>
    )
}

export default AuthStack
