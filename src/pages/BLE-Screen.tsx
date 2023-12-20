import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/navigationTypes';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import BleManager from 'react-native-ble-manager';
import styles from '../styles/mainStyles';

// typescript mumbo jumbo 
type BLENavProp = StackNavigationProp<RootStackParamList, 'Home'>;
interface BLEScreenProps {
    navigation: BLENavProp;
}

// check bluetooth permission status
const checkBTPerms = async (): Promise<boolean> => {
    let permission = (Platform.OS === 'ios' ? PERMISSIONS.IOS.BLUETOOTH : PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);

    try {
        let result = await check(permission);
        console.log('App Bluetooth Check:', result);
        switch (result) {
            case RESULTS.GRANTED:
                return true;
            case RESULTS.DENIED:
                break;
            case RESULTS.LIMITED:
                break;
            case RESULTS.UNAVAILABLE:
                break;
            case RESULTS.BLOCKED:
                break;
        }
    } catch (error) {
        console.log('Bluetooth Permission CHECK Error: ', error);
    }
    return false;
}

// request bluetooth permission
const requestBTPerms = async (): Promise<boolean> => {
    let permission = (Platform.OS === 'ios' ? PERMISSIONS.IOS.BLUETOOTH : PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);

    try {
        let result = await request(permission);
        console.log('App Bluetooth Request:', result);
        switch (result) {
            case RESULTS.GRANTED:
                return true;
            case RESULTS.DENIED:
                break;
            case RESULTS.LIMITED:
                break;
            case RESULTS.UNAVAILABLE:
                break;
            case RESULTS.BLOCKED:
                break;
        }
    } catch (error) {
        console.log('Bluetooth Permission REQUEST Error:', error);
    }
    return false;
}

const checkBTAvail = async (): Promise<boolean> => {
    try {
        let state = await BleManager.checkState();
        console.log("Device Bluetooth State:", state);
        switch (state) {
            case 'on':
                return true;
            case 'off':
                break;
        }
    } catch (error) {
        console.log("Bluetooth Avaliability Error:", error);
    }
    return false;
}

// handle when user presses button
const handlePress = () => {
    // make sure bluetooth is enabled on the device
    checkBTAvail().then((result) => {
        if (result === false) {
            Alert.alert("BLE", "Bluetooth is not avaliable on this device! You must enable bluetooth in your settings to use this app!");
        } else {
            checkBTPerms().then((result) => {
                if (result === false) {
                    requestBTPerms().then((result) => {
                        if (result === true) {
                            console.log("Test App now has Bluetooth Access.");
                            Alert.alert("BLE", "Test App now has Bluetooth Access.");
                        } else if (result === false) {
                            console.log("Bluetooth request cancelled.");
                        } else {
                            console.log("Test App does not have Bluetooth Access!");
                            Alert.alert("BLE", "Test App does not have Bluetooth Access! You must enable bluetooth permissions in your settings to use this app!");
                        }
                    });
                } else {
                    console.log("Test App already has Bluetooth Access!");
                    Alert.alert("BLE", "Test App already has Bluetooth Access!");
                }
            });
        }
    });
}

const BLEScreen: React.FC<BLEScreenProps> = ({ navigation }) => {
    // initialize BLE Manager
    useEffect(() => {
        BleManager.start({ showAlert: true });
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>BLE Screen</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, { borderWidth: 1, borderColor: '#007bff' }]} onPress={handlePress}>
                    <Text style={styles.buttonText}>Request Bluetooth Permission</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default BLEScreen;
