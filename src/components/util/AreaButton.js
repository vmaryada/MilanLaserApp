import React, {Fragment} from 'react';
import {View, Text, TouchableOpacity} from 'react-native'
import {Ionicons} from '@expo/vector-icons'

function AreaButton(props) {
    let buttonBG = !props.disabled ? props.darkGray? '#5f7075': '#01718f' : 'gray';
    return (
        <TouchableOpacity onPress ={()=> {!props.disabled ? props.onPress(props.id) : null}}>
    <View style = {{backgroundColor:  buttonBG, alignItems: 'center',flexDirection:'row', 
                    justifyContent: 'center', paddingHorizontal:10, paddingVertical:5, borderRadius: 5, minWidth:150, margin: 12}}>
                    {props.icon? <Fragment><Ionicons name={props.icon} style={{ color: "#fff", fontSize: 17 }}/><Text>&nbsp;&nbsp;</Text></Fragment> : null}
        <Text style = {{color: 'white', fontSize:17}}>{props.title}</Text>
    </View>
</TouchableOpacity>
    )
}

export function SubmitButton(props) {
    let buttonBG = !props.disabled ? props.darkGray? '#5f7075': '#409ab3' : 'gray';
    return (
        <TouchableOpacity onPress ={()=> {!props.disabled ? props.onPress(props.id) : null}}>
    <View style = {{backgroundColor:  buttonBG, alignItems: 'center', 
                    justifyContent: 'center', paddingHorizontal:10, paddingVertical:5, borderRadius: 5, minWidth:150, margin: 12}}>
            <Text style = {{color: 'white', fontSize:17, padding:7}}>{props.title}</Text>
    </View>
</TouchableOpacity>
    )
}

export default AreaButton
