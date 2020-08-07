import React, {useContext, useState, useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import { AuthContext } from './AuthProvider.js';
import HomeStack from './HomeStack.js';
import Loading from '../components/util/Loading';
//import auth from '@react-native-firebase/auth';
import * as firebase from 'firebase';
//import console = require('console');
//import console = require('console');
function Routes() {
    const { user, setUser, clearErrors, authenticated } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [initializing, setInitializing] = useState(true);

   /* const onAuthStateChanged = (user) => {
      //  console.log(user);
        setUser(user);
        clearErrors();
        if (initializing) { setInitializing(false); }
        setLoading(false);
    }

    useEffect(() => {
        console.log('use Efect in ROutes.js');
       const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; 
    }, []); 

    if (loading) {
        return <Loading />;
    } */

    return (
        <NavigationContainer>
           {authenticated ? <HomeStack /> : <AuthStack />} 

        </NavigationContainer>
    );
}

export default Routes
