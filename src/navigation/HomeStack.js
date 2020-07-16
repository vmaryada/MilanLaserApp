import React, {useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../components/screens/HomeScreen';
//import AddRoomScreen from '../components/screens/AddRoomScreen';
import {IconButton} from 'react-native-paper';
//import RoomScreen from '../components/screens/RoomScreen.js';
import QuoteCalculator from '../components/screens/QuoteCalculator.js';
import CommissionCalculator from '../components/screens/CommissionCalculator.js';
import StoreRankCalculator from '../components/screens/StoreRankCalculator.js';
import QuoteCalculatorSecondScreen from '../components/screens/QuoteCalculatorSecondScreen.js';
import CameraScreen from '../components/screens/CameraScreen.js';
import ImagePickerScreen from '../components/screens/ImagePickerScreen.js';
import LeadScreen from '../components/screens/LeadScreen.js';
import HelpDeskTicketScreen from '../components/screens/HelpDeskTicketScreen.js';
const Stack = createStackNavigator();
const ChatAppStack = createStackNavigator();
const ModalStack = createStackNavigator();
import {AuthContext} from './AuthProvider';
import AuthStack from './AuthStack.js';

export default function HomeStack() {
  const {logout} = useContext(AuthContext); 
  return (
    <ModalStack.Navigator mode='modal' >
      <ModalStack.Screen name='Home' component={HomeScreen} options={({navigation}) => ({
       headerRight: () => (<IconButton icon='logout' size={28} 
       onPress={()=>{logout()}}/>)
    })}/>
      <ModalStack.Screen name='QuoteCalculator' options={{headerShown: false}} component={QuoteCalculator} />
      <ModalStack.Screen name='CommissionCalculator' options={{headerShown: false}} component={CommissionCalculator} />
      <ModalStack.Screen options={{headerShown: false}} name='StoreRankCalculator' component={StoreRankCalculator} />
      <ModalStack.Screen options={{headerShown: false}}  name='LeadScreen' component={LeadScreen} />
      <ModalStack.Screen options={{headerShown: false}} name='QuoteCalculatorSecondScreen' component={QuoteCalculatorSecondScreen}/>
      <ModalStack.Screen options={{headerShown: false}} name='HelpDeskTicketScreen' component={HelpDeskTicketScreen}/>
      <ModalStack.Screen options={{headerShown: false}} name='CameraScreen' component={CameraScreen}/>
      <ModalStack.Screen options={{headerShown: false}} name='ImagePickerScreen' component={ImagePickerScreen}/>

    </ModalStack.Navigator>
  );
}
