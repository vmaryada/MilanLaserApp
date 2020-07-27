import React, { Fragment, useState, useEffect } from 'react'
import { View, StyleSheet, Text, FlatList, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import { TextInput, Divider, HelperText, IconButton } from 'react-native-paper';
//import TextInputMask from 'react-native-text-input-mask';
//import { TextInputMask } from 'react-native-masked-text'
import AreaButton, {SubmitButton} from '../util/AreaButton';
import DropDownPicker from 'react-native-dropdown-picker';
//import { db } from '../../../App.js';
import {db} from '../util/db.js';
import axios from 'axios';
import qs from 'qs';
import Loading from '../util/Loading.js';
//import AreaButton from '../util/AreaButton';
//import console = require('console');
//import console = require('console');
//import console = require('console');
//import console = require('console');
//import console = require('console');
function LeadScreen({ navigation }) {
    const [locationsData, setLocationsData] = useState([{ label: 'Omaha West', value: 'Omaha West' }]);
   // const [leadData, setLeadData] = useState({ first_name: '', last_name: '', mobile: '', email: '', description: '', location: 'Omaha West' })
  //  console.log(leadData);
    const [loading, setLoading] = useState(false);
    const [leadSuccess, setLeadSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        mobile: '',
        '00N1L00000F9eBV': 'Omaha West',
        oid: '00D410000014bPe',
        lead_source: 'Milan Laser App',
        description: '',
        retUrl: 'https://milanlaser.com',
        Campaign_ID: '7011L000001BZmSQAW'
    })
    //console.log(locationsData);
    useEffect(() => {
        const snapshot = db.collection('locations');
        var tempLocationsArray = [];
        snapshot.get().then(querySnapshot => {
            querySnapshot.docs.map((doc) => {
                tempLocationsArray.push({ ...doc.data() })
                // setBodyAreasArray([...bodyAreasArray, { id: doc.id, ...doc.data() }])
            })
            tempLocationsArray = tempLocationsArray.sort((a, b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0));
            setLocationsData(tempLocationsArray);
        })
    }, [])

    const createLeadHandler = () => {

        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var tempErrors = {};
        if (formData.email === '') { tempErrors.email = 'Email cannot be empty' }
        else if (!regex.test(formData.email)) { tempErrors.email = 'Please enter a valid Email' }
        if (formData.first_name === '') { tempErrors.first_name = 'First Name cannot be empty' } else { }
        if (formData.last_name === '') { tempErrors.last_name = 'Last Name cannot be empty' } else { }
        if (formData.mobile === '') { tempErrors.mobile = 'Phone number cannot be empty' } else if (formData.mobile.length < 10) { tempErrors.mobile = 'Please enter a valid phone number' }

        if (Object.keys(tempErrors).length === 0) {
            setLoading(true);
            setErrors({});
            axios({ method: 'POST', url: 'https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8', data: qs.stringify(formData), config: { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } } })
                .then((res) => { console.log(res.status, 'lead created'), setLoading(false), setLeadSuccess(true) })
                .catch((err) => { console.log(err) })
        }
        else { setErrors(tempErrors); }
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
                    <Text style={{ fontSize: 23, color: '#01718f' }}>Create a Lead</Text>
                </View>
                <View style={{ width: '15%' }}></View>
            </View>
            <Divider />
           {(!loading && !leadSuccess)? <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <ScrollView style={{ marginTop: 5 }} contentContainerStyle={{ alignItems: 'center' }}>
                    <View style={{ width: '60%', marginTop: 25 }}>
                        <TextInput baseColor="black" onChangeText={text => setFormData({ ...formData, first_name: text })} label="First Name" theme={{ colors: { primary: '#01718f' } }} />
                        <HelperText visible={errors.first_name} type="error">{errors.first_name}</HelperText>
                        <TextInput baseColor="black" onChangeText={text => setFormData({ ...formData, last_name: text })} style={{ marginTop: 15 }} label="Last Name" theme={{ colors: { primary: '#01718f' } }} />
                        <HelperText visible={errors.last_name} type="error">{errors.last_name}</HelperText>
                        <TextInput autoCapitalize='none' baseColor="black" keyboardType='email-address' onChangeText={text => setFormData({ ...formData, email: text })} style={{ marginTop: 15 }} label="Email" theme={{ colors: { primary: '#01718f' } }} />
                        <HelperText visible={errors.email} type="error">{errors.email}</HelperText>
                        <TextInput baseColor="black" keyboardType='number-pad' maxLength={10} onChangeText={text => setFormData({ ...formData, mobile: text })} style={{ marginTop: 15 }} label="Phone/ Mobile" theme={{ colors: { primary: '#01718f' } }} />
                        <HelperText visible={errors.mobile} type="error">{errors.mobile}</HelperText>
                        <View style={{ marginTop: 20, marginBottom: 10, zIndex: 1000 }}>
                            <DropDownPicker
                                items={locationsData}
                                defaultValue='Omaha West'
                                containerStyle={{ height: 40 }}
                                style={{ backgroundColor: '#fafafa' }}
                                dropDownStyle={{ backgroundColor: '#fafafa' }}
                                onChangeItem={(item) => { setFormData({ ...formData, location: item.value }) }}
                                searchable={true}
                                placeholder='Select a Location'
                                searchablePlaceholder="Search..."
                                searchableError="Not Found"
                            /></View>
                        <TextInput baseColor="black" onChangeText={text => setFormData({ ...formData, description: text })} style={{ marginTop: 15 }} multiline={true} label="Description" theme={{ colors: { primary: '#01718f' } }}
                        />
                        <View style={{ alignItems: 'center', marginTop: 25, zIndex: 500 }}>
                            <View style={{ width: 200, alignItems: 'center' }}><SubmitButton title='Create the Lead' onPress={createLeadHandler} /></View>
                        </View>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView> : loading ? <Loading/> : leadSuccess ? <View style={{marginHorizontal:25, alignItems:'center', justifyContent:'center', flex:1}}>
                <Text style={{color:'green', fontSize:24, fontWeight:'400'}}>Lead created successfully!</Text>
                <View style={{flexDirection:'row', justifyContent:'center', marginTop:30}}>
                <AreaButton title="Create another lead" onPress={()=>{setLeadSuccess(false)}}/>
                <AreaButton title="Go Home" onPress={()=>{navigation.navigate('Home')}}/>
                </View>
            </View> : null }
        </Fragment>
    )
}

export default LeadScreen
