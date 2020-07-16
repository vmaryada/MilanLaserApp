import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native'

function AreaButton(props) {
    let buttonBG = !props.disabled ? props.darkGray? '#5f7075': '#01718f' : 'gray';
    return (
        <TouchableOpacity onPress ={()=> {!props.disabled ? props.onPress(props.id) : null}}>
    <View style = {{backgroundColor:  buttonBG, alignItems: 'center', 
                    justifyContent: 'center', paddingHorizontal:10, paddingVertical:5, borderRadius: 5, minWidth:150, margin: 12}}>
        <Text style = {{color: 'white', fontSize:17}}>{props.title}</Text>
    </View>
</TouchableOpacity>
    )
}

export default AreaButton
