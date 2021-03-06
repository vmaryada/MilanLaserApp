import React from 'react'
import {StyleSheet, Dimensions} from 'react-native';
import {TextInput} from 'react-native-paper';
const {width, height} = Dimensions.get('screen');
function FormInput({labelName, ...rest}) {
    

    
    return (
       <TextInput theme={{ colors: { primary: '#01718f' } }} label={labelName} style={styles.input} numberOfLines={1} {...rest}>
       </TextInput>
    )
}
const styles = StyleSheet.create({
    input: {
      marginTop: 5,
      marginBottom: 5,
      width: width / 1.5,
      height: height / 15
    }
  });
export default FormInput
