import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid, ScrollView, Alert } from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from './Utility';
export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            passw: '',
            button: true,
            buttonFade: false,
            username: '',
            phonenumber: ''
        }
        this.signup = this.signup.bind(this)
    }

    signup() {
        var user = auth().currentUser;
        if (this.state.email != '' && this.state.passw != '' && user == null) {
            this.setState({ buttonFade: true, button: false })
            auth().createUserWithEmailAndPassword(this.state.email.trim(), this.state.passw)
                .then(() => console.log("User account created"))
                .catch((error) => { this.setState({ buttonFade: false, button: true }), console.log(error); ToastAndroid.show(error.toString(), ToastAndroid.SHORT) })
        }
        else{
            Alert.alert("Some parameter is missing")
        }

        auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser != null) {
                this.props.navigation.replace('MainScreen', { firebaseUser: firebaseUser })
                firestore()
                    .collection('Users')
                    .doc(firebaseUser.uid)
                    .collection('User_Details')
                    .doc(firebaseUser.email)
                    .set({
                        name: this.state.username,
                        email: this.state.email,
                        phonenumber: this.state.phonenumber
                    })
                    .then(() => {
                        console.log('User added!');
                    });

                firestore()
                    .collection('Users')
                    .doc(firebaseUser.uid)
                    .collection('Monthly_Payment')
                    .doc('monthly')
                    .set({
                        january: 0,
                        february: 0,
                        march: 0,
                        april: 0,
                        may: 0,
                        june: 0,
                        july: 0,
                        august: 0,
                        september: 0,
                        october: 0,
                        november: 0,
                        december: 0
                    })
                    .then(() => console.log('Monthly payment initialized'))
                    .catch((error) => console.log(error))

            }
        })

    }

    gologin() {
        console.log("Props")
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <View style={styles.signupContainer}> */}
                <ScrollView>
                    <View style={{alignSelf:'center',margin:hp('5%')}}>
                    <Text style={styles.title}>Invest APP</Text>
                    </View>
                    <View style={styles.ViewFrame}>
                        <MaterialIcons
                            name="account-circle"
                            size={30}
                            color="#fff"
                            style={{  }}
                        />
                        <TextInput
                            style={styles.username}
                            placeholder="Enter username"
                            placeholderTextColor="#9e9e9d"
                            onChangeText={nameText => this.setState({ username: nameText })}
                        />
                    </View>
                    <View style={styles.ViewFrame}>
                        <Ionicons
                            name="call"
                            size={20}
                            color="#fff"
                            style={{marginLeft:wp('1%') }}
                        />
                        <TextInput
                            style={styles.username}
                            placeholder="Enter phone number"
                            placeholderTextColor="#9e9e9d"
                            onChangeText={nameText => this.setState({ phonenumber: nameText })}
                        />
                    </View>
                    <View style={styles.ViewFrame}>
                        <Fontisto
                            name="email"
                            size={22}
                            color="#fff"
                            style={{ marginLeft:wp('1%')}}
                        />
                        <TextInput
                            style={styles.username}
                            placeholder="Enter email"
                            placeholderTextColor="#9e9e9d"
                            onChangeText={emailText => this.setState({ email: emailText })}
                        />
                    </View>
                    <View style={styles.ViewFrame}>
                        <Ionicons
                            name="lock-closed"
                            size={22}
                            color="#fff"
                            style={{  }}
                        />
                        <TextInput
                            style={styles.username}
                            placeholder="Enter password"
                            placeholderTextColor="#9e9e9d"
                            secureTextEntry={true}
                            onChangeText={passwText => this.setState({ passw: passwText })}
                        />
                    </View>

                    {/* {
                        this.state.buttonFade &&
                        <View style={styles.buttonFade}>
                            <Text style={styles.buttonTextFade}>Signup</Text>
                        </View>
                    }

                    {
                        this.state.button && */}
                        < TouchableOpacity style={styles.button} onPress={() => this.signup()}>
                            <Text style={styles.buttonText}>Signup</Text>
                        </TouchableOpacity>
                    {/* } */}
                        <View style={{flexDirection:'row',alignSelf:'center',alignItems:'center',margin:hp('2%')}}>

                       <Text style={{ color: '#fff', fontSize: 15,fontWeight:'400' }}>You have already account ? </Text>
                    <TouchableOpacity><Text onPress={() => this.gologin()} style={{ color: '#fff', fontSize: 18 ,textDecorationLine:'underline'}}>Login</Text></TouchableOpacity>
                    </View>

                {/* </View>
                 */}
                 </ScrollView>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ViewFrame: { flexDirection: 'row', width: wp('90%'), backgroundColor: '#465881', borderRadius: 10, alignItems: 'center', alignSelf: 'center', paddingLeft: 5, margin: hp('2%') },
    // signupContainer: {
    //     width: '80%',
    //     height: '70%',
    //     alignItems: 'center'
    // },
    title: {
        fontSize: 35,
        fontWeight: '800',
        color: '#fb5b5a',
    },
    username: {
        marginLeft:wp('2%'),
        color: '#fff',
    },
    email: {
        width: '90%',
        height: 50,
        backgroundColor: '#465881',
        borderRadius: 20,
        color: '#fff',
    },
    phonenumber: {
        width: '90%',
        height: 50,
        backgroundColor: '#465881',
        borderRadius: 20,
        color: '#fff',
    },
    passw: {
        width: '90%',
        height: 50,
        backgroundColor: '#465881',
        borderRadius: 20,
        color: '#fff',
    },
    button: {
        backgroundColor: '#fb5b5a',
        width: wp('90%'),
        borderRadius:10,
        padding:10,
        alignSelf:'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    buttonTextFade: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 25,
        fontWeight: '500'
    },
    buttonFade: {
        backgroundColor: 'rgba(251, 91, 90, 0.5)',
        width: '90%',
        height: 50,
        top: 150,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
})