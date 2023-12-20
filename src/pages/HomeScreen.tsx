import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/navigationTypes';
import styles from '../styles/mainStyles';

// typescript mumbo jumbo 
type HSNavProp = StackNavigationProp<RootStackParamList, 'Home'>;
interface HSProps {
    navigation: HSNavProp;
}

const HomeScreen: React.FC<HSProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to your Test App!</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.blueButton]} onPress={ () => navigation.navigate('BLE') }>
                    <Text style={styles.buttonText}>Go to BLE Screen</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.greenButton]} onPress={ () => navigation.navigate('Loc') }>
                    <Text style={styles.buttonText}>Go to Location Screen</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default HomeScreen;