import React, {createContext, useState} from 'react';
//import auth from '@react-native-firebase/auth';
import * as firebase from 'firebase';
export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [passwordEmailSent, setPasswordEmailSent] = useState(false);
    const [errors, setErrors]= useState({loginError:{code:"", message:""}, signupError:{code:"", message:""}, passwordReset:{code:"", message:""}});
    console.log(errors);
    return (
      <AuthContext.Provider
        value={{
          user,
          setUser,
          login: async (email, password) => {
            try {
              await firebase.auth().signInWithEmailAndPassword(email, password);
            } catch (e) {
              console.log('login error');
              console.log(e.toJSON().message);
              setErrors({...errors, loginError: {code:e.toJSON().code, message:e.toJSON().message}});
            }
          },
          register: async (email, password) => {
            try {
              await firebase.auth().createUserWithEmailAndPassword(email, password);
            } catch (e) {
              console.log(e);
              setErrors({...errors, signupError: {code:e.toJSON().code, message:e.toJSON().message}});
            }
          },
          passwordReset: (email) => {
            firebase.auth().sendPasswordResetEmail(email).then(function() {
              setPasswordEmailSent(true);
            }).catch(function(e) {
              setErrors({...errors, passwordReset: {code:e.toJSON().code, message:e.toJSON().message}});
            });
          },
          logout: async () => {
            try {
              await firebase.auth().signOut();
            } catch (e) {
              console.error(e);
            }
          },errors, passwordEmailSent,
          clearErrors: () => {
            setErrors({loginError:{code:"", message:""}, signupError: {code:"", message:""}, passwordReset: {code:"", message:""}});
          }
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

