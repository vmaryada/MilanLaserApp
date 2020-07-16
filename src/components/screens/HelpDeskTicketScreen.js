import React, { Fragment, useState, useEffect } from 'react'
import { View, StyleSheet, Image, Text, FlatList, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import { TextInput, Divider, IconButton } from 'react-native-paper';
//import TextInputMask from 'react-native-text-input-mask';
//import { TextInputMask } from 'react-native-masked-text'
import AreaButton from '../util/AreaButton';
import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from 'react-native-material-dropdown';
import { db } from '../../../App.js';
import Loading from '../util/Loading.js';
import axios from 'axios';
//import { Camera } from 'expo-camera';
//import * as Permissions from 'expo-permissions';
//import { object } from '@hapi/joi';
//import { array } from '@hapi/joi';

//import AreaButton from '../util/AreaButton';
//import console = require('console');
//import console = require('console');
//import console = require('console');
//import console = require('console');
//import console = require('console');  
function HelpDeskTicketScreen({ route, navigation }) {
    const [locationsData, setLocationsData] = useState([{ label: 'Omaha West', value: 61 }]);
    const [categoryData, setCategoryData] = useState([{ value: 6, label: 'Website/Social Media' }]);
    const [userData, setUserData] = useState({name:'', email: '', phone:'', location: 61})
    const [ticketData, setTicketData] = useState({category: 6, subject:'', message:'', priority: 4 })
    const [loading, setLoading] = useState(false);
    const [successScreen, setSuccessScreen] = useState(false);
   // console.log(ticketData, userData);
  //  console.log(categoryData);
    /* let category_data = [
         { value: 1, label: 'One' }, { value: 2, label: 'Two' },
         { value: 3, label: 'Three' }, { value: 4, label: 'Four' }] */
    let priority_data = [
        { value: 4, label: 'Low' }, { value: 1, label: 'Medium' },
        { value: 3, label: 'High' }, { value: 2, label: '911' }]
    /*const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        category: '',
        subject: '',
        priority: ''
    })*/
    //  const [hasPermission, setHasPermission] = useState(null);
    // const [type, setType] = useState(Camera.Constants.Type.back);
    const [attachedImages, setAttachedImages] = useState([])
    const [exa, setExa] = useState(1);
   // console.log(attachedImages);
    useEffect(() => {
        console.log(route.params);
        route.params !== undefined ? setAttachedImages([...attachedImages, route.params.uri]) : null
    }, [route.params])

    //console.log(locationsData);
    useEffect(() => {
        /* const snapshot = db.collection('locations');
         var tempLocationsArray = [];
         snapshot.get().then(querySnapshot => {
             querySnapshot.docs.map((doc) => {
                 tempLocationsArray.push({ ...doc.data() })
                 // setBodyAreasArray([...bodyAreasArray, { id: doc.id, ...doc.data() }])
             })
             tempLocationsArray = tempLocationsArray.sort((a, b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0));
             setLocationsData(tempLocationsArray);
         })
         */
        axios({
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            method: "get",
            url: 'https://milanlaser.happyfox.com/api/1.1/json/ticket_custom_field/3/',
            auth: {
                username: 'a350cbdfb5cc471580c9ae60e79e595e',
                password: '5c834e2544e94c0da691e2e42deb9267'
            }
        }).then(res => {//console.log(res.data.choices);
            var data = res.data.choices;
            var tempLocationsArray = Object.keys(data).map(key => {
                return { label: data[key].text, value: data[key].id };
            })
            //   tempLocationsArray = tempLocationsArray.sort((a, b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0));
            setLocationsData(tempLocationsArray);
            //    console.log(Object.keys(data))
            //  console.log(tempLocationsArray);
        })
            .catch(err => { console.log('error', err) })



    }, [])

    useEffect(() => {
        axios({
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            method: "get",
            url: 'https://milanlaser.happyfox.com/api/1.1/json/categories/',
            auth: {
                username: 'a350cbdfb5cc471580c9ae60e79e595e',
                password: '5c834e2544e94c0da691e2e42deb9267'
            }
        }).then(res => {//console.log(res.data.choices);
            var data = res.data;
          /*  var data2 = res.data.toJSON();
            console.log(data2);*/
            var tempCategoryData = Object.keys(data).map(key => {
                return { label: data[key].name, value: data[key].id };
            })
          //  tempCategoryData = tempCategoryData.sort((a, b) => (a.description > b.description) ? 1 : ((b.description > a.description) ? -1 : 0));
            setCategoryData(tempCategoryData);
            //    console.log(Object.keys(data))
         //   console.log('tempCatArray', tempCategoryData);
        })
            .catch(err => { console.log('error', err) })
    }, []);
    /*  useEffect(() => {
           console.log('Empty use effect ran');
       }, [exa]) */

    const createTicketHandler = () => {
        setLoading(true);
        var ticketFormData = new FormData();
        ticketFormData.append('subject', ticketData.subject);
        ticketFormData.append('text', ticketData.message);
        ticketFormData.append('category', ticketData.category);
        ticketFormData.append('priority', ticketData.priority);
        ticketFormData.append('email', userData.email);
        ticketFormData.append('name', userData.name);
        ticketFormData.append('phone', userData.phone);
        ticketFormData.append('t-cf-3', userData.location);
        ticketFormData.append('attachments', {uri: attachedImages[0], name:'Attached Image 1'});
        console.log(ticketFormData);
        axios({
            headers: { "Content-Type": "multipart/form-data" },
            method: "post",
            data: ticketFormData,
            url: 'https://milanlaser.happyfox.com/api/1.1/json/tickets/',
            auth: {
                username: 'a350cbdfb5cc471580c9ae60e79e595e', 
                password: '5c834e2544e94c0da691e2e42deb9267'
            }
        }).then(res => {//console.log(res.data.choices);
            setLoading(false);
            setSuccessScreen(true);
           console.log('ticket Created')
        })
            .catch(err => { console.log('error', JSON.stringify(err)) })
    }

    const handleImageDelete = (index) => {
        console.log('image delete')
        var tempImageArray = attachedImages;
        tempImageArray.splice(index, 1);
        console.log(tempImageArray);
        setAttachedImages(tempImageArray);
        setExa(exa + 1);
    }
    const createExitAlert = () => Alert.alert(
        "Are you sure??",
        "You are about to exit!",
        [
            {
                text: "Cancel",
                style: "cancel"
            },
            { text: "OK", onPress: () => navigation.navigate('Home') }
        ],
        { cancelable: false }
    );

    return (
        <Fragment>
            <View style={{ flexDirection: 'row', marginTop: 25 }}>
                <View style={{ width: '15%', marginTop: 9 }}>
                    <IconButton icon='home' onPress={createExitAlert} size={30} color='#01718f' style={{ marginLeft: '5%' }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', marginTop: 25, width: '70%' }}>
                    <Text style={{ fontSize: 23, color: '#01718f' }}>Create a Help Desk Ticket </Text>
                </View>
                <View style={{ width: '15%' }}></View>
            </View>
            <Divider />
            { (!loading && !successScreen) ?  <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{ flex: 1 }}>
               <ScrollView style={{ marginTop: 5 }} contentContainerStyle={{ alignItems: 'center' }}>
                    <View style={{ width: '60%', marginTop: 25 }}>
                        <TextInput baseColor="black" label="Full Name" autoCorrect={false} onChangeText={text=>{setUserData({...userData, name:text})}} theme={{ colors: { primary: '#01718f' } }}/>
                        <TextInput baseColor="black" autoCapitalize='none' keyboardType='email-address' style={{ marginTop: 15 }} onChangeText={text=>{setUserData({...userData, email:text})}} label="Email" theme={{ colors: { primary: '#01718f' } }}/>
                        <TextInput baseColor="black" keyboardType='phone-pad' style={{ marginTop: 15 }} onChangeText={text=>{setUserData({...userData, phone:text})}} label="Phone/ Mobile" theme={{ colors: { primary: '#01718f' } }}
                        />
                        <View style={{ marginTop: 20, marginBottom: 10, zIndex: 1000 }}>
                            <DropDownPicker
                                items={locationsData}
                                defaultValue={61}
                                containerStyle={{ height: 40 }}
                                style={{ backgroundColor: '#fafafa' }}
                                dropDownStyle={{ backgroundColor: '#fafafa' }}
                                onChangeItem={(item) => { setUserData({...userData, location:item.value}) }}
                                searchable={true}
                                placeholder='Category'
                                searchablePlaceholder="Search..."
                                searchableError="Not Found"
                            /></View>
                        <View style={{ alignItems: 'center' }}>
                        <Dropdown onChangeText={text=>{setTicketData({...ticketData, category: text})}} label='Category' data={categoryData} value={ticketData.category} containerStyle={{ width: '95%', margin: 15, marginTop: 0 }}
                            textColor='black' baseColor='black' />
                        </View>
                        <View style={{ alignItems: 'center' }}>
                        <Dropdown label='Priority' onChangeText={text=>{setTicketData({...ticketData, priority: text})}} value={ticketData.priority} data={priority_data} containerStyle={{ width: 150, margin: 15, marginTop: 0 }}
                            textColor='black' baseColor='black' />
                        </View>
                        <TextInput baseColor="black" onChangeText={(text)=>{setTicketData({...ticketData, subject:text})}} style={{ marginTop: 15 }} label="Subject" theme={{ colors: { primary: '#01718f' } }}
                        />
                        <TextInput baseColor="black" onChangeText={(text)=>{setTicketData({...ticketData, message:text})}} style={{ marginTop: 15 }} label="Message" theme={{ colors: { primary: '#01718f' } }}
                        />
                        {/*}   <Text>{attachedImages.length}&nbsp;{exa}</Text> */}
                        {attachedImages.length > 0 ? <View style={{ marginTop: 15 }}>
                            <Text style={{ fontSize: 14, color: '#01718f' }}>Attached Images:</Text>
                            {attachedImages.map((pic, index) => <View key={index} style={{
                                flexDirection: 'row', alignItems: 'center'
                            }}><Image style={{ width: 25, height: 30 }} source={{ uri: pic }} /><Text style={{ marginLeft: 10, marginRight: 10 }}>Image {index + 1}</Text><IconButton icon='trash-can-outline' onPress={() => { handleImageDelete(index) }} /></View>)}
                        </View> : null}
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                            <AreaButton title="Choose a picture" onPress={() => { navigation.navigate('ImagePickerScreen') }} />
                            <AreaButton title="Take a Picture" onPress={() => { navigation.navigate('CameraScreen') }} />
                        </View>
                        <View style={{ alignItems: 'center', marginTop: 25, zIndex: 500 }}>
                            <View style={{ width: 200, alignItems: 'center' }}><AreaButton title='Create the Ticket' onPress={createTicketHandler} /></View>
                        </View>


                    </View>

                </ScrollView></KeyboardAvoidingView> :  
               loading ?<View style={{alignItems:'center', justifyContent:'center', flex:1}}>
                <Loading/></View>
                : successScreen ? <View style={{alignItems:'center', alignContent:'center', justifyContent:"center", flex:1}}>
                <Text style={{color:'green', fontSize: 24}}>Ticket successfully created!</Text>
                <View style={{flexDirection:'row', marginTop:25}}><AreaButton title="Create Another Ticket"/><AreaButton title="Go Home"/></View>
                </View> : null
                        } 
            
        </Fragment>
    )
}

export default HelpDeskTicketScreen
