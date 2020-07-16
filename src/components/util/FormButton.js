import React from 'react'
import {StyleSheet, Dimensions, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
const { width, height } = Dimensions.get('screen');
9
function FormButton({title, modeValue, ...rest}) {
    return (
    <Button mode={modeValue} dark='true' style={StyleSheet.button} contentStyle={styles.buttonContainer} {...rest}>
{title}
        </Button>
    )
}
const styles=StyleSheet.create({
    button: {
        margin: 10, 
      },
      buttonContainer: {
        width: width / 2,
        height: height / 15,
       
      } 
})
export default FormButton
