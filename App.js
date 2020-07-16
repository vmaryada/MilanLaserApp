import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {AuthProvider} from './src/navigation/AuthProvider.js';
import Routes from './src/navigation/Routes.js';
import * as firebase from 'firebase';
import 'firebase/firestore';
import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }
const firebaseConfig = {
  apiKey: "AIzaSyD5ljV0kMZtMDJcRx_jP3igs8OGuBERj6I",
  authDomain: "chat-app-6374c.firebaseapp.com",
  databaseURL: "https://chat-app-6374c.firebaseio.com",
  projectId: "chat-app-6374c",
  storageBucket: "chat-app-6374c.appspot.com",
  messagingSenderId: "63052837686",
  appId: "1:63052837686:web:381b72d2bd9112b33c3997",
  measurementId: "G-9DT1NDNMJX"
}
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export default function App() {
  return (
    <PaperProvider>
    <AuthProvider>
    <Routes/>
    </AuthProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
