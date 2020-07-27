import React, { useState, useEffect, useLayoutEffect, Fragment, useRef } from 'react';
import { View, ScrollView, Dimensions, StyleSheet, FlatList, TouchableOpacity, Picker, Alert } from 'react-native';
import { TextInput, ToggleButton, RadioButton, Divider, Text, Button, IconButton, Colors, HelperText } from 'react-native-paper'
import stylesGlobal from '../../Styles.js';
//import FormButton from '../util/FormButton.js';
import * as ScreenOrientation from 'expo-screen-orientation';
import AreaButton from '../util/AreaButton.js'
import ViewWithHide from '../util/ViewWithHide.js';
//import console = require('console');
import { Dropdown } from 'react-native-material-dropdown-v2';
import { db } from '../util/db.js';
import NumberFormat from 'react-number-format';
import { emailSender } from '../util/emailSender.js';
import axios from 'axios';
import * as MediaLibrary from 'expo-media-library';
//import { captureScreen } from "react-native-view-shot";
import ViewShot from 'react-native-view-shot';
function QuoteCalculatorSecondScreen({ route, navigation }) {
  const [discount, setDiscount] = useState(0.5);
  const [pif, setPif] = useState(0);
  const [printSuccess, setPrintSuccess] = useState(false);
  // const screenWidth = Dimensions.get('window').width;
  // const respFontSize = Math.round(0.02*screenWidth);
  // console.log(respFontSize);
  const [reliefBonus, setReliefBonus] = useState(0);
  let privateSale = 0;
  //const constant = 1;
  const [bodyAreasArray, setBodyAreasArray] = useState([]);

  const [options, setOptions] = useState({});

  const _onOrientationDidChange = (orientation) => {
    if (orientation == 'PORTRAIT') {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    }
  };
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    // Orientation.addOrientationListener(_onOrientationDidChange);
    ScreenOrientation.addOrientationChangeListener(_onOrientationDidChange)
  })

  useEffect(() => {
    setOptions(route.params.options);
    var tempBodyAreasArray = [];
    console.log('use Effect ran')
    const snapshot = db.collection('bodyAreas')
    snapshot.get().then(querySnapshot => {
      querySnapshot.docs.map((doc) => {
        tempBodyAreasArray.push({ id: doc.id, ...doc.data() })
        // setBodyAreasArray([...bodyAreasArray, { id: doc.id, ...doc.data() }])
      })
      setBodyAreasArray(tempBodyAreasArray);
      var settingsObj = tempBodyAreasArray.find(obj => obj.id === 'settings');
      setDiscount(settingsObj.default_discount);
      setDiscount1(settingsObj.default_discount);
      setDiscount2(settingsObj.default_discount);
      setDiscount3(settingsObj.default_discount);
      setPif(settingsObj.pay_in_full);
      setReliefBonus(settingsObj.relief_bonus);
    })
  }, [])


  const [state, setState] = useState({ value: 'option1' });
  const [tabs, setTabs] = useState({ faceTab: false, underarmTab: false, torsoTab: false, bikiniTab: false, legsTab: false, fullBodyTab: false })
  const [printMode, setPrintMode] = useState(false);
  const [fee, setFee] = useState(0);
  const [months1, setMonths1] = useState(24);
  const [months2, setMonths2] = useState(24);
  const [months3, setMonths3] = useState(24);
  // const months1 = 24; const months2 = 24; const months3 = 24;
  //const addArea = (id) => {`areas${1}`.push({name: bodyAreasArray[id].name}); console.log(areas1)}
  const [areas1, setAreas1] = useState([]);
  //console.log(areas1);
  const [areas2, setAreas2] = useState([]);
  const [areas3, setAreas3] = useState([]);
  const [discount1, setDiscount1] = useState(0.5)
  const [discount2, setDiscount2] = useState(0.5);
  const [discount3, setDiscount3] = useState(0.5);
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [showEmailSection, setShowEmailSection] = useState(false);
  const [showManagersSection, setShowManagersSection] = useState(false);
  //let emailError = false;
  const [emailError, setEmailError] = useState(false);
  const [subjectError, setSubjectError] = useState(false)
  // let subjectError= false;
  let discount_data = [];
  if (options.mode === 'previous treatments') {
    discount_data = [
      { value: 0.3, label: '30%' }, { value: 0.4, label: '40%' },
      { value: 0.5, label: '50%' }, { value: 0.6, label: '60%' }, { value: 0.7, label: '70%' }];
  }
  else {
    discount_data = [
      { value: 0.3, label: '30%' }, { value: 0.4, label: '40%' },
      { value: 0.5, label: '50%' }, { value: 0.6, label: '60%' }]
  }

  options.mode === 'discount code' ? options.disc_code === 500 ? privateSale = 500 : privateSale = 250 : null;
  let fee_data = [
    { value: 0, label: 'No Fee' }, { value: 0.01, label: 'Denver South' },
    { value: 0.0075, label: 'Colorado Springs' }, { value: 0.005, label: 'Denver East' }];
  //const areaButtonClick = (id) => { console.log(id) }
  const addArea = (id) => {
    console.log(id)
    // console.log(bodyAreasArray);
    var result = bodyAreasArray.find(obj => obj.id === id);
    // console.log(result);
    if (state.value === 'option1') { setAreas1([...areas1, { id, name: result.name, price: result.price }]) }
    else if (state.value === 'option2') { setAreas2([...areas2, { id, name: result.name, price: result.price }]) }
    else if (state.value === 'option3') { setAreas3([...areas3, { id, name: result.name, price: result.price }]) }

  }
  const addFullBody = (id) => {
    //console.log(id)
    // console.log(bodyAreasArray);
    var result = bodyAreasArray.find(obj => obj.id === id);
    //console.log(result);
    if (state.value === 'option1') { setAreas1([{ id, name: result.name, price: result.price }]) }
    else if (state.value === 'option2') { setAreas2([{ id, name: result.name, price: result.price }]) }
    else if (state.value === 'option3') { setAreas3([{ id, name: result.name, price: result.price }]) }

  }
  const ClearHandler = () => {
    if (state.value === 'option1') { setAreas1([]) }
    else if (state.value === 'option2') { setAreas2([]) }
    else if (state.value === 'option3') { setAreas3([]) }

  }
  const checkDisabled = (id) => {
    if (state.value === 'option1') { let obj = areas1.find(area => area.id === id); return (obj === undefined) ? false : true }
    else if (state.value === 'option2') { let obj = areas2.find(area => area.id === id); return (obj === undefined) ? false : true }
    else if (state.value === 'option3') { let obj = areas3.find(area => area.id === id); return (obj === undefined) ? false : true }
  }
  const removeArea1 = (id) => {
    var tempArray = areas1; tempArray = tempArray.filter(area => area.id !== id);
    console.log(tempArray);
    setAreas1(tempArray);
    console.log(id)

  }
  const removeArea2 = (id) => {
    var tempArray = areas2; tempArray = tempArray.filter(area => area.id !== id);
    setAreas2(tempArray);
    console.log(id)

  }
  const removeArea3 = (id) => {
    var tempArray = areas3; tempArray = tempArray.filter(area => area.id !== id);
    setAreas3(tempArray);
    console.log(id);

  }
  const arraySum = (items, prop) => {
    return items.reduce((a, b) => { return a + b[prop] }, 0)
  }
  const toggleTabs = (tabName) => { setTabs({ ...tabs, [tabName]: !tabs[tabName] }) }
  const currencyFormat0 = (amount) => {
   // console.log(amount.toFixed(0));
    return Number(amount)
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

  }
  const currencyFormat2 = (amount) => {
    return Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }
  const sendEQuote = () => {
    console.log('Email Function');
  }
  useEffect(() => {
    console.log('Areas1 use Effect ran')
    let obj = areas1.find(i => i.id === 'full_body');
    console.log(discount);
    console.log(obj);
    ((areas1.length > 1 || obj !== undefined)) && options.months === 36 ? setMonths1(36) : setMonths1(24);
    (obj !== undefined) ? (discount === 0.6 || discount === 0.7) ? setDiscount1(0.5) : setDiscount1(discount) : setDiscount1(discount)
  }, [areas1])
  useEffect(() => {
    let obj = areas2.find(i => i.id === 'full_body');
    ((areas2.length > 1 || obj !== undefined)) && options.months === 36 ? setMonths2(36) : setMonths2(24);
    (obj !== undefined) ? (discount === 0.6 || discount === 0.7) ? setDiscount2(0.5) : setDiscount2(discount) : setDiscount2(discount)
  }, [areas2])
  useEffect(() => {
    let obj = areas3.find(i => i.id === 'full_body');
    ((areas3.length > 1 || obj !== undefined) && options.months === 36) ? setMonths3(36) : setMonths3(24);
    (obj !== undefined) ? (discount === 0.6 || discount === 0.7) ? setDiscount3(0.5) : setDiscount3(discount) : setDiscount3(discount)
  }, [areas3])
  const today = new Date().toDateString();
  var date = new Date(), y = date.getFullYear(), m = date.getMonth();
  var firstDay = new Date(y, m, 1);
  var lastDay = new Date(y, m + 1, 0).toDateString();
  const [emailResponse, setEmailResponse] = useState(false);
  const checkFullBody = (area) => {
    if (area === 1) { let obj = areas1.find(i => i.id === 'full_body'); return (obj === undefined) ? false : true }
    else if (area === 2) { let obj = areas2.find(i => i.id === 'full_body'); return (obj === undefined) ? false : true }
    else if (area === 3) { let obj = areas3.find(i => i.id === 'full_body'); return (obj === undefined) ? false : true }
  }
  const createExitAlert = () => Alert.alert(
    "Are you sure??",
    "You are about to exit this Quote!",
    [
      {
        text: "Cancel",
        style: "cancel"
      },
      { text: "OK", onPress: () => navigation.goBack() }
    ],
    { cancelable: false }
  );
  const emailObject = {
    email_subject: subject,
    recipient_address: email,
    areas: areas1,
    areas1: areas2,
    areas2: areas3,
    discount: 1 - discount,
    months: months1,
    months1: months2,
    months2: months3,
    total: arraySum(areas1, 'price'),
    total1: arraySum(areas2, 'price'),
    total2: arraySum(areas3, 'price'),
    private_sale: privateSale,
    pif: 1 - pif,
    full_body: checkFullBody(1),
    full_body_1: checkFullBody(2),
    full_body_2: checkFullBody(3),
    issued: today,
    expired: lastDay,
    relief_bonus: reliefBonus
  }

  const discountChangeHandler = (discountVar) => {
    setDiscount(discountVar);
    setDiscount1(discountVar);
    setDiscount2(discountVar);
    setDiscount3(discountVar);
    let obj = areas1.find(i => i.id === 'full_body');
    (obj !== undefined) ? (discountVar === 0.6 || discountVar === 0.7) ? setDiscount1(0.5) : setDiscount1(discountVar) : setDiscount1(discountVar)
    let obj2 = areas2.find(i => i.id === 'full_body');
    (obj2 !== undefined) ? (discountVar === 0.6 || discountVar === 0.7) ? setDiscount2(0.5) : setDiscount2(discountVar) : setDiscount2(discountVar)
    let obj3 = areas3.find(i => i.id === 'full_body');
    (obj3 !== undefined) ? (discountVar === 0.6 || discountVar === 0.7) ? setDiscount3(0.5) : setDiscount3(discountVar) : setDiscount3(discountVar)
  }

  const handleEmailSender = () => {
    console.log(emailObject);
    console.log('handle EMail Func');
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError(false)
    }
    else { setEmailError(true) }
    if (subject === '') { setSubjectError(true) } else { setSubjectError(false) }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && subject !== '') {
      console.log('ready to go');
      axios.post('https://milanlaser.com/quote/april2020/send_email.php', emailObject, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Cache-Control': 'no-cache'
        }
      })
        .then(function (response) {
          // console.log(response);
          setEmailResponse(true);
          setEmail('');
          setSubject('');
          setEmailError(false);
          setSubjectError(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  /*  useEffect(()=>{
    printMode? captureScreen({
        format: "jpg",
        quality: 0.8
      })
        .then(
          uri => {MediaLibrary.saveToLibraryAsync(uri), setPrintMode(false), navigation.navigate('PrintSuccess')},
          error => console.error("Oops, snapshot failed", error)
        ) : null
        },[printMode]) */
  const viewShotRef = useRef();
  useEffect(() => {

    printMode ? viewShotRef.current.capture().then(uri => {
      MediaLibrary.saveToLibraryAsync(uri), setPrintMode(false), navigation.navigate('PrintSuccess')
    }) : null
  }, [printMode])

  //const [emailError, setEmailError] = useState(false);
  //const [subjectError, setSubjectError] = useState(false);
  return (
    <ScrollView style={{ marginTop: 15, marginLeft: 5, marginRight: 5 }}>

      {printMode === false ? <Fragment><View style={{ flexDirection: 'row' }}>
        <View style={{ width: '15%', marginTop: 18 }}>
          <AreaButton title="Go Back" onPress={createExitAlert} size={40} color='#01718f' style={{ marginLeft: 35 }} />
        </View>
        <View style={{ flex: 1, alignItems: 'center', marginTop: 25, width: '70%' }}>
          <ToggleButton.Row
            onValueChange={value => setState({ value })}
            value={state.value}
          >
            <ToggleButton icon='numeric-1' value="option1" />
            <ToggleButton icon="numeric-2" value="option2" />
            <ToggleButton icon="numeric-3" value="option3" />
          </ToggleButton.Row>
        </View>
        <View style={{ width: '15%' }}></View>
      </View>

        <View style={{ margin: 15, marginTop: 55 }}>
          <TouchableOpacity onPress={() => { toggleTabs('faceTab') }}><Text style={{ fontSize: 17 }}>+ Face/Neck</Text></TouchableOpacity>
        </View>
        <ViewWithHide style={{ marginHorizontal: 65, marginVertical: 0, flexDirection: 'row', flexWrap: 'wrap' }} hide={tabs.faceTab}>

          <AreaButton title="Upper Lip" id="upper_lip" onPress={addArea} disabled={checkDisabled('upper_lip')} />
          <AreaButton title="Chin" id="chin" onPress={addArea} disabled={checkDisabled('chin')} />
          <AreaButton title="Neck" id="neck" onPress={addArea} disabled={checkDisabled('neck')} />
          <AreaButton title="Full Face &amp; Neck" id="full_face_neck" onPress={addArea} disabled={checkDisabled('full_face_neck')} />
          <AreaButton title="Neckline" id="neckline" onPress={addArea} disabled={checkDisabled('neckline')} />
          <AreaButton title="Ears" id="ears" onPress={addArea} disabled={checkDisabled('ears')} />
          <AreaButton title="Unibrow" id="unibrow" onPress={addArea} disabled={checkDisabled('unibrow')} />
          <AreaButton title="Jawline" id="jawline" onPress={addArea} disabled={checkDisabled('jawline')} />
          <AreaButton title="Sideburns" id="sideburns" onPress={addArea} disabled={checkDisabled('sideburns')} />
          <AreaButton title="Cheeks" id="cheeks" onPress={addArea} disabled={checkDisabled('cheeks')} />
        </ViewWithHide>

        <View style={{ margin: 15, marginTop: 15 }}>
          <TouchableOpacity onPress={() => { toggleTabs('underarmTab') }}><Text style={{ fontSize: 17 }}>+ Underarms/Arms</Text></TouchableOpacity>
        </View>
        <ViewWithHide style={{ marginHorizontal: 65, marginVertical: 0, flexDirection: 'row', flexWrap: 'wrap' }} hide={tabs.underarmTab}>

          <AreaButton title="Underarms" id="underarms" onPress={addArea} disabled={checkDisabled('underarms')} />
          <AreaButton title="Forearms" id="forearms" onPress={addArea} disabled={checkDisabled('forearms')} />
          <AreaButton title="Full Arms" id="full_arms" onPress={addArea} disabled={checkDisabled('full_arms')} />
          <AreaButton title="Hands" id="hands" onPress={addArea} disabled={checkDisabled('hands')} />
          <AreaButton title="Upper Arms" id="upper_arms" onPress={addArea} disabled={checkDisabled('upper_arms')} />
        </ViewWithHide>
        <View style={{ margin: 15, marginTop: 15 }}>
          <TouchableOpacity onPress={() => { toggleTabs('torsoTab') }}><Text style={{ fontSize: 17 }}>+ Torso</Text></TouchableOpacity>
        </View>
        <ViewWithHide style={{ marginHorizontal: 65, marginVertical: 0, flexDirection: 'row', flexWrap: 'wrap' }} hide={tabs.torsoTab}>

          <AreaButton title="Female Chest" id="female_chest" onPress={addArea} disabled={checkDisabled('female_chest')} />
          <AreaButton title="Male Chest" id="male_chest" onPress={addArea} disabled={checkDisabled('male_chest')} />
          <AreaButton title="Half Back" id="half_back" onPress={addArea} disabled={checkDisabled('half_back')} />
          <AreaButton title="Full Back" id="full_back" onPress={addArea} disabled={checkDisabled('full_back')} />
          <AreaButton title="Shoulders" id="shoulders" onPress={addArea} disabled={checkDisabled('shoulders')} />
          <AreaButton title="Abdomen" id="abdomen" onPress={addArea} disabled={checkDisabled('abdomen')} />
          <AreaButton title="Navel" id="navel" onPress={addArea} disabled={checkDisabled('navel')} />
          <AreaButton title="Breast/Areola" id="areola" onPress={addArea} disabled={checkDisabled('areola')} />
          <AreaButton title="Front T-Shirt" id="front_t" onPress={addArea} disabled={checkDisabled('front_t')} />
          <AreaButton title="Back T-Shirt" id="back_t" onPress={addArea} disabled={checkDisabled('back_t')} />
          <AreaButton title="Full T-Shirt" id="full_t" onPress={addArea} disabled={checkDisabled('full_t')} />
          <AreaButton title="Chest &amp; Abs" id="chestnabs" onPress={addArea} disabled={checkDisabled('chestnabs')} />

        </ViewWithHide>
        <View style={{ margin: 15, marginTop: 15 }}>
          <TouchableOpacity onPress={() => { toggleTabs('bikiniTab') }}><Text style={{ fontSize: 17 }}>+ Bikini/Buttocks</Text></TouchableOpacity>
        </View>
        <ViewWithHide style={{ marginHorizontal: 65, marginVertical: 0, flexDirection: 'row', flexWrap: 'wrap' }} hide={tabs.bikiniTab}>
          <AreaButton title="Bikini Line" id="bikini_line" onPress={addArea} disabled={checkDisabled('bikini_line')} />
          <AreaButton title="Brazilian" id="brazilian" onPress={addArea} disabled={checkDisabled('brazilian')} />
          <AreaButton title="Buttocks" id="buttocks" onPress={addArea} disabled={checkDisabled('buttocks')} />
          <AreaButton title="Perirectal" id="perirectal" onPress={addArea} disabled={checkDisabled('perirectal')} />
        </ViewWithHide>
        <View style={{ margin: 15, marginTop: 15 }}>
          <TouchableOpacity onPress={() => { toggleTabs('legsTab') }}><Text style={{ fontSize: 17 }}>+ Legs/Feet</Text></TouchableOpacity>
        </View>
        <ViewWithHide style={{ marginHorizontal: 65, marginVertical: 0, flexDirection: 'row', flexWrap: 'wrap' }} hide={tabs.legsTab}>
          <AreaButton title="Upper Legs" id="upper_legs" onPress={addArea} disabled={checkDisabled('upper_legs')} />
          <AreaButton title="Lower Legs" id="lower_legs" onPress={addArea} disabled={checkDisabled('lower_legs')} />
          <AreaButton title="Full Legs" id="full_legs" onPress={addArea} disabled={checkDisabled('full_legs')} />
          <AreaButton title="Feet/Toes" id="feet" onPress={addArea} disabled={checkDisabled('feet')} />
        </ViewWithHide>
        <View style={{ margin: 15, marginTop: 15 }} hide='true'>
          <TouchableOpacity onPress={() => { toggleTabs('fullBodyTab') }}><Text style={{ fontSize: 17 }}>+ FullBody/Upgrades</Text></TouchableOpacity>
        </View>
        <ViewWithHide style={{ marginHorizontal: 65, marginVertical: 0, flexDirection: 'row', flexWrap: 'wrap' }} hide={tabs.fullBodyTab}>

          <AreaButton title="Full Body" id="full_body" onPress={addFullBody} disabled={checkDisabled('full_body')} />
          <AreaButton title="Bikini Line to Brazilian" id="up_braz" onPress={addArea} disabled={checkDisabled('up_braz')} />
          <AreaButton title="Upper/Lower Legs to Full Legs" id="up_full_legs" onPress={addArea} disabled={checkDisabled('up_full_legs')} />
          <AreaButton title="Lip & Chin to Full Face & Neck" id="up_full_face" onPress={addArea} disabled={checkDisabled('up_full_face')} />
          <AreaButton title="Forearms to Full Arms" id="up_full_arms" onPress={addArea} disabled={checkDisabled('up_full_arms')} />
          <AreaButton title="Half Back to Full Back" id="up_full_back" onPress={addArea} disabled={checkDisabled('up_full_back')} />
          <AreaButton title="Front/Back to Full T-Shirt" id="up_full_t" onPress={addArea} disabled={checkDisabled('up_full_t')} />
          <AreaButton title="Front/Back to Full T-Shirt" id="up_chestnab" onPress={addArea} disabled={checkDisabled('up_chestnab')} />
        </ViewWithHide>
        <Divider />
        <View style={{ alignItems: 'flex-end' }}>
          <View style={{ width: '25%', marginRight: 15 }}>
            <AreaButton title="Clear this option" onPress={ClearHandler} darkGray /></View>
        </View></Fragment> : null}
      <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 0.9 }}>
        {printMode ? <View style={{ height: 100, marginTop: 50, alignItems: 'center' }}>
          <Text style={{ fontSize: 25, color: '#01718f' }}>Milan Laser Custom Quote</Text>
        </View> : null}
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Dropdown label='Discount' value={discount} data={discount_data} containerStyle={{ width: '20%', margin: 15, marginTop: 0 }}
            textColor='black' baseColor='black' onChangeText={(value) => discountChangeHandler(value)} />
          <Dropdown label='Fees' value={fee} data={fee_data} containerStyle={{ width: '20%', margin: 15, marginTop: 0 }}
            textColor='black' baseColor='black' onChangeText={(value) => setFee(value)} />
        </View>
        <Divider />
        <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 25 }}>
          <View style={{ width: '33%', alignItems: 'center', borderRightWidth: 1 }}>

            {areas1.map(area => <View key={area.id} style={{ flexDirection: 'row' }}>
              <View style={{ width: '35%', marginLeft: '5%' }}><Text>{area.name}</Text></View>
              <View style={{ width: '20%' }}><Text style={{ textDecorationLine: 'line-through' }}>${currencyFormat0(area.price / months1)}</Text></View>
              <View style={{ width: '20%' }}><Text>${currencyFormat0((area.price * (1 - discount1)) / months1)}</Text></View>
              <View style={{ width: '17%', marginRight: '3%', alignItems: 'center' }}><IconButton icon="trash-can-outline" size={20} style={{ marginTop: -6 }}
                onPress={() => { removeArea1(area.id) }} /></View>
            </View>)
            }
          </View>

          <View style={{ width: '33%', alignItems: 'center', borderRightWidth: 1 }}>
            {areas2.map(area => <View key={area.id} style={{ flexDirection: 'row' }}>
              <View style={{ width: '35%', marginLeft: '5%' }}><Text>{area.name}</Text></View>
              <View style={{ width: '20%' }}><Text style={{ textDecorationLine: 'line-through' }}>${currencyFormat0(area.price / months2)}</Text></View>
              <View style={{ width: '20%' }}><Text>${currencyFormat0((area.price * (1 - discount2)) / months2)}</Text></View>
              <View style={{ width: '17%', marginRight: '3%', alignItems: 'center' }}><IconButton icon="trash-can-outline" size={20} style={{ marginTop: -6 }}
                onPress={() => { removeArea2(area.id) }} /></View>
            </View>)
            }
          </View>

          <View style={{ width: '33%', alignItems: 'center' }}>
            {areas3.map(area => <View key={area.id} style={{ flexDirection: 'row' }}>
              <View style={{ width: '35%', marginLeft: '5%' }}><Text>{area.name}</Text></View>
              <View style={{ width: '20%' }}><Text style={{ textDecorationLine: 'line-through' }}>${currencyFormat0(area.price / months3)}</Text></View>
              <View style={{ width: '20%' }}><Text>${currencyFormat0((area.price * (1 - discount3)) / months3)}</Text></View>
              <View style={{ width: '17%', marginRight: '3%', alignItems: 'center' }}><IconButton icon="trash-can-outline" size={20} style={{ marginTop: -6 }}
                onPress={() => { removeArea3(area.id) }} /></View>
            </View>)
            }
          </View>
        </View>
        {(areas1.length > 0 || areas2.length > 0 || areas3.length > 0) ? <View>
          <Divider />
          <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 25 }}>
            <View style={{ width: '33%', alignItems: 'center', borderRightWidth: 1 }}>
              {(areas1.length > 0) ?
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ fontSize: 40, fontWeight: 'bold', color: '#01718f' }}>${currencyFormat0(((((arraySum(areas1, 'price') - privateSale) * (1 - discount1)) - reliefBonus) / months1)* (1 + fee)) }</Text>
                  <Text style={{ fontSize: 18, color: 'gray' }}>per month for {months1} months</Text>
                  <View style={{ alignItems: 'flex-start', marginTop: 15 }}>
                    {privateSale > 0 ? <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                      <Text style={{ fontSize: 16, color: 'gray' }}>Private Sale : </Text>
                      <Text style={{ color: '#01718f', fontSize: 16 }}>${privateSale} </Text>
                    </View> : null}
                    {reliefBonus > 0 ? <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                      <Text style={{ fontSize: 16, color: 'gray' }}>Relief Bonus : </Text>
                      <Text style={{ color: '#01718f', fontSize: 16 }}>${reliefBonus} </Text>
                    </View> : null}
                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                      <Text style={{ fontSize: 13, color: 'gray' }}>Total Cost ({discount1 * 100}%): </Text>
                      <Text style={{ textDecorationLine: 'line-through', color: '#01718f', fontSize: 13 }}>${currencyFormat0(arraySum(areas1, 'price'))} </Text>
                      <Text style={{ color: '#01718f', fontSize: 13 }}>${currencyFormat0(((arraySum(areas1, 'price') - privateSale) * (1 - discount1)) - reliefBonus)} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                      <Text style={{ fontSize: 16, color: 'gray' }}>Your Cost: </Text>
                      <Text style={{ color: '#01718f', fontSize: 16 }}>${currencyFormat0(((arraySum(areas1, 'price') - privateSale) * (1 - discount1)) - reliefBonus)} </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontSize: 16, color: 'gray' }}>Total Savings: </Text>
                      <Text style={{ color: '#01718f', fontSize: 16 }}>${currencyFormat0((arraySum(areas1, 'price')) - (((arraySum(areas1, 'price') - privateSale) * (1 - discount1))) - reliefBonus)} </Text>
                    </View>
                    {(pif > 0) ? <View style={{ flexDirection: 'row', marginTop: 5 }}>
                      <Text style={{ fontSize: 16, color: 'gray' }}>Pay in Full: </Text>
                      <Text style={{ color: '#01718f', fontSize: 16 }}>${currencyFormat0(((((arraySum(areas1, 'price') - privateSale) * (1 - discount1)) - reliefBonus) * (1 - pif)))} </Text>
                    </View> : null}
                  </View>
                </View> : null}
            </View>
            <View style={{ width: '33%', alignItems: 'center', borderRightWidth: 1 }}>
              {(areas2.length > 0) ? <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 40, fontWeight: 'bold', color: '#01718f' }}>${currencyFormat0(((((arraySum(areas2, 'price') - privateSale) * (1 - discount2)) - reliefBonus) / months2)* (1 + fee)) }</Text>
                <Text style={{ fontSize: 18, color: 'gray' }}>per month for {months2} months</Text>
                <View style={{ alignItems: 'flex-start', marginTop: 15 }}>
                  {privateSale > 0 ? <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text style={{ fontSize: 16, color: 'gray' }}>Private Sale : </Text>
                    <Text style={{ color: '#01718f', fontSize: 16 }}>${privateSale} </Text>
                  </View> : null}
                  {reliefBonus > 0 ? <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text style={{ fontSize: 16, color: 'gray' }}>Relief Bonus : </Text>
                    <Text style={{ color: '#01718f', fontSize: 16 }}>${reliefBonus} </Text>
                  </View> : null}
                  <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text style={{ fontSize: 13, color: 'gray' }}>Total Cost ({discount2 * 100}%): </Text>
                    <Text style={{ textDecorationLine: 'line-through', color: '#01718f', fontSize: 13 }}>${currencyFormat0(arraySum(areas2, 'price'))} </Text>
                    <Text style={{ color: '#01718f', fontSize: 13 }}>${currencyFormat0(((arraySum(areas2, 'price') - privateSale) * (1 - discount2)) - reliefBonus)} </Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text style={{ fontSize: 18, color: 'gray' }}>Your Cost: </Text>
                    <Text style={{ color: '#01718f', fontSize: 16 }}>${currencyFormat0(((arraySum(areas2, 'price') - privateSale) * (1 - discount2)) - reliefBonus)} </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 16, color: 'gray' }}>Total Savings: </Text>
                    <Text style={{ color: '#01718f', fontSize: 16 }}>${currencyFormat0((arraySum(areas2, 'price')) - (((arraySum(areas2, 'price') - privateSale) * (1 - discount2))) - reliefBonus)} </Text>
                  </View>
                  {(pif > 0) ? <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Text style={{ fontSize: 16, color: 'gray' }}>Pay in Full: </Text>
                    <Text style={{ color: '#01718f', fontSize: 16 }}>${currencyFormat0(((((arraySum(areas2, 'price') - privateSale) * (1 - discount2)) - reliefBonus) * (1 - pif)))} </Text>
                  </View> : null}
                </View>
              </View> : null}
            </View>

            <View style={{ width: '33%', alignItems: 'center' }}>
              {(areas3.length > 0) ? <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 40, fontWeight: 'bold', color: '#01718f' }}>${currencyFormat0(((((arraySum(areas3, 'price') - privateSale) * (1 - discount3)) - reliefBonus) / months3)* (1 + fee)) }</Text>
                <Text style={{ fontSize: 18, color: 'gray' }}>per month for {months3} months</Text>
                <View style={{ alignItems: 'flex-start', marginTop: 15 }}>
                  {privateSale > 0 ? <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text style={{ fontSize: 16, color: 'gray' }}>Private Sale : </Text>
                    <Text style={{ color: '#01718f', fontSize: 16 }}>${privateSale} </Text>
                  </View> : null}
                  {reliefBonus > 0 ? <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text style={{ fontSize: 16, color: 'gray' }}>Relief Bonus : </Text>
                    <Text style={{ color: '#01718f', fontSize: 16 }}>${reliefBonus} </Text>
                  </View> : null}
                  <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text style={{ fontSize: 13, color: 'gray' }}>Total Cost ({discount3 * 100}%): </Text>
                    <Text style={{ textDecorationLine: 'line-through', color: '#01718f', fontSize: 13 }}>${currencyFormat0(arraySum(areas3, 'price'))} </Text>
                    <Text style={{ color: '#01718f', fontSize: 13 }}>${currencyFormat0(((arraySum(areas3, 'price') - privateSale) * (1 - discount3)) - reliefBonus)} </Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text style={{ fontSize: 18, color: 'gray' }}>Your Cost: </Text>
                    <Text style={{ color: '#01718f', fontSize: 16 }}>${currencyFormat0(((arraySum(areas3, 'price') - privateSale) * (1 - discount3)) - reliefBonus)} </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 16, color: 'gray' }}>Total Savings: </Text>
                    <Text style={{ color: '#01718f', fontSize: 16 }}>${currencyFormat0((arraySum(areas3, 'price')) - (((arraySum(areas3, 'price') - privateSale) * (1 - discount3))) - reliefBonus)} </Text>
                  </View>
                  {(pif > 0) ? <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Text style={{ fontSize: 16, color: 'gray' }}>Pay in Full: </Text>
                    <Text style={{ color: '#01718f', fontSize: 16 }}>${currencyFormat0(((((arraySum(areas3, 'price') - privateSale) * (1 - discount3)) - reliefBonus) * (1 - pif)))} </Text>
                  </View> : null}
                </View>
              </View> : null}
            </View>

          </View>

          <Divider />
          {printMode === false ? <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <AreaButton title="Send E Quote" onPress={() => { setShowEmailSection(true) }} disabled={showEmailSection} />
            <AreaButton title="For Managers" onPress={() => { setShowManagersSection(true) }} disabled={showManagersSection} />
            <AreaButton title="Print this Quote" onPress={() => { setPrintMode(true) }} />
          </View> : null}
          {showEmailSection ? !emailResponse ? <View style={{ marginTop: 10 }}><Divider />
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 0, marginTop: 15 }}>
              <View style={{ width: '25%', marginRight: 25 }}><TextInput baseColor="black" onChangeText={text => setEmail(text)} label="Email" theme={{ colors: { primary: '#01718f' } }} />
                <HelperText type="error" visible={emailError}>
                  Email address is invalid!
        </HelperText></View>
              <View style={{ width: '25%' }}><TextInput selectionColor="#01718f" baseColor="black" onChangeText={text => setSubject(text)} label="Subject" theme={{ colors: { primary: '#01718f' } }} />
                <HelperText type="error" visible={subjectError}>
                  Email Subject is Required!
        </HelperText></View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15 }}>
              <AreaButton title="Cancel" onPress={() => { setShowEmailSection(false) }} />
              <AreaButton title="Send Email" onPress={handleEmailSender} />
            </View></View> : <View style={{ marginTop: 20, alignItems: 'center', marginBottom: 10 }}>
              <Divider />
              <Text style={{ fontSize: 35, color: 'green' }}>E Quote has been sent.</Text>
              <View style={{ flexDirection: 'row' }}>
                {/*<AreaButton title='Send Another Quote' onPress={()=>{setEmailResponse(false)}}/> */}
                <AreaButton title='Close' onPress={() => { setShowEmailSection(false), setEmailResponse(false) }} />
              </View>
            </View> : null}
          <Divider />
        </View> : null}
        {showManagersSection ? <View>
          <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 25 }}>
            <View style={{ width: '33%', alignItems: 'center', borderRightWidth: 1 }}>
              <View style={{ alignItems: 'flex-start', marginBottom: 15 }}>
                {privateSale > 0 ? <Text style={{ color: '#01718f' }}>No. of areas selected: {areas1.length}</Text> : null}
                {privateSale > 0 ? <Text style={{ color: '#01718f' }}>Discount for each area: ${currencyFormat0(privateSale / areas1.length)}</Text> : null}
                {reliefBonus > 0 ? <Text style={{ color: '#01718f' }}>Relief Bonus: ${reliefBonus}</Text> : null}
              </View>
              {areas1.map(area => <View key={area.id} style={{ flexDirection: 'row' }}>
                <View style={{ width: '50%', marginLeft: '5%' }}><Text>{area.name}</Text></View>

                <View style={{ width: '25%' }}><Text>${currencyFormat0((area.price * (1 - discount1)) - (privateSale / areas1.length))}</Text></View>

              </View>)
              }
            </View>

            <View style={{ width: '33%', alignItems: 'center', borderRightWidth: 1 }}>
              <View style={{ alignItems: 'flex-start', alignContent: 'flex-start', marginBottom: 15 }}>
                {privateSale > 0 ? <Text style={{ color: '#01718f' }}>No. of areas selected: {areas2.length}</Text> : null}
                {privateSale > 0 ? <Text style={{ color: '#01718f' }}>Discount for each area: ${currencyFormat0(privateSale / areas2.length)}</Text> : null}
                {reliefBonus > 0 ? <Text style={{ color: '#01718f' }}>Relief Bonus: ${reliefBonus}</Text> : null}
              </View>
              {areas2.map(area => <View key={area.id} style={{ flexDirection: 'row' }}>
                <View style={{ width: '50%', marginLeft: '5%' }}><Text>{area.name}</Text></View>

                <View style={{ width: '25%' }}><Text>${currencyFormat0((area.price * (1 - discount2)) - (privateSale / areas2.length))}</Text></View>

              </View>)
              }
            </View>

            <View style={{ width: '33%', alignItems: 'center' }}>

              <View style={{ alignItems: 'flex-start', marginBottom: 15 }}>
                {privateSale > 0 ? <Text style={{ color: '#01718f' }}>No. of areas selected: {areas3.length}</Text> : null}
                {privateSale > 0 ? <Text style={{ color: '#01718f' }}>Discount for each area: ${currencyFormat0(privateSale / areas3.length)}</Text> : null}
                {reliefBonus > 0 ? <Text style={{ color: '#01718f' }}>Relief Bonus: ${reliefBonus}</Text> : null}
              </View>

              {areas3.map(area => <View key={area.id} style={{ flexDirection: 'row' }}>
                <View style={{ width: '50%', marginLeft: '5%' }}><Text>{area.name}</Text></View>

                <View style={{ width: '25%' }}><Text>${currencyFormat0((area.price * (1 - discount3)) - (privateSale / areas3.length))}</Text></View>

              </View>)
              }
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15 }}>
            <AreaButton title="Close" onPress={() => { setShowManagersSection(false) }} />

          </View></View>
          : null}
        <View style={{ alignItems: 'flex-start', marginBottom: 30, marginLeft: '7%', marginTop: 15 }}>
          <Text>Quote issued on: {today}</Text>
          <Text style={{ marginTop: 5 }}>Quote valid through: {lastDay}</Text>
        </View>
      </ViewShot>
    </ScrollView>

  )
}

export default QuoteCalculatorSecondScreen;
