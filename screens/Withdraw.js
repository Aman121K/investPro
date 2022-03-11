import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ToastAndroid, Alert } from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { heightPercentageToDP, widthPercentageToDP } from './Utility';

var user = null;

export default class MainScreen extends Component {


    constructor(props) {
        super(props);
        this.state = {
            bankname: '',
            accno: '',
            ifsc: '',
            amount: '',
            requestSent: false,
            bodyContainerToRender: true
        }
        this.sendreq = this.sendreq.bind(this)
    }

    componentDidMount() {
        user = auth().currentUser;
    }

    sendreq() {

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        var date = dd + '/' + mm + '/' + yyyy;

        if (this.state.bankname != '' && this.state.accno != '' && this.state.ifsc != '' && user != null && this.state.amount != '') {
            firestore()
                .collection('Users')
                .doc(user.uid)
                .collection('Bank_Details')
                .add({
                    bank_name: this.state.bankname,
                    account_number: this.state.accno,
                    ifsc_code: this.state.ifsc,
                    amount: this.state.amount,
                    date: date,
                })
                .then(() => this.setState({ requestSent: true, bodyContainerToRender: false }))
                .catch((error) => ToastAndroid.show(error.toString(), ToastAndroid.SHORT))
        }
        else{
            Alert.alert("Some parameter is missing")
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.toolbar}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity>
                            <Ionicons
                                name="ios-arrow-back-sharp"
                                size={30}
                                color="#fff"
                                style={{ left: 10 }}
                                onPress={() => this.props.navigation.goBack()}
                            />
                        </TouchableOpacity>
                        <Text style={styles.title}>Invest APP</Text>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <MaterialIcons
                                name="account-circle"
                                size={40}
                                color="#fff"
                                style={{ right: 10 }}
                                onPress={() => this.props.navigation.navigate('Profile')}
                            />
                        </TouchableOpacity>
                    </View>

                </View>


                <View style={styles.bodyContainer}>
                    {
                        this.state.requestSent &&
                        <View style={{ height: '60%', width: '90%', alignItems: 'center' }}>
                            <Ionicons
                                name="checkmark-circle"
                                size={90}
                                color="#003f5c"
                            />
                            <Text style={{ top: 100, fontSize: 30, fontWeight: '600', color: '#000' }}>Request sent</Text>
                        </View>
                    }
                    {
                        this.state.bodyContainerToRender &&
                        <View style={styles.contentContainer}>
                            <Text style={{ fontSize: 25, fontWeight: '600', color: '#003f5c',alignSelf:'center'}}>Withdraw Money</Text>
                            <View style={styles.bankname}>
                            <TextInput
                                placeholder="Enter bank name"
                                placeholderTextColor="white"
                                style={{marginLeft:widthPercentageToDP('2%')}}
                                onChangeText={bname => this.setState({ bankname: bname })}
                            />
                            </View>
                            <View style={styles.bankname}>
                            <TextInput
                                placeholder="Enter account number"
                                placeholderTextColor="#fff"
                                style={{marginLeft:widthPercentageToDP('2%')}}
                                onChangeText={acc => this.setState({ accno: acc })}
                            />
                            </View>
                            <View style={styles.bankname}>
                            <TextInput
                                placeholder="Enter IFSC code"
                                placeholderTextColor="#fff"
                                style={{marginLeft:widthPercentageToDP('2%')}}
                                onChangeText={ifsccode => this.setState({ ifsc: ifsccode })}
                            />
                            </View>
                            <View  style={styles.bankname}>
                                <TextInput
                                    placeholder="Enter Amount"
                                    placeholderTextColor="#fff"
                                    style={{marginLeft:widthPercentageToDP('2%')}}
                                    keyboardType="number-pad"
                                    onChangeText={amountText => this.setState({ amount: amountText })}
                                />
                            </View>
                            <TouchableOpacity onPress={() => this.sendreq()} style={styles.withdrawbutton}><Text style={styles.sendreq}>Send Request</Text></TouchableOpacity>
                        </View>
                    }
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    toolbar: {
        height: 70,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '800',
        left: 20
    },
    bodyContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainer: {
        width: widthPercentageToDP('90%'),
        height: heightPercentageToDP('70%'),
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3,
    
        marginTop: heightPercentageToDP('10%'),
        padding: 30
    },

    withdrawbutton: {
        backgroundColor: '#fb5b5a',
        width:widthPercentageToDP('70%'),
        margin:widthPercentageToDP('2%'),
        // height: 50,
        padding:10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // top: 150
    },
    bankname: {
        backgroundColor: '#465881',
        borderRadius: 10,
        margin:widthPercentageToDP('2.5%'),
        color: '#fff'
    },
    accno: {
        height: 50,
        backgroundColor: '#465881',
        top: 60,
        borderRadius: 15,
        color: '#fff'
    },
    ifsc: {
        height: 50,
        backgroundColor: '#465881',
        top: 100,
        borderRadius: 15,
        color: '#fff'
    },
    sendreq: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '500'
    },
    amount: {
        width: '50%',
        heihgt: 50,
        backgroundColor: '#465881',
        top: 130,
        borderRadius: 15,
        color: '#fff',
        fontSize: 30,
        textAlign: 'center'
    },


})