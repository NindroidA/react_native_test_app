import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './src/navigation/navigationTypes';
import HomeScreen from './src/pages/HomeScreen';
import BLEScreen from './src/pages/BLE-Screen';
import LocScreen from './src/pages/Loc-Screen';
import { enableScreens } from 'react-native-screens';
import BleManager from 'react-native-ble-manager';

enableScreens();
const Stack = createStackNavigator<RootStackParamList>();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'
        screenOptions={{
          headerStyle: {
            backgroundColor: '#121212',
          },
          headerTintColor: '#fff',
          headerTitleStyle:{
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BLE" component={BLEScreen} />
        <Stack.Screen name="Loc" component={LocScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}