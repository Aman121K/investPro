import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native'
import auth from '@react-native-firebase/auth'
import Fontisto from 'react-native-vector-icons/Fontisto';
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from './Utility';
export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            button: true,
            buttonFade: false,
        }
    }

    forgot() {
        if (this.state.email != '') {
            auth().sendPasswordResetEmail(this.state.email)
                .then((user) => {
                    alert('Please check your email...')
                    this.props.navigation.goBack()
                }).catch(function (e) {
                    console.log(e)
                })
        }
        else{
            Alert.alert("Please enter Valid E-mail")
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{alignSelf:'center',margin:hp('5%')}}>
                    <Text style={styles.title}>Invest APP</Text>
                    </View>
                    <View>
                <Text style={styles.forgotPassw}>Forgot password</Text>
                </View>
                <View style={{width:wp('90%'),margin:wp('5%')}}>
                    <Text style={{color:'#fff',fontSize:14,fontWeight:'400',lineHeight:20}}>Please enter your Registered E-mail.So where you got link for change password </Text>
                </View>
                <View style={styles.ViewFrame}>
                    <Fontisto
                        name="email"
                        size={22}
                        color="#fff"
                        style={{ marginLeft:wp('2%')}}
                    />
                    <TextInput
                        style={styles.email}
                        placeholder="Enter email"
                        placeholderTextColor="#9e9e9d"
                        onChangeText={emailText => this.setState({ email: emailText })}
                    />
                </View>
                {/* {
                    this.state.buttonFade &&
                    <View style={styles.buttonFade}>
                        <Text style={styles.buttonTextFade}>Click here</Text>
                    </View>
                }

                {
                    this.state.button && */}
                    <View style={{width:wp('90%'),backgroundColor:'#fb5b5a',padding:5,borderRadius:10,alignItems:'center',margin:hp('5%')}}>
                    < TouchableOpacity style={styles.button} onPress={() => this.forgot()}>
                        <Text style={styles.buttonText}>Click here</Text>
                    </TouchableOpacity>
                    </View>
                {/* } */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        // justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 35,
        fontWeight: '800',
        color: '#fb5b5a',
    },
    ViewFrame: { flexDirection: 'row', width: wp('90%'), backgroundColor: '#465881', borderRadius: 10, alignItems: 'center', alignSelf: 'center', paddingLeft: 5, margin: hp('2%') },
    email: {
        color: '#fff',
        marginLeft:wp('3%')
    },
    button: {
        // backgroundColor: '#fb5b5a',
        // width: '80%',
        // height: 50,
        // top: 50,
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
        color: 'rgba(255,255,255,0.5)',
        fontSize: 25,
        fontWeight: '500'
    },
    buttonFade: {
        backgroundColor: 'rgba(251, 91, 90, 0.5)',
        width: '80%',
        height: 50,
        top: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    forgotPassw: {
        fontSize: 24,
        fontWeight: '500',
        color: '#fff',
        // bottom: 80
    }
})