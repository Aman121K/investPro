import React, { Component } from 'react';
import { Button, StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { heightPercentageToDP, widthPercentageToDP } from './Utility';

var user = null;

export default class payment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            contact: '',
            amount: null,
            requestSent: false,
            bodyContainerToRender: true,
            total_amount: 0,

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

        }
        this._onPressButton = this._onPressButton.bind(this)
    }

    componentDidMount() {
        user = auth().currentUser;
        if (user != null) {
            console.log("Inside componentdidmount")

            firestore()
                .collection('Users')
                .doc(user.uid)
                .collection('User_Details')
                .doc(user.email)
                .get()
                .then(documentSnapshot => {
                    if (documentSnapshot.exists) {
                        this.setState({ contact: documentSnapshot.data().phonenumber })
                    }
                })


            firestore()
                .collection('Users')
                .doc(user.uid)
                .collection('Total_Amount')
                .doc('total')
                .get()
                .then(documentSnapshot => {
                    if (documentSnapshot.exists) {
                        console.log("document exists")
                        this.setState({ total_amount: documentSnapshot.data().total_amount })
                    }
                    if (!documentSnapshot.exists) {
                        firestore()
                            .collection('Users')
                            .doc(user.uid)
                            .collection('Total_Amount')
                            .doc('total')
                            .set({
                                total_amount: 0
                            }).then(() => console.log("Total amount is zero"))
                    }

                })


            firestore()
                .collection('Users')
                .doc(user.uid)
                .collection('Monthly_Payment')
                .doc('monthly')
                .get()
                .then(documentSnapshot => {
                    if (documentSnapshot.exists) {
                        this.setState({ january: documentSnapshot.data().january });
                        this.setState({ february: documentSnapshot.data().february });
                        this.setState({ march: documentSnapshot.data().march });
                        this.setState({ april: documentSnapshot.data().april });
                        this.setState({ may: documentSnapshot.data().may });
                        this.setState({ june: documentSnapshot.data().june });
                        this.setState({ july: documentSnapshot.data().july });
                        this.setState({ august: documentSnapshot.data().august });
                        this.setState({ september: documentSnapshot.data().september });
                        this.setState({ october: documentSnapshot.data().october });
                        this.setState({ november: documentSnapshot.data().november });
                        this.setState({ december: documentSnapshot.data().december });
                    }
                })

        }
        console.log(this.state.total_amount)
    }

    _onPressButton() {
       
        var time = new Date().toLocaleTimeString();
        console.log(time)
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        var end_month = ''
        var end_year = ''
        var endDate = ''
        if (parseInt(mm) > 6) {
            end_month = String(parseInt(mm) - 6);
            end_year = today.getFullYear() + 1;
            endDate = dd + '/' + end_month + '/' + end_year;
        }
        else {
            end_month = String(today.getMonth() + 7).padStart(2, '0');
            endDate = dd + '/' + end_month + '/' + yyyy;
        }

        today = dd + '/' + mm + '/' + yyyy;
        console.log(today)

        console.log(endDate)

        if (this.state.amount != null && user != null) {
            console.log(user.uid)
            var options = {
                description: 'Invest money and grow',
                image: 'https://i.imgur.com/3g7nmJC.png',
                currency: 'INR',
                key: 'rzp_live_dZAIxh9mgzdnl7',
                amount: parseInt(this.state.amount) * 100,
                name: 'Invest APP',
                prefill: {
                    email: user.email,
                    contact: this.state.contact,
                    name: 'Razorpay Software'
                },
                theme: { color: '#F37254' }
            }
            RazorpayCheckout.open(options).then((data) => {
                console.log(data.razorpay_payment_id)
                if (data.razorpay_payment_id != null) {
                    firestore()
                        .collection('Users')
                        .doc(user.uid)
                        .collection('Payments')
                        .add({
                            date: today,
                            time: time,
                            status: true,
                            amount: this.state.amount,
                            payment_ID: data.razorpay_payment_id
                        }).then(() => this.setState({ requestSent: true, bodyContainerToRender: false }))

                    firestore()
                        .collection('Users')
                        .doc(user.uid)
                        .collection('Previous_Payment')
                        .doc('prev_pay')
                        .set({
                            date: today,
                            amount: this.state.amount,
                            payment_ID: data.razorpay_payment_id
                        }).then(() => console.log('Previous Payment added'))

                    firestore()
                        .collection('Users')
                        .doc(user.uid)
                        .collection('StartEnd_Date')
                        .doc('startend')
                        .get()
                        .then(documentSnapshot => {

                            if (!documentSnapshot.exists) {
                                firestore()
                                    .collection('Users')
                                    .doc(user.uid)
                                    .collection('StartEnd_Date')
                                    .doc('startend')
                                    .set({
                                        start_date: today,
                                        end_date: endDate
                                    }).then(() => console.log('Start date added'))
                            }
                        });

                    firestore()
                        .collection('Users')
                        .doc(user.uid)
                        .collection('Total_Amount')
                        .doc('total')
                        .set({
                            total_amount: parseInt(this.state.total_amount) + parseInt(this.state.amount)
                        }).then(() => console.log('Total amount updated'))


                    if (mm == '01') {
                        firestore()
                            .collection('Users')
                            .doc(user.uid)
                            .collection('Monthly_Payment')
                            .doc('monthly')
                            .set({
                                january: parseInt(this.state.january) + parseInt(this.state.amount),
                                february: this.state.february,
                                march: this.state.march,
                                april: this.state.april,
                                may: this.state.may,
                                june: this.state.june,
                                july: this.state.july,
                                august: this.state.august,
                                september: this.state.september,
                                october: this.state.october,
                                november: this.state.november,
                                december: this.state.december,
                            }).then(() => console.log("January month payment"))
                            .catch(error => console.log(error))
                    }
                    else if (mm = '02') {
                        firestore()
                            .collection('Users')
                            .doc(user.uid)
                            .collection('Monthly_Payment')
                            .doc('monthly')
                            .set({
                                january: this.state.january,
                                february: parseInt(this.state.february) + parseInt(this.state.amount),
                                march: this.state.march,
                                april: this.state.april,
                                may: this.state.may,
                                june: this.state.june,
                                july: this.state.july,
                                august: this.state.august,
                                september: this.state.september,
                                october: this.state.october,
                                november: this.state.november,
                                december: this.state.december,
                            }).then(() => console.log("February month payment"))
                            .catch(error => console.log(error))
                    }
                    else if (mm = '03') {
                        firestore()
                            .collection('Users')
                            .doc(user.uid)
                            .collection('Monthly_Payment')
                            .doc('monthly')
                            .set({
                                january: this.state.january,
                                february: this.state.february,
                                march: parseInt(this.state.march) + parseInt(this.state.amount),
                                april: this.state.april,
                                may: this.state.may,
                                june: this.state.june,
                                july: this.state.july,
                                august: this.state.august,
                                september: this.state.september,
                                october: this.state.october,
                                november: this.state.november,
                                december: this.state.december,
                            }).then(() => console.log("March month payment"))
                            .catch(error => console.log(error))
                    }
                    else if (mm = '04') {
                        firestore()
                            .collection('Users')
                            .doc(user.uid)
                            .collection('Monthly_Payment')
                            .doc('monthly')
                            .set({
                                january: this.state.january,
                                february: this.state.february,
                                march: this.state.march,
                                april: parseInt(this.state.april) + parseInt(this.state.amount),
                                may: this.state.may,
                                june: this.state.june,
                                july: this.state.july,
                                august: this.state.august,
                                september: this.state.september,
                                october: this.state.october,
                                november: this.state.november,
                                december: this.state.december,

                            }).then(() => console.log("April month payment"))
                            .catch(error => console.log(error))
                    }
                    else if (mm = '05') {
                        firestore()
                            .collection('Users')
                            .doc(user.uid)
                            .collection('Monthly_Payment')
                            .doc('monthly')
                            .set({
                                january: this.state.january,
                                february: this.state.february,
                                march: this.state.march,
                                april: this.state.april,
                                may: parseInt(this.state.may) + parseInt(this.state.amount),
                                june: this.state.june,
                                july: this.state.july,
                                august: this.state.august,
                                september: this.state.september,
                                october: this.state.october,
                                november: this.state.november,
                                december: this.state.december,

                            }).then(() => console.log("May month payment"))
                            .catch(error => console.log(error))
                    }
                    else if (mm = '06') {
                        firestore()
                            .collection('Users')
                            .doc(user.uid)
                            .collection('Monthly_Payment')
                            .doc('monthly')
                            .set({
                                january: this.state.january,
                                february: this.state.february,
                                march: this.state.march,
                                april: this.state.april,
                                may: this.state.may,
                                june: parseInt(this.state.june) + parseInt(this.state.amount),
                                july: this.state.july,
                                august: this.state.august,
                                september: this.state.september,
                                october: this.state.october,
                                november: this.state.november,
                                december: this.state.december,


                            }).then(() => console.log("June month payment"))
                            .catch(error => console.log(error))
                    }
                    else if (mm = '07') {
                        firestore()
                            .collection('Users')
                            .doc(user.uid)
                            .collection('Monthly_Payment')
                            .doc('monthly')
                            .set({

                                january: this.state.january,
                                february: this.state.february,
                                march: this.state.march,
                                april: this.state.april,
                                may: this.state.may,
                                june: this.state.june,
                                july: parseInt(this.state.july) + parseInt(this.state.amount),
                                august: this.state.august,
                                september: this.state.september,
                                october: this.state.october,
                                november: this.state.november,
                                december: this.state.december,
                            }).then(() => console.log("July month payment"))
                            .catch(error => console.log(error))
                    }
                    else if (mm = '08') {
                        firestore()
                            .collection('Users')
                            .doc(user.uid)
                            .collection('Monthly_Payment')
                            .doc('monthly')
                            .set({
                                january: this.state.january,
                                february: this.state.february,
                                march: this.state.march,
                                april: this.state.april,
                                may: this.state.may,
                                june: this.state.june,
                                july: this.state.july,
                                august: parseInt(this.state.august) + parseInt(this.state.amount),
                                september: this.state.september,
                                october: this.state.october,
                                november: this.state.november,
                                december: this.state.december,
                            }).then(() => console.log("August month payment"))
                            .catch(error => console.log(error))
                    }
                    else if (mm = '09') {
                        firestore()
                            .collection('Users')
                            .doc(user.uid)
                            .collection('Monthly_Payment')
                            .doc('monthly')
                            .set({
                                january: this.state.january,
                                february: this.state.february,
                                march: this.state.march,
                                april: this.state.april,
                                may: this.state.may,
                                june: this.state.june,
                                july: this.state.july,
                                august: this.state.august,
                                september: parseInt(this.state.september) + parseInt(this.state.amount),
                                october: this.state.october,
                                november: this.state.november,
                                december: this.state.december,
                            }).then(() => console.log("September month payment"))
                            .catch(error => console.log(error))
                    }
                    else if (mm = '10') {
                        firestore()
                            .collection('Users')
                            .doc(user.uid)
                            .collection('Monthly_Payment')
                            .doc('monthly')
                            .set({
                                january: this.state.january,
                                february: this.state.february,
                                march: this.state.march,
                                april: this.state.april,
                                may: this.state.may,
                                june: this.state.june,
                                july: this.state.july,
                                august: this.state.august,
                                september: this.state.september,
                                october: parseInt(this.state.october) + parseInt(this.state.amount),
                                november: this.state.november,
                                december: this.state.december,
                            }).then(() => console.log("October month payment"))
                            .catch(error => console.log(error))
                    }
                    else if (mm = '11') {
                        firestore()
                            .collection('Users')
                            .doc(user.uid)
                            .collection('Monthly_Payment')
                            .doc('monthly')
                            .set({
                                january: this.state.january,
                                february: this.state.february,
                                march: this.state.march,
                                april: this.state.april,
                                may: this.state.may,
                                june: this.state.june,
                                july: this.state.july,
                                august: this.state.august,
                                september: this.state.september,
                                october: this.state.october,
                                november: parseInt(this.state.november) + parseInt(this.state.amount),
                                december: this.state.december,
                            }).then(() => console.log("November month payment"))
                            .catch(error => console.log(error))
                    }
                    else if (mm = '12') {
                        firestore()
                            .collection('Users')
                            .doc(user.uid)
                            .collection('Monthly_Payment')
                            .doc('monthly')
                            .set({
                                january: this.state.january,
                                february: this.state.february,
                                march: this.state.march,
                                april: this.state.april,
                                may: this.state.may,
                                june: this.state.june,
                                july: this.state.july,
                                august: this.state.august,
                                september: this.state.september,
                                october: this.state.october,
                                november: this.state.november,
                                december: parseInt(this.state.december) + parseInt(this.state.amount),
                            }).then(() => console.log("December month payment"))
                            .catch(error => console.log(error))

                    }


                }
                
            }).catch((error) => {
                alert(`Error: ${error.code} | ${error.description}`);
                firestore()
                    .collection('Users')
                    .doc(user.uid)
                    .collection('Payments')
                    .add({
                        date: today,
                        time: time,
                        amount: this.state.amount,
                        status: false,
                        payment_ID: error.code
                    })
            });
        }
        else{
            Alert.alert("Please Enter Amount");
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
                            <Text style={{ top: 100, fontSize: 30, fontWeight: '600', color: '#000' }}>Paid successfully</Text>
                        </View>
                    }
                    {
                        this.state.bodyContainerToRender &&
                        <View style={styles.contentContainer}>

                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 60, color: '#000' }}>₹{this.state.amount}</Text>
                                <TextInput
                                    placeholder="Enter Amount"
                                    placeholderTextColor="white"
                                    style={styles.amount}
                                    keyboardType="number-pad"
                                    onChangeText={amountText => this.setState({ amount: amountText })}
                                />
                            </View>
                            <TouchableOpacity onPress={() => this._onPressButton()} style={styles.withdrawbutton}><Text style={styles.sendreq}>Pay</Text></TouchableOpacity>
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
        height: heightPercentageToDP('50%'),
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3,
        // borderRadius:10,
        marginTop: heightPercentageToDP('10'),
        padding: 30,
    },
    amount: {
        width: widthPercentageToDP('70%'),
        // heihgt: 50,
        backgroundColor: '#003f5c',
        top: 50,
        borderRadius: 10,
        color: '#fff',
        fontSize: 20,
        textAlign: 'center'
    },

    withdrawbutton: {
        backgroundColor: '#fb5b5a',
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        top: 90
    },
    bankname: {
        height: 50,
        backgroundColor: '#465881',
        borderRadius: 15,
        color: '#fff'
    },
    accno: {
        height: 50,
        backgroundColor: '#465881',
        top: 80,
        borderRadius: 15,
        color: '#fff'
    },
    ifsc: {
        height: 50,
        backgroundColor: '#465881',
        top: 130,
        borderRadius: 15,
        color: '#fff'
    },
    sendreq: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '500'
    }
});