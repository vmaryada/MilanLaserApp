import React, {useContext, useState, useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import { AuthContext } from './AuthProvider.js';
import HomeStack from './HomeStack.js';
import Loading from '../components/util/Loading';
//import auth from '@react-native-firebase/auth';
import * as firebase from 'firebase';
function Routes() {
    const { user, setUser, clearErrors } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [initializing, setInitializing] = useState(true);

    const onAuthStateChanged = (user) => {
        setUser(user);
        clearErrors();
        if (initializing) { setInitializing(false); }
        setLoading(false);
    }

    useEffect(() => {
       const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []); 

    if (loading) {
        return <Loading />;
    }

    return (
        <NavigationContainer>
           {user ? <HomeStack /> : <AuthStack />} 

        </NavigationContainer>
    );
}

export default Routes
