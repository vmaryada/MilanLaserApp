import React, { useState, useContext, useEffect } from 'react';
//import { GiftedChat, Bubble, Send, SystemMessage } from 'react-native-gifted-chat';
import { IconButton } from 'react-native-paper';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../navigation/AuthProvider';
import { db } from '../../../App.js';
//import { QuerySnapshot } from '@google-cloud/firestore';
function renderBubble(props) {
    return (
        // Step 3: return the component
        <Bubble
            {...props}
            wrapperStyle={{
                right: {
                    // Here is the color change
                    backgroundColor: '#6646ee'
                }
            }}
            textStyle={{
                right: {
                    color: '#fff'
                }
            }}
        />
    );
}
function RoomScreen({ route }) {
    const { user } = useContext(AuthContext);
    const currentUser = user.toJSON();
    const { thread } = route.params;
    const [messages, setMessages] = useState([
        {
            _id: 0,
            text: 'New Room Created',
            createdAt: new Date().getTime(),
            system: true
        },
        {
            _id: 1,
            text: 'Hello!',
            createdAt: new Date().getTime(),
            user: { _id: 2, name: 'Test User' }
        }

    ])
    useEffect(() => {
       const messagesListener = db.collection('THREADS').doc(thread._id).collection('MESSAGES')
       .orderBy('createdAt', 'desc').onSnapshot(QuerySnapshot=>{
           const messagesVar = QuerySnapshot.docs.map(doc=>{
               const firestoreData = doc.data();
               const data = {_id: doc.id, text: '', createdAt: new Date().getTime(), ...firestoreData};
               if(!firestoreData.system){data.user={...firestoreData.user, name: firestoreData.user.email}}
               return data;
           })
           setMessages(messagesVar);
       })
       return () => messagesListener();
    }, [])
    const scrollToBottomComponent = () => {
        return (
            <View style={styles.bottomComponentContainer}>
                <IconButton icon='chevron-double-down' size={36} color='#6646ee' />
            </View>
        )
    }
    const renderLoading = () => {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' color='#6646ee' />
            </View>
        );
    }
    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View style={styles.sendingContainer}>
                    <IconButton icon='send-circle' size={32} color='#6646ee' />
                </View>
            </Send>
        );
    }
    const handleSend = (messagess) => {
        setMessages(GiftedChat.append(messages, messagess));
        // console.log(messagess);
        const text = messagess[0].text;
        console.log(messagess[0].text)
        db.collection('THREADS').doc(thread._id).collection('MESSAGES').add({
            text, createdAt: new Date().getTime(), user: { _id: currentUser.uid, email: currentUser.email }
        })

        db.collection('THREADS').doc(thread._id).set({ latestMessage: { text, createdAt: new Date().getTime() } }, { merge: true })
    }
    const renderSystemMessage = (props)=>{
return(<SystemMessage {...props} wrapperStyle={styles.systemMessageWrapper} textStyle={styles.systemMessageText}/>)
    }

    return (
     <div></div>
    )
}

export default RoomScreen
const styles = StyleSheet.create({
    sendingContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomComponentContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    systemMessageText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
        padding: 3
      },
      systemMessageWrapper : {
          //backgroundColor:'blue',
          borderRadius: 5
      }
});
