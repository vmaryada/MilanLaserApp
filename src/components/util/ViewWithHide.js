import React from 'react';
import {View} from 'react-native';

function ViewWithHide(props) {
    const {children, hide, style} = props;
    return (
        !hide ? null : <View style={style}>
{children}
        </View>
    )
}

export default ViewWithHide
