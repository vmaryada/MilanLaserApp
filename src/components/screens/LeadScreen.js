import React, { Fragment, useState, useEffect } from 'react'
import { View, StyleSheet, Text, FlatList, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import { TextInput, Divider, IconButton } from 'react-native-paper';
//import TextInputMask from 'react-native-text-input-mask';
import { TextInputMask } from 'react-native-masked-text'
import AreaButton from '../util/AreaButton';
import DropDownPicker from 'react-native-dropdown-picker';
import { db } from '../../../App.js';
import axios from 'axios';
//import AreaButton from '../util/AreaButton';
//import console = require('console');
//import console = require('console');
//import console = require('console');
//import console = require('console');
//import console = require('console');
function LeadScreen({ navigation }) {
    const [locationsData, setLocationsData] = useState([{ label: 'Omaha West', value: 'Omaha West' }]);
    const [formData, setFormData] = useState({
        first_name: 'Dead',
        last_name: 'Pool',
        email: 'dead@pool.com',
        phone: '4023051222',
        '00N1L00000F9eBV': 'Omaha West',
        oid: '00D410000014bPe',
        lead_source: 'milan app',
        description: '',
        retUrl:'https://milanlaser.com',
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
        axios.post('https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8', formData)
            .then((res) => { console.log(res, 'lead created') })
            .catch((err) => { console.log(err) })
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
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <ScrollView style={{ marginTop: 5 }} contentContainerStyle={{ alignItems: 'center' }}>
                    <View style={{ width: '60%', marginTop: 25 }}>
                        <TextInput baseColor="black" label="First Name" theme={{ colors: { primary: '#01718f' } }}
                        />
                        <TextInput baseColor="black" style={{ marginTop: 15 }} label="Last Name" theme={{ colors: { primary: '#01718f' } }}
                        />
                        <TextInput baseColor="black" style={{ marginTop: 15 }} label="Email" theme={{ colors: { primary: '#01718f' } }}
                        />
                        <TextInput baseColor="black" style={{ marginTop: 15 }} label="Phone/ Mobile" theme={{ colors: { primary: '#01718f' } }}
                        />
                        <View style={{ marginTop: 20, marginBottom: 10, zIndex: 1000 }}>
                            <DropDownPicker
                                items={locationsData}
                                defaultValue='Omaha West'
                                containerStyle={{ height: 40 }}
                                style={{ backgroundColor: '#fafafa' }}
                                dropDownStyle={{ backgroundColor: '#fafafa' }}
                                onChangeItem={(item) => { console.log(item) }}
                                searchable={true}
                                placeholder='Select a Location'
                                searchablePlaceholder="Search..."
                                searchableError="Not Found"
                            /></View>
                        <TextInput baseColor="black" style={{ marginTop: 15 }} multiline={true} label="Description" theme={{ colors: { primary: '#01718f' } }}
                        />
                        <View style={{ alignItems: 'center', marginTop: 25, zIndex: 500 }}>
                            <View style={{ width: 200, alignItems: 'center' }}><AreaButton title='Create' onPress={createLeadHandler} /></View>
                        </View>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </Fragment>
    )
}

export default LeadScreen
