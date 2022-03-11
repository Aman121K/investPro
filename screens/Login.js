import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid, ScrollView, Alert } from 'react-native'
import auth from '@react-native-firebase/auth'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from './Utility';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            passw: '',
            button: true,
            buttonFade: false
        }
        this.login = this.login.bind(this)
    }

    login() {
        var user = auth().currentUser;
        if (this.state.email != '' && this.state.passw != '' && user == null) {
            this.setState({ buttonFade: true, button: false })
            console.log("email",this.state.email,"password",this.state.passw);
            auth().signInWithEmailAndPassword(this.state.email.trim(), this.state.passw)
                .then(() => console.log("User logged in"))
                .catch((error) => { this.setState({ buttonFade: false, button: true }), console.log(error); ToastAndroid.show(error.toString(), ToastAndroid.SHORT) })
        }
        else{
            Alert.alert("Some parameter is missing")
        }

        auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser != null) {
                this.props.navigation.replace('MainScreen', { firebaseUser: firebaseUser })
            }
        })

    }

    gosignup() {
        console.log("Props")
        this.props.navigation.goBack()
    }

    forgotPassw() {
        this.props.navigation.navigate('ForgotPassword')
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={{alignSelf:'center',margin:hp('10%')}}>
                    <Text style={styles.title}>Invest APP</Text>
                    </View>
                    <View style={styles.ViewFrame}>
                        <Fontisto
                            name="email"
                            size={20}
                            color="#fff"
                            style={{ marginLeft: wp('2%') }}
                        />
                        <TextInput
                            style={styles.email}
                            placeholder="Enter email"
                            placeholderTextColor="#9e9e9d"
                            onChangeText={emailText => this.setState({ email: emailText })}
                        />
                    </View>
                    <View style={styles.ViewFrame}>
                        <Ionicons
                            name="lock-closed"
                            size={20}
                            color="#fff"
                            style={{marginLeft: wp('2%')}}
                        />
                        <TextInput
                            style={styles.email}
                            placeholder="Enter password"
                            placeholderTextColor="#9e9e9d"
                            secureTextEntry={true}
                            onChangeText={passwText => this.setState({ passw: passwText })}
                        />
                    </View>

                    <View style={{alignSelf:'flex-end',marginRight:wp('5%')}}>
                        <Text onPress={() => this.forgotPassw()} style={{ color: '#fff', fontSize: 15 ,textDecorationLine:'underline'}}>Forgot Password</Text>
                    </View>


                    {/* {
                        this.state.buttonFade && */}
< TouchableOpacity style={styles.button} onPress={() => this.login()}>
                        <View style={styles.buttonFade}>
                            <Text style={styles.buttonTextFade}>Login</Text>
                        </View>
                        </TouchableOpacity>
                     {/* } */}

                    {/* {
                        this.state.button && */}

                        {/* < TouchableOpacity style={styles.button} onPress={() => this.login()}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity> */}

                    {/* } */}
                    <View style={{flexDirection:'row',alignItems:'center',alignSelf:'center'}}>
                   
                        <Text style={{ color: '#fff', fontSize: 14 }}>You don't have Account ? </Text>
                        <TouchableOpacity onPress={() => this.gosignup()} >
                        <Text style={{ color: '#fff', fontSize: 17 ,textDecorationLine:'underline'}}>Signup</Text>
                        </TouchableOpacity>
                        </View>

                </ScrollView>

            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',

    },
    ViewFrame: { flexDirection: 'row', width: wp('90%'), backgroundColor: '#465881', borderRadius: 10, alignItems: 'center', alignSelf: 'center', paddingLeft: 5, margin: hp('2%') },
    // loginContainer: {
    //     width: '80%',
    //     height: '50%',
    //     alignItems: 'center'
    // },
    title: {
        fontSize: 35,
        fontWeight: '800',
        color: '#fb5b5a',
    },
    email: {
       
        color: '#fff',
        marginLeft: wp('2%')
    },
    
    button: {
        // backgroundColor: '#fb5b5a',
        // width: '90%',
        // height: 50,
        // // top: 150,
        // borderRadius: 20,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 25,
        fontWeight: '500'
    },
    buttonTextFade: {
        color: 'rgba(255,255,255,1)',
        fontSize: 20,
        fontWeight: 'bold'
    },
    buttonFade: {
        backgroundColor: 'rgba(251, 91, 90, 1)',
        margin:hp('5%'),
        width: wp('90%'),
        padding:10,
        borderRadius: 10,
        alignSelf:'center',
        alignItems: 'center'
    },
})