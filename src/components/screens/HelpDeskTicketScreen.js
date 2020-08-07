import React, { Fragment, useState, useEffect } from 'react'
import { View, StyleSheet, Image, Text, FlatList, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import { TextInput, Divider, IconButton, HelperText, RadioButton } from 'react-native-paper';
//import TextInputMask from 'react-native-text-input-mask';
//import { TextInputMask } from 'react-native-masked-text'
import AreaButton, { SubmitButton } from '../util/AreaButton';
import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from 'react-native-material-dropdown-v2';
import { db } from '../util/db.js';
import Loading from '../util/Loading.js';
import axios from 'axios'
//import {CommonActions} from '@react-navigation/native'
import DatePicker from 'react-native-datepicker';
//import Loading from '../util/Loading.js';

function HelpDeskTicketScreen({ route, navigation }) {
    const [locationsData, setLocationsData] = useState([{ label: 'Omaha West', value: 61 }]);
    const [categoryData, setCategoryData] = useState([{ value: 6, label: 'Website/Social Media' }]);
    const [userData, setUserData] = useState({ name: '', email: '', phone: '', location: 61 })
    const [ticketData, setTicketData] = useState({ category: 6, subject: '', message: '', priority: 4, preferred_contact: '', this_position_will: 135, position_title: 155, position_location: 148, corporate_position: '', hours_of_operation: 263, travel_position: '', full_time_shifts: 253, full_time_specific_scheduled_hours: '', full_time_other: '', part_time_specific_scheduled_hours: '', part_time_other: '', part_time_shifts: 258, clinic_hours: '', hours_of_operation_other: '', manager_aware: 270, posting_preference: 268, posting_reporting_to: '', job_status: 250, reason_for_leaving: 275, exiting_employee_name: '' })
    const [loading, setLoading] = useState(false);
    const [successScreen, setSuccessScreen] = useState(false);
    const [errors, setErrors] = useState({});
    const [reboot, setReboot] = useState(99);
    const [lastDate, setLastDate] = useState(new Date());
    let happyFoxUsername = '';
    let happyFoxPassword = '';
    let priority_data = [
        { value: 4, label: 'Low' }, { value: 1, label: 'Medium' },
        { value: 3, label: 'High' }, { value: 2, label: '911' }]
    let this_position_will_data = [
        { value: 135, label: 'Additional Headcount' },
        { value: 136, label: 'Newly Created Position (Job Title does not yet exist)' },
        { value: 134, label: 'Replace Someone' }]
    let position_title_data = [
        { value: 155, label: 'A/R Coordinator' },
        { value: 137, label: 'Administrative Assistant' },
        { value: 146, label: 'Client Coordinator' },
        { value: 139, label: 'Clinic Manager' },
        { value: 147, label: 'Corporate Position' },
        { value: 140, label: 'District Manager' },
        { value: 142, label: 'Nurse Manager' },
        { value: 141, label: 'Nurse Practitioner Manager' },
        { value: 138, label: 'Provider' },
        { value: 143, label: 'Travel Administrative Assistant' },
        { value: 145, label: 'Travel Clinic Manager' },
        { value: 144, label: 'Travel Provider' },
    ]
    let position_location_data = [{ value: 148, label: 'HQ' },
    { value: 149, label: 'In-Clinic' },
    { value: 150, label: 'Travel Position' }];
    let job_status_data = [{ value: 250, label: 'Full-Time' },
    { value: 251, label: 'Part-Time' }];
    let hours_of_operation_data = [{ value: 263, label: 'Clinic Hours' },
    { value: 265, label: 'Other' },
    { value: 150, label: 'Standard Business Hours (8am-5pm)' }];
    let posting_preference_data = [{ label: 'Internal & External', value: 268 }, { label: 'Internal Only', value: 269 }]
    let manager_aware_data = [{ label: 'Yes', value: 270 }, { label: 'No', value: 271 }]
    let reason_for_leaving_data = [
        { label: 'Internal Promotion', value: 275 },
        { label: 'Resignation', value: 273 },
        { label: 'Termination', value: 272 },
        { label: 'Status Change (ex: Employee goes FT to PT)', value: 274 }]
    let part_time_hours_data = [
        { label: '1 shift per week', value: 258 },
        { label: '1 shift per week, potential to go to two shifts per week', value: 259 },
        { label: '2 shifts per week', value: 260 },
        { label: '3 shifts per week', value: 261 },
        { label: 'Other', value: 262 }
    ]
    let full_time_hours_data = [
        { label: '3 shifts rotating schedule (12 hour shifts)', value: 253 },
        { label: '5 shifts per week rotating schedule', value: 255 },
        { label: 'Other', value: 257 },
        { label: 'Standard Business Hours (8am-5pm)', value: 256 }]
    const [attachedImages, setAttachedImages] = useState([])
    const [attachedFiles, setAttachedFiles] = useState([])
    const [exa, setExa] = useState(1);
    const [deletedImage, setDeletedImage] = useState('');
    const [deletedFile, setDeletedFile] = useState('');

    useEffect(() => {
        //      console.log('use effect ran')
       // console.log('params',route.params);
        //   route.params !== undefined ? route.params.uri !== undefined ? setAttachedImages([...attachedImages, route.params.uri]) : route.params.file !== undefined? setAttachedFiles([...attachedFiles, {uri: route.params.file.uri, name: route.params.file.name}]) :null : null
        (route.params !== undefined && route.params.image !== undefined && route.params.image.uri !== deletedImage) ? (attachedImages.includes(route.params.image.uri)) ? null : setAttachedImages([...attachedImages, route.params.image.uri]) : null;
        (route.params !== undefined && route.params.file !== undefined && route.params.file.uri !== deletedFile.uri) ? (attachedFiles.some(e => e.uri === route.params.file.uri)) ? null : setAttachedFiles([...attachedFiles, { uri: route.params.file.uri, name: route.params.file.name }]) : null;
    }, [route.params])

    useEffect(() => {
        setLoading(true);
        var docRef = db.collection('happyFoxCredentials').doc('credentials');
        docRef.get().then(doc => {
            happyFoxUsername = doc.data().auth_key;
            happyFoxPassword = doc.data().auth_code;
            axios({
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                method: "get",
                url: 'https://milanlaser.happyfox.com/api/1.1/json/ticket_custom_field/3/',
                auth: {
                    username: happyFoxUsername,
                    password: happyFoxPassword
                }
            }).then(res => {//console.log(res.data.choices);
                var data = res.data.choices;
                var tempLocationsArray = Object.keys(data).map(key => {
                    return { label: data[key].text, value: data[key].id };
                })
                setLocationsData(tempLocationsArray);
                axios({
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    method: "get",
                    url: 'https://milanlaser.happyfox.com/api/1.1/json/categories/',
                    auth: {
                        username: happyFoxUsername,
                        password: happyFoxPassword
                    }
                }).then(res => {//console.log(res.data.choices);
                    var data = res.data;
                    var tempCategoryData = Object.keys(data).map(key => {
                        return { label: data[key].name, value: data[key].id };
                    })
                    setCategoryData(tempCategoryData);
                    setLoading(false);
                })
                    .catch(err => { console.log('error', err) })

            })
                .catch(err => { console.log('error', err) })
        })
    }, [])
    /*  useEffect(() => {
  
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
              setLocationsData(tempLocationsArray);
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
              var tempCategoryData = Object.keys(data).map(key => {
                  return { label: data[key].name, value: data[key].id };
              })
              setCategoryData(tempCategoryData);
          })
              .catch(err => { console.log('error', err) })
      }, []); */
    const createTicketHandler = () => {
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var tempErrors = {};
        if (userData.email === '') { tempErrors.email = 'Email cannot be empty' }
        else if (!regex.test(userData.email)) { tempErrors.email = 'Please enter a valid Email' }
        if (userData.name === '') { tempErrors.name = 'Name cannot be empty' } else { }
        if (userData.phone === '') { tempErrors.phone = 'Phone number cannot be empty' } else if (userData.phone.length < 10) { tempErrors.phone = 'Please enter a valid phone number' }
        if (ticketData.message === '') { tempErrors.message = 'Message cannot be empty' } else { }
        if (ticketData.subject === '') { tempErrors.subject = 'Subject cannot be empty' } else { }


        // console.log(tempErrors)
        if (Object.keys(tempErrors).length === 0) {
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
            ticketFormData.append('t-cf-50', ticketData.preferred_contact);
            if (ticketData.category === 10) {
                ticketFormData.append('t-cf-11', ticketData.this_position_will);
                ticketFormData.append('t-cf-12', ticketData.exiting_employee_name);
                ticketFormData.append('t-cf-39', ticketData.reason_for_leaving);
                ticketFormData.append('t-cf-13', ticketData.position_title);
                ticketFormData.append('t-cf-17', ticketData.corporate_position);
                ticketFormData.append('t-cf-14', ticketData.preferred_contact);
                ticketFormData.append('t-cf-15', ticketData.position_location);
                ticketFormData.append('t-cf-19', ticketData.travel_position);
                ticketFormData.append('t-cf-20', ticketData.job_status);
                ticketFormData.append('t-cf-21', ticketData.full_time_shifts);
                ticketFormData.append('t-cf-22', ticketData.full_time_specific_scheduled_hours);
                ticketFormData.append('t-cf-25', ticketData.full_time_other);
                ticketFormData.append('t-cf-26', ticketData.part_time_shifts);
                ticketFormData.append('t-cf-28', ticketData.part_time_specific_scheduled_hours);
                ticketFormData.append('t-cf-27', ticketData.part_time_other);
                ticketFormData.append('t-cf-31', ticketData.hours_of_operation);
                ticketFormData.append('t-cf-32', ticketData.clinic_hours);
                ticketFormData.append('t-cf-33', ticketData.hours_of_operation_other);
                ticketFormData.append('t-cf-35', ticketData.posting_preference);
                ticketFormData.append('t-cf-36', ticketData.posting_reporting_to);
                ticketFormData.append('t-cf-37', ticketData.manager_aware);
            }
            ticketData.category === 1 ? ticketFormData.append('t-cf-4', reboot) : null;
            if (attachedImages.length > 0) {
                attachedImages.map((image, index) => ticketFormData.append('attachments', { uri: image, name: `Attached Image ${index + 1}` }))
                /* ticketFormData.append('attachments', { uri: attachedImages[0], name: 'Attached Image 1' });*/
            }
            else if (attachedFiles.length > 0) {
                attachedFiles.map((file) => { ticketFormData.append('attachments', { uri: file.uri, name: file.name }) })
            }
           // console.log(ticketFormData);
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
               // console.log('ticket Created')
            })
                .catch(err => { console.log('error', JSON.stringify(err)) })
        }
        else { setErrors(tempErrors); }
    }

    const handleImageDelete = (index) => {
       // console.log('image delete')
        var tempImageArray = attachedImages;
        setDeletedImage(attachedImages[index]);
        tempImageArray.splice(index, 1);
      //  console.log(tempImageArray);
        setAttachedImages(tempImageArray);
        setExa(exa + 1);
    }
    const handleFileDelete = (index) => {
      //  console.log('file delete')
        var tempFileArray = attachedFiles;
        setDeletedFile(attachedFiles[index]);
        tempFileArray.splice(index, 1);
      //  console.log(tempFileArray);
        setAttachedFiles(tempFileArray);
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
            {(!loading && !successScreen) ? <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <ScrollView style={{ marginTop: 5 }} contentContainerStyle={{ alignItems: 'center' }}>
                    <View style={{ width: '60%', marginTop: 25 }}>
                        <TextInput baseColor="black" label="Full Name" autoCorrect={false} onChangeText={text => { setUserData({ ...userData, name: text }) }} theme={{ colors: { primary: '#01718f' } }} />
                        <HelperText visible={errors.name} type="error">{errors.name}</HelperText>
                        <TextInput baseColor="black" autoCapitalize='none' keyboardType='email-address' style={{ marginTop: 15 }} onChangeText={text => { setUserData({ ...userData, email: text }) }} label="Email" theme={{ colors: { primary: '#01718f' } }} />
                        <HelperText visible={errors.email} type="error">{errors.email}</HelperText>

                        <TextInput baseColor="black" keyboardType='phone-pad' maxLength={10} style={{ marginTop: 15 }} onChangeText={text => { setUserData({ ...userData, phone: text }) }} label="Phone/ Mobile" theme={{ colors: { primary: '#01718f' } }}
                        />
                        <HelperText visible={errors.phone} type="error">{errors.phone}</HelperText>
                        <View style={{ marginTop: 20, marginBottom: 10, zIndex: 1000 }}>
                            <Text style={{ margin: 5 }}>Location</Text>
                            <DropDownPicker
                                items={locationsData}
                                defaultValue={61}
                                containerStyle={{ height: 40 }}
                                style={{ backgroundColor: '#fafafa' }}
                                dropDownStyle={{ backgroundColor: '#fafafa' }}
                                onChangeItem={(item) => { setUserData({ ...userData, location: item.value }) }}
                                searchable={true}
                                placeholder='Category'
                                searchablePlaceholder="Search..."
                                searchableError="Not Found"
                            /></View>
                        <View style={{ alignItems: 'center' }}>
                            <Dropdown onChangeText={text => { setTicketData({ ...ticketData, category: text }) }} label='Category' data={categoryData} value={ticketData.category} containerStyle={{ width: '95%', margin: 15, marginTop: 0 }}
                                textColor='black' baseColor='black' />
                        </View>

                        {ticketData.category === 1 ? <View style={{ alignItems: 'center' }}>
                            <Text>Did you reboot the computer or device?</Text>
                            <View style={{ backgroundColor: "white", width: '60%', marginVertical: 10, borderRadius: 8 }}>
                                <RadioButton.Group onValueChange={value => setReboot(value)} value={reboot}>
                                    <RadioButton.Item label="Yes" color='#01718f' value={98} />
                                    <Divider />
                                    <RadioButton.Item label="No" color="red" value={99} />
                                </RadioButton.Group></View>
                            <HelperText>Most problems can be resolved with a reboot. Please restart your computer or the device having the problem. and see if your issue has been resolved.</HelperText>
                        </View> : null}
                        {ticketData.category === 10 ?
                            <View style={{ alignItems: 'center' }}>
                                <Divider style={{ width: '100%' }} />
                                <Dropdown label='This Position Will:' onChangeText={text => { setTicketData({ ...ticketData, this_position_will: text }) }} value={ticketData.this_position_will} data={this_position_will_data} containerStyle={{ width: '90%', margin: 15, marginTop: 0 }}
                                    textColor='black' baseColor='black' />
                                {ticketData.this_position_will === 134 ?
                                    <View style={{ width: '100%', alignItems: 'center' }}>
                                        <TextInput baseColor="black" onChangeText={(text) => { setTicketData({ ...ticketData, exiting_employee_name: text }) }} style={{ marginTop: 15, width: '90%' }} label="Full name of existing employee:" theme={{ colors: { primary: '#01718f' } }} />
                                        <Dropdown label='Reason for Leaving' onChangeText={text => { setTicketData({ ...ticketData, reason_for_leaving: text }) }} value={275} data={reason_for_leaving_data} containerStyle={{ width: '90%', margin: 15, marginTop: 0 }}
                                            textColor='black' baseColor='black' />
                                        {ticketData.reason_for_leaving === 273 ? <Fragment>
                                            <Text style={{ color: 'red', fontSize: 16 }}>Make sure you attach Resignation letter.</Text>
                                            <View style={{ width: '90%', alignItems: 'flex-start', marginTop: 15 }}>
                                                <Text style={{ margin: 5 }}>Last Date of Emploment</Text>
                                                <DatePicker
                                                    style={{ width: '100%' }}
                                                    date={lastDate}
                                                    mode="date"
                                                    placeholder="Last Date of Employment"
                                                    format="DD MMM YYYY"
                                                    confirmBtnText="Confirm"
                                                    cancelBtnText="Cancel"
                                                    customStyles={{
                                                        dateIcon: {
                                                            position: 'absolute',
                                                            left: 0,
                                                            top: 4,
                                                            marginLeft: 0
                                                        },
                                                        dateInput: {
                                                            marginLeft: 36
                                                        }
                                                        // ... You can check the source to find the other keys.
                                                    }}
                                                    onDateChange={(date) => { setLastDate(date) }}
                                                />
                                            </View>
                                        </Fragment> : null}
                                    </View> : null}
                                <Dropdown label='Position Title' onChangeText={text => { setTicketData({ ...ticketData, position_title: text }) }} value={ticketData.position_title} data={position_title_data} containerStyle={{ width: '90%', margin: 15, marginTop: 0 }}
                                    textColor='black' baseColor='black' />
                                {ticketData.position_title === 147 ?
                                    <TextInput baseColor="black" onChangeText={(text) => { setTicketData({ ...ticketData, corporate_position: text }) }} style={{ marginTop: 15, width: '90%' }} label="Corporate Position Job Title:" theme={{ colors: { primary: '#01718f' } }}
                                    /> : null}
                                <Dropdown label='Position Location' onChangeText={text => { setTicketData({ ...ticketData, position_location: text }) }} value={ticketData.position_location} data={position_location_data} containerStyle={{ width: '90%', margin: 15, marginTop: 0 }}
                                    textColor='black' baseColor='black' />
                                {ticketData.position_location === 150 ?
                                    <Fragment><TextInput baseColor="black" onChangeText={(text) => { setTicketData({ ...ticketData, travel_position: text }) }} style={{ marginTop: 15, width: '90%' }} label="Travel Position:" theme={{ colors: { primary: '#01718f' } }}
                                    /><HelperText>Provide "Based out of" Location</HelperText></Fragment>
                                    : null}
                                <Dropdown label='Job Status' onChangeText={text => { setTicketData({ ...ticketData, job_status: text }) }} value={ticketData.job_status} data={job_status_data} containerStyle={{ width: '90%', margin: 15, marginTop: 0 }}
                                    textColor='black' baseColor='black' />
                                {ticketData.job_status === 250 ? <Fragment><Dropdown label='Full-Time' onChangeText={text => { setTicketData({ ...ticketData, full_time_shifts: text }) }} value={ticketData.full_time_shifts} data={full_time_hours_data} containerStyle={{ width: '90%', margin: 15, marginTop: 0 }}
                                    textColor='black' baseColor='black' />
                                    {(ticketData.full_time_shifts === 253 || ticketData.full_time_shifts === 255) ? <TextInput baseColor="black" multiline={true} onChangeText={(text) => { setTicketData({ ...ticketData, full_time_specific_scheduled_hours: text }) }} style={{ marginTop: 15, width: '90%' }} label="Specific Scheduled Hours" theme={{ colors: { primary: '#01718f' } }}
                                    /> : null}
                                    {(ticketData.full_time_shifts === 257) ? <TextInput baseColor="black" multiline={true} onChangeText={(text) => { setTicketData({ ...ticketData, full_time_other: text }) }} style={{ marginTop: 15, width: '90%' }} label="Other" theme={{ colors: { primary: '#01718f' } }}
                                    /> : null}
                                </Fragment> : null}
                                {ticketData.job_status === 251 ? <Fragment><Dropdown label='Part-Time' onChangeText={text => { setTicketData({ ...ticketData, part_time_shifts: text }) }} value={ticketData.part_time_shifts} data={part_time_hours_data} containerStyle={{ width: '90%', margin: 15, marginTop: 0 }}
                                    textColor='black' baseColor='black' />
                                    {(ticketData.part_time_shifts !== 262) ? <TextInput baseColor="black" multiline={true} onChangeText={(text) => { setTicketData({ ...ticketData, part_time_specific_scheduled_hours: text }) }} style={{ marginTop: 15, width: '90%' }} label="Specific Scheduled Hours" theme={{ colors: { primary: '#01718f' } }}
                                    /> : null}
                                    {(ticketData.part_time_shifts === 262) ? <TextInput baseColor="black" multiline={true} onChangeText={(text) => { setTicketData({ ...ticketData, part_time_other: text }) }} style={{ marginTop: 15, width: '90%' }} label="Other" theme={{ colors: { primary: '#01718f' } }}
                                    /> : null}
                                </Fragment> : null}

                                <Dropdown label='Hours of Operation' onChangeText={text => { setTicketData({ ...ticketData, hours_of_operation: text }) }} value={ticketData.hours_of_operation} data={hours_of_operation_data} containerStyle={{ width: '90%', margin: 15, marginTop: 0 }}
                                    textColor='black' baseColor='black' />
                                {ticketData.hours_of_operation === 263 ? <Fragment><TextInput baseColor="black" onChangeText={(text) => { setTicketData({ ...ticketData, clinic_hours: text }) }} style={{ marginTop: 15, width: '90%' }} label="Clinic Hours" theme={{ colors: { primary: '#01718f' } }}
                                /><HelperText>Please provide clinic hours</HelperText></Fragment> : null}
                                {ticketData.hours_of_operation === 265 ? <TextInput baseColor="black" onChangeText={(text) => { setTicketData({ ...ticketData, hours_of_operation_other: text }) }} style={{ marginTop: 15, width: '90%' }} label="Other" theme={{ colors: { primary: '#01718f' } }}
                                /> : null}
                                <Dropdown label='Posting Preference ' onChangeText={text => { setTicketData({ ...ticketData, posting_preference: text }) }} value={ticketData.posting_preference} data={posting_preference_data} containerStyle={{ width: '90%', margin: 15, marginTop: 0 }}
                                    textColor='black' baseColor='black' />
                                <TextInput baseColor="black" multiline={true} onChangeText={(text) => { setTicketData({ ...ticketData, posting_reporting_to: text }) }} style={{ marginTop: 15, width: '90%' }} label="Position Reporting To" theme={{ colors: { primary: '#01718f' } }}
                                />
                                <Dropdown label='Is your manager aware of the requisition request?' onChangeText={text => { setTicketData({ ...ticketData, manager_aware: text }) }} value={ticketData.manager_aware} data={manager_aware_data} containerStyle={{ width: '90%', margin: 15, marginTop: 0 }}
                                    textColor='black' baseColor='black' />
                                {ticketData.manager_aware === 271 ? <Text style={{ fontSize: 18, color: 'red' }}>Stop. Contact your manager.</Text> : null}
                                <Divider style={{ width: '100%', marginTop: 15 }} />
                            </View> : null}
                        <View style={{ alignItems: 'center' }}>
                            <Dropdown label='Priority' onChangeText={text => { setTicketData({ ...ticketData, priority: text }) }} value={ticketData.priority} data={priority_data} containerStyle={{ width: 150, margin: 15, marginTop: 0 }}
                                textColor='black' baseColor='black' />
                        </View>
                        <TextInput baseColor="black" onChangeText={(text) => { setTicketData({ ...ticketData, preferred_contact: text }) }} style={{ marginTop: 15 }} label="Preferred Contact Name" theme={{ colors: { primary: '#01718f' } }} />
                        <HelperText>Please provide name of the preferred contact for this request</HelperText>
                        <TextInput baseColor="black" onChangeText={(text) => { setTicketData({ ...ticketData, subject: text }) }} style={{ marginTop: 15 }} label="Subject" theme={{ colors: { primary: '#01718f' } }} />
                        <HelperText visible={errors.subject} type="error">{errors.subject}</HelperText>
                        <TextInput baseColor="black" multiline={true} onChangeText={(text) => { setTicketData({ ...ticketData, message: text }) }} style={{ marginTop: 15 }} label="Message" theme={{ colors: { primary: '#01718f' } }}
                        />
                        <HelperText visible={errors.message} type="error">{errors.message}</HelperText>
                        {/*}   <Text>{attachedImages.length}&nbsp;{exa}</Text> */}

                        {attachedImages.length > 0 ? <View style={{ marginTop: 15 }}>
                            <Text style={{ fontSize: 14, color: '#01718f' }}>Attached Images:</Text>
                            {attachedImages.map((pic, index) => <View key={index} style={{
                                flexDirection: 'row', alignItems: 'center'
                            }}><Image style={{ width: 25, height: 30 }} source={{ uri: pic }} /><Text style={{ marginLeft: 10, marginRight: 10 }}>Image {index + 1}</Text><IconButton icon='trash-can-outline' onPress={() => { handleImageDelete(index) }} /></View>)}
                        </View> : null}
                        {attachedFiles.length > 0 ? <View style={{ marginTop: 15 }}>
                            <Text style={{ fontSize: 14, color: '#01718f' }}>Attached Files:</Text>
                            {attachedFiles.map((file, index) => <View key={index} style={{
                                flexDirection: 'row', alignItems: 'center'
                            }}><Text style={{ marginLeft: 10, marginRight: 10 }}>{file.name}</Text><IconButton icon='trash-can-outline' onPress={() => { handleFileDelete(index) }} /></View>)}
                        </View> : null}
                        <View style={{ alignItems: 'center' }}><View style={{ marginTop: 20, width: 250 }}>
                            <AreaButton icon='ios-photos' title="Choose a picture" onPress={() => { navigation.navigate('ImagePickerScreen') }} />
                            <AreaButton icon='ios-camera' title="Take a picture" onPress={() => { navigation.navigate('CameraScreen') }} />
                            <AreaButton icon='ios-folder' title="Choose a file" onPress={() => { navigation.navigate('DocumentPicker') }} />
                        </View></View>

                        <Divider />
                        <View style={{ alignItems: 'center', marginTop: 15, zIndex: 500 }}>
                            <View style={{ width: 200, alignItems: 'center' }}><SubmitButton title='Create the Ticket' disabled={ticketData.manager_aware === 271} onPress={createTicketHandler} /></View>
                        </View>


                    </View>

                </ScrollView></KeyboardAvoidingView> :
                loading ? <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Loading /></View>
                    : successScreen ? <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <Text style={{ color: 'green', fontSize: 24 }}>Ticket successfully created!</Text>
                        <View style={{ flexDirection: 'row', marginTop: 25 }}><AreaButton title="Create Another Ticket" /><AreaButton title="Go Home" /></View>
                    </View> : null
            }

        </Fragment>
    )
}

export default HelpDeskTicketScreen
