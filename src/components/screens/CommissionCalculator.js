import React, { Fragment, useState, useEffect } from 'react'
import { ScrollView, View, StyleSheet, Text, FlatList, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import { TextInput, Divider, IconButton } from 'react-native-paper';


import AreaButton from '../util/AreaButton';
import { Dropdown } from 'react-native-material-dropdown-v2';
//import console = require('console');
//import console = require('console');
//simport { set } from 'react-native-reanimated';
//import { ifError } from 'assert';
//import console = require('console');

function StoreRankCalculator({ navigation }) {

    const [numberOfAdmins, setNumberOfAdmins] = useState('');
    const [adminsObject, setAdminsObject] = useState({});
    const [providersObject, setProvidersObject] = useState({});
    // console.log(adminsObject, providersObject);
    //  console.log(Object.values(adminsObject));
    const [numberOfProviders, setNumberOfProviders] = useState('');
    const [showSecond, setShowSecond] = useState(false);
    const [showFinal, setShowFinal] = useState(false);
    const [upsellObject, setUpsellObject] = useState({ focussed: false, value: '' });
    const [reviewMetAmount, setReviewMetAmount] = useState(0);
    const [reviewNotMetAmount, setReviewNotMetAmount] = useState(0);
    const [totalHours, setTotalHours] = useState(0);
    let dropdown_data = [
        { value: 1, label: 'One' }, { value: 2, label: 'Two' },
        { value: 3, label: 'Three' }, { value: 4, label: 'Four' }]
    const handleUpsellChange = (text) => {
        var textVar = text.replace(/[^0-9,]/g, '');
        //   console.log(event.target.value);
        if (textVar !== '' && textVar !== undefined) {
            if (textVar.length > 9) {
                textVar = textVar.slice(0, 9)
            }
            var num = textVar.replace(/(\s)/g, '');
            let num2 = num.replace(',', '');
            // console.log(num2);
            let n = num2.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
            // console.log(n);
            let n2 = n.split(' ')
            if (n2[1] === undefined) {
                textVar = n2[0]
            }
            else if (n2[2] === undefined) {
                let stringVar = n2[0] + ',' + n2[1];
                textVar = stringVar;
            }
            else {
                let stringVar = n2[0] + ',' + n2[1] + ',' + n2[2];
                textVar = stringVar;
            }
        }
        else { textVar = '' }

        setUpsellObject({ ...upsellObject, value: textVar })

    }

    const isEmptyObject = (obj) => {
        let tempObj = Object.values(obj)
        // let magenicVendor = vendors.find( vendor => vendor['Name'] === 'Magenic' );
        let result = tempObj.find(hour => hour['value'] === '')
        return result === undefined ? false : true
    }
    const handleAdminFocus = (name) => {
        console.log('handle admin focus')

        setAdminsObject({ ...adminsObject, [name]: { value: adminsObject[name].value, focussed: true } })
    }
    const handleAdminBlur = (name) => {
        setAdminsObject({ ...adminsObject, [name]: { value: adminsObject[name].value, focussed: false } })
    }
    const handleAdminChange = (name, text) => {
        //   console.log(name, text);
        setAdminsObject({ ...adminsObject, [name]: { ...adminsObject[name], value: parseInt(text) } })
    }
    const handleProviderFocus = (name) => {
        setProvidersObject({ ...providersObject, [name]: { ...providersObject[name], focussed: true } })
    }
    const handleProviderBlur = (name) => {
        setProvidersObject({ ...providersObject, [name]: { ...providersObject[name], focussed: false } })
    }
    const handleProviderChange = (name, text) => {
        //  console.log(name, text);
        setProvidersObject({ ...providersObject, [name]: { ...providersObject[name], value: parseInt(text) } })
    }

    const handleSecondScreen = () => { setShowSecond(true) }
    const arraySum = (items, prop) => {
        return items.reduce((a, b) => { return a + b[prop] }, 0)
    }
    const handleSecondBack = () => { setNumberOfAdmins(''); setNumberOfProviders(''); setShowSecond(false); setUpsellObject({ focussed: false, value: '' }) }
    const handleSecondNext = () => {
        setShowSecond(false);
        setReviewMetAmount(parseInt(upsellObject.value.replace(',', '')) * 0.05);
        //  console.log(upsellObject.value*0.05)
        setReviewNotMetAmount(parseInt(upsellObject.value.replace(',', '')) * 0.03);
        setTotalHours(arraySum(Object.values(adminsObject), 'value') + arraySum(Object.values(providersObject), 'value'))
        // console.log(Object.values(adminsObject), Object.keys(providersObject)) 
        setShowFinal(true)
    }
    const handleFinalBack = () => {
        console.log(adminsObject)
        setShowSecond(true);
        setShowFinal(false);
    }
    useEffect(() => {
        console.log('use Effect is running')
        let tempObj = {};
        for (let i = 0; i < numberOfAdmins; i++) {
            var name = `admin${i + 1}hours`;
            tempObj = { ...tempObj, [name]: { focussed: false, value: '' } }
            //console.log(tempObj);
        }
        setAdminsObject(tempObj)
    }, [numberOfAdmins])
    useEffect(() => {
        let tempObj = {}
        for (let j = 0; j < numberOfProviders; j++) {
            var name = `provider${j + 1}hours`;
            tempObj = { ...tempObj, [name]: { focussed: false, value: '' } }
        }
        setProvidersObject(tempObj)

    }, [numberOfProviders])
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
    /*  const createBackAlert = () => Alert.alert(
        "Are you sure??",
        "You are about to go back!",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          { text: "OK", onPress: handleSecondBack }
        ],
        { cancelable: false }
      );  */
    return (<Fragment>
        <View style={{ flexDirection: 'row', marginTop: 25 }}>
            <View style={{ width: '15%', marginTop: 9 }}>
                <IconButton icon='home' onPress={createExitAlert} size={30} color='#01718f' style={{ marginLeft: '5%' }} />
            </View>
            <View style={{ flex: 1, alignItems: 'center', marginTop: 25, width: '70%' }}>
                <Text style={{ fontSize: 23, color: '#01718f' }}>Commission Calculator</Text>
            </View>
            <View style={{ width: '15%' }}></View>
        </View>
        <Divider />
        {(!showSecond && !showFinal) ? <View><View style={{ alignItems: 'center' }}>

            <Dropdown label='No. of Admins' value={numberOfAdmins} data={dropdown_data} containerStyle={{ width: 150, margin: 15, marginTop: 0 }}
                textColor='black' baseColor='black' onChangeText={(value) => setNumberOfAdmins(value)} />
            <Dropdown label='No. of Providers' value={numberOfProviders} data={dropdown_data} containerStyle={{ width: 150, margin: 15, marginTop: 0 }}
                textColor='black' baseColor='black' onChangeText={(value) => setNumberOfProviders(value)} />
        </View>
            <View style={{ alignItems: 'center' }}><Divider style={{ width: '50%' }} /></View>
            <View style={{ alignItems: 'center' }}>
                <AreaButton title="Next" onPress={handleSecondScreen} disabled={numberOfAdmins === '' || numberOfProviders === ''} />
            </View></View> : null}
        {showSecond ? <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"} style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>

                <View style={{ alignItems: 'center', marginTop: 25, width: 350 }}>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '15%', marginTop: 18, alignItems: 'center' }}><Text style={{ fontSize: 25 }}>{(upsellObject.focussed || upsellObject.value !== '') ? '$' : null}</Text></View>
                        <View style={{ width: '65%' }}><TextInput baseColor="black"
                            onBlur={() => { setUpsellObject({ ...upsellObject, focussed: false }) }}
                            onFocus={() => { setUpsellObject({ ...upsellObject, focussed: true }) }} keyboardType='numeric' label='Upsell Total' value={upsellObject.value}
                            theme={{ colors: { primary: '#01718f' } }} onChangeText={(text) => { handleUpsellChange(text) }} /></View>
                        <View style={{ width: '20%' }}><Text>&nbsp;</Text>
                        </View></View>

                    {Array.from(Array(numberOfAdmins), (e, i) => {
                        var label = `Admin ${i + 1} Hours`;
                        var name = `admin${i + 1}hours`;
                        //  setAdminsObject({...adminsObject, [name]:{focussed:false, value: ''}})

                        // console.log('array function provider');
                        return <View key={label} style={{ flexDirection: 'row', marginTop: 20 }}>
                            <View style={{ width: '15%', marginTop: 1, alignItems: 'center' }}><Text style={{ fontSize: 30 }}>&nbsp;</Text></View>
                            <View style={{ width: '65%' }}><TextInput name={name} key={label} baseColor="black" onFocus={() => { handleAdminFocus(name) }} onBlur={() => { handleAdminBlur(name) }} keyboardType='numeric' label={label}
                                theme={{ colors: { primary: '#01718f' } }} value={adminsObject[name].value.toString()} onChangeText={(text) => handleAdminChange(name, text)} /></View>
                            <View style={{ width: '20%', marginTop: 16, alignItems: 'center' }}>{<Text style={{ fontSize: 25 }}>{(adminsObject[name].focussed || adminsObject[name].value !== "") ? 'Hrs.' : null}</Text>}
                            </View></View>
                    })
                    }
                    {Array.from(Array(numberOfProviders), (e, i) => {
                        var label = `Provider ${i + 1} Hours`;
                        var name = `provider${i + 1}hours`;
                        // providerArray.push({key: name, value: 0})

                        // console.log('array function provider');
                        return <View key={label} style={{ flexDirection: 'row', marginTop: 20 }}>
                            <View style={{ width: '15%', marginTop: 1, alignItems: 'center' }}><Text style={{ fontSize: 30 }}>&nbsp;</Text></View>
                            <View style={{ width: '65%' }}><TextInput name={name} key={label} baseColor="black" onFocus={() => { handleProviderFocus(name) }} onBlur={() => { handleProviderBlur(name) }} keyboardType='numeric' label={label}
                                theme={{ colors: { primary: '#01718f' } }} value={providersObject[name].value.toString()} onChangeText={(text) => handleProviderChange(name, text)} /></View>
                            <View style={{ width: '20%', marginTop: 16, alignItems: 'center' }}><Text style={{ fontSize: 25 }}>{(providersObject[name].focussed || providersObject[name].value !== "") ? 'Hrs.' : null}</Text>
                            </View></View>
                    })
                    }
                </View>
                <View style={{ alignItems: 'center', marginTop: 15 }}><Divider style={{ width: '50%' }} /></View>
                <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                    <AreaButton title="Back" onPress={handleSecondBack} disabled={numberOfAdmins === '' || numberOfProviders === ''} />
                    <AreaButton title="Next" onPress={handleSecondNext} disabled={isEmptyObject(adminsObject) || isEmptyObject(providersObject) || (upsellObject.value === '')} />
                </View>
            </ScrollView></KeyboardAvoidingView> : null}
        {showFinal ? <ScrollView><View style={{ alignItems: 'center', marginTop: 15 }}>
            <Text style={{ fontSize: 30, color: '#01718f' }}>Upsell Total: ${upsellObject.value}</Text>
            <View style={{ width: '50%', margin: 15 }}><Divider /></View>
            <View style={{ flexDirection: 'row', marginTop: 10, width: '95%' }}>
                <View style={{ width: '50%', alignItems: 'center', borderRightWidth: 1 }}><Text style={{ fontSize: 19, margin: 5, color: '#01718f', fontWeight: '600' }}>Review Goals Met</Text></View>
                <View style={{ width: '50%', alignItems: 'center' }}><Text style={{ fontSize: 19, margin: 5, color: '#01718f', fontWeight: '600' }}>Review Goals Not Met</Text></View>
            </View>
            <View style={{ width: '50%', margin: 15 }}><Divider /></View>
            <View style={{ flexDirection: 'row', marginTop: 10, width: '95%' }}>
                <View style={{ width: '50%', alignItems: 'center', borderRightWidth: 1 }}><Text style={{ fontSize: 17, margin: 5, color: '#01718f' }}>Commission Amount: ${reviewMetAmount}</Text></View>
                <View style={{ width: '50%', alignItems: 'center' }}><Text style={{ fontSize: 17, margin: 5, color: '#01718f' }}>Commission Amount: ${reviewNotMetAmount}</Text></View>
            </View>
            <View style={{ width: '50%', margin: 10 }}><Divider /></View>
            <View style={{ flexDirection: 'row', marginTop: 10, width: '95%' }}>
                <View style={{ width: '50%', alignItems: 'center', borderRightWidth: 1 }}>
                    <View style={{ width: 150 }}>{Object.keys(adminsObject).map(function (key, index) {
                        return <Text key={key} style={{ fontSize: 17, margin: 5 }}>Admin {index + 1}: ${parseInt((adminsObject[key].value / totalHours) * reviewMetAmount)}&nbsp;&nbsp;&nbsp;</Text>
                    })}
                        {Object.keys(providersObject).map(function (key, index) {
                            return <Text key={key} style={{ fontSize: 17, margin: 5 }}>Provider {index + 1}: ${parseInt((providersObject[key].value / totalHours) * reviewMetAmount)}</Text>
                        })}
                    </View>
                </View>
                <View style={{ width: '50%', alignItems: 'center' }}>
                    <View style={{ width: 150 }}>{Object.keys(adminsObject).map(function (key, index) {
                        return <Text key={key} style={{ fontSize: 17, margin: 5 }}>Admin {index + 1}: ${parseInt((adminsObject[key].value / totalHours) * reviewNotMetAmount)}&nbsp;&nbsp;&nbsp;</Text>
                    })}
                        {Object.keys(providersObject).map(function (key, index) {
                            return <Text key={key} style={{ fontSize: 17, margin: 5 }}>Provider {index + 1}: ${parseInt((providersObject[key].value / totalHours) * reviewNotMetAmount)}</Text>
                        })}</View>
                </View>
            </View>
            <View style={{ width: '50%', marginTop: 15 }}><Divider /></View>
            <View style={{ marginTop: 25 }}><AreaButton title='Back' onPress={handleFinalBack} /></View>
        </View></ScrollView> : null}
    </Fragment>
    )
}

export default StoreRankCalculator
