import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/navigationTypes';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import styles from '../styles/mainStyles';

// typescript mumbo jumbo 
type LocNavProp = StackNavigationProp<RootStackParamList, 'Home'>;
interface LocScreenProps {
    navigation: LocNavProp;
}

// check bluetooth permission status
const checkLocPerms = async (): Promise<boolean> => {
    let permission = (Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

    try {
        let result = await check(permission);
        console.log('App Location Check:', result);
        switch (result) {
            case RESULTS.GRANTED:
                return true;
            case RESULTS.DENIED:
                console.log("Requesting permission . . .");
                break;
            case RESULTS.LIMITED:
                break;
            case RESULTS.UNAVAILABLE:
                break;
            case RESULTS.BLOCKED:
                break;
        }
    } catch (error) {
        console.log('Location Permission CHECK Error: ', error);
    }
    return false;
}

// request bluetooth permission
const requestLocPerms = async (): Promise<boolean> => {
    let permission = (Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

    try {
        let result = await request(permission);
        console.log('App Location Request:', result);
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
        console.log('Location Permission REQUEST Error:', error);
    }
    return false;
}

// handle when user presses button
const handlePress = () => {
    checkLocPerms().then((result) => {
        if (result === false) {
            requestLocPerms().then((result) => {
                if (result === true) {
                    console.log("Test App now has Location Access.");
                    Alert.alert("LOC", "Test App now has Location Access.");
                } else if (result === false) {
                    console.log("Location request cancelled.");
                } else {
                    console.log("Test App does not have Location Access!");
                    Alert.alert("LOC", "Test App does not have Location Access! You must enable location permissions in your settings to use this app!");
                }
            });
        } else {
            console.log("Test App already has Location Access!");
            Alert.alert("LOC", "Test App already has Location Access!");
        }
    });
}

const LocScreen: React.FC<LocScreenProps> = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Location Screen</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, { borderWidth: 1, borderColor: '#28a745' }]} onPress={handlePress}>
                    <Text style={styles.buttonText}>Request Location Permission</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default LocScreen;