import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native'

export default class SplashScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome TO</Text>
                <Text style={styles.invest}>Invest APP</Text>
                <View style={styles.investandgrow}><Text style={styles.grow}>Invest and grow</Text></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcome: {
        color: '#fff',
        fontSize: 35,
        fontWeight: '700',
    },
    investandgrow: {
        flex: 0.3,
        top: 100,
        justifyContent: 'flex-end'
    },
    invest: {
        color: '#fb5b5a',
        fontSize: 40,
        fontWeight: '800',
    },
    grow: {
        fontStyle: 'italic',
        fontSize: 17,
        color: '#fff',
        textAlign: 'justify'
    }
})