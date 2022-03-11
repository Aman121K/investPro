import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions ,BackHandler,Alert} from 'react-native'
import auth from '@react-native-firebase/auth'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import firestore from '@react-native-firebase/firestore'
import PushController from './PushController';
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from './Utility';

var user = null;

var monthly_amounts = [];
var amounts = [];
var dates = [];

export default class MainScreen extends Component {


    constructor(props) {
        super(props);
        this.state = {
            total_amount: 0,
            previous_amount: null,
            previous_date: '',
            startDate: '',
            endDate: ''
        }
    }

    backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to go back?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      };
    
    //   componentDidMount() {
    //     
    //   }
    
     

    componentDidMount() {

        this.backHandler = BackHandler.addEventListener(
                  "hardwareBackPress",
                  this.backAction
                );
        user = auth().currentUser;
        if (user != null) {
            firestore()
                .collection('Users')
                .doc(user.uid)
                .collection('Total_Amount')
                .doc('total')
                .get()
                .then(documentSnapshot => {

                    if (documentSnapshot.exists) {
                        this.setState({ total_amount: documentSnapshot.data().total_amount })
                    }
                });

            firestore()
                .collection('Users')
                .doc(user.uid)
                .collection('StartEnd_Date')
                .doc('startend')
                .get()
                .then(documentSnapshot => {
                    if (documentSnapshot.exists) {
                        this.setState({ startDate: documentSnapshot.data().start_date, endDate: documentSnapshot.data().end_date })
                    }
                })

            firestore()
                .collection('Users')
                .doc(user.uid)
                .collection('Previous_Payment')
                .doc('prev_pay')
                .get()
                .then(documentSnapshot => {

                    if (documentSnapshot.exists) {
                        this.setState({ previous_date: documentSnapshot.data().date, previous_amount: documentSnapshot.data().amount })
                    }
                });
        }
    }

    componentWillUnmount() {
        this.backHandler.remove();
      }

    /*

    goToStatistics() {

        firestore()
            .collection('Users')
            .doc(user.uid)
            .collection('Monthly_Payment')
            .doc('monthly')
            .get()
            .then(documentSnapshot => {
                if (documentSnapshot.exists) {
                    console.log(parseInt(documentSnapshot.data().february))
                    monthly_amounts.push(parseInt(documentSnapshot.data().january))
                    monthly_amounts.push(parseInt(documentSnapshot.data().february))
                    monthly_amounts.push(parseInt(documentSnapshot.data().march))
                    monthly_amounts.push(parseInt(documentSnapshot.data().april))
                    monthly_amounts.push(parseInt(documentSnapshot.data().may))
                    monthly_amounts.push(parseInt(documentSnapshot.data().june))
                    monthly_amounts.push(parseInt(documentSnapshot.data().july))
                    monthly_amounts.push(parseInt(documentSnapshot.data().august))
                    monthly_amounts.push(parseInt(documentSnapshot.data().september))
                    monthly_amounts.push(parseInt(documentSnapshot.data().october))
                    monthly_amounts.push(parseInt(documentSnapshot.data().november))
                    monthly_amounts.push(parseInt(documentSnapshot.data().december))
                    firestore()
                        .collection('Users')
                        .doc(user.uid)
                        .collection('Payments')
                        .get()
                        .then(querySnapshot => {
                            querySnapshot.forEach(documentSnapshot => {
                                if (documentSnapshot.data().status) {
                                    amounts.push(parseInt(documentSnapshot.data().amount))
                                    dates.push(documentSnapshot.data().date)
                                    this.props.navigation.navigate('Statistics', { monthly_amounts, amounts, dates })
                                }
                            });
                        });
                }
            })

    }
    */

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.toolbar}>
                    <View><Text style={styles.title}>Invest APP</Text></View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity>
                            <Entypo
                                name="bar-graph"
                                size={25}
                                color="#fff"
                                style={{ right: 15 }}
                                onPress={() => this.props.navigation.navigate('Statistics')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <MaterialIcons
                                name="account-circle"
                                size={35}
                                color="#fff"
                                style={{ right: 10 }}
                                onPress={() => this.props.navigation.navigate('Profile')}
                            />
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.scrollContainer}>
                    {/* <ScrollView horizontal={true} > */}
                        <View style={styles.scrollItem1}>
                            <Text style={styles.totalMoney}>Total money</Text>
                           
                            <Text style={styles.totalMoney}>₹{this.state.total_amount}</Text>
                        </View>
                        <View style={styles.scrollItem2}>
                            <Text style={styles.previous}>Previous Amount: </Text>
                            <Text style={styles.previousAmount}> ₹{this.state.previous_amount}</Text>
                            <Text style={styles.previousDate}>Date: {this.state.previous_date}</Text>
                           
                        </View>
                        <View style={styles.scrollItem3}>
                            <Text style={styles.start}>Start date: {this.state.startDate}</Text>
                            <Text style={styles.end}>End date: {this.state.endDate}</Text>
                        </View>
                    {/* </ScrollView> */}
                </View>
                {/* <View style={styles.bodyContainer}> */}
                    <View style={styles.investbutton}>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('Payment')}><Text style={styles.invest}>₹  INVEST MONEY</Text></TouchableOpacity>
                    </View>
                    <View style={styles.withdrawbutton}>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('Withdraw')}><Text style={styles.invest}>₹  WITHDRAW MONEY</Text></TouchableOpacity>
                    </View>
                {/* </View> */}
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
        left: 10
    },
    scrollContainer: {
        flex: 1,
        margin:hp('2%')
    },
  
    scrollItem1: {
        // height: hp('20%'),
        width: Dimensions.get('window').width - 50,
        // backgroundColor: '#fb5b5a',
        // borderRadius: 10,
        margin:wp('2%'),
        // padd
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollItem2: {
        // height: hp('15%'),
        width: Dimensions.get('window').width - 50,
        // backgroundColor: '#a6e0d4',
        // borderRadius: 10,
        padding:5,
        margin:wp('2%'),
        // left: 10,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    scrollItem3: {
        // height: hp('15%'),
        margin:wp('2%'),
        width: Dimensions.get('window').width - 50,
        // backgroundColor: '#b793cf',
        // borderRadius: 10,
        // left: 15,
        // justifyContent: 'center',
        // alignItems: 'center'
    },


    /*
    bodyContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainer: {
        width: '90%',
        height: '80%',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        padding: 30
    },*/
    totalMoney: {
        fontSize: 35,
        fontWeight: '600',
        color: '#000',
    },

    investbutton: {
        backgroundColor: '#fb5b5a',
        // height: 50,
        width: wp('60%'),
        top:hp('-8%'),
        // marginTop:hp('-10%'),
        marginLeft:wp('20%'),
        borderRadius: 10,
        // justifyContent: 'flex-end',
        alignItems: 'center',
        padding:10
        // top: 100
    },
    invest: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff'
    },
    withdrawbutton: {
        backgroundColor: '#003f5c',
        margin:wp('5%'),
        width: wp('70%'),
        padding:10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // top: 130
    },

    previous: {
        fontSize: 25,
        fontWeight: '600',
        color: '#000',
    },
    previousAmount: {
        fontSize: 25,
        fontWeight: '600',
        color: '#000',
    },
    previousDate: {
        fontSize: 25,
        fontWeight: '600',
        color: '#000',
    },
    start: {
        fontSize: 25,
        fontWeight: '600',
        color: '#000',
    },
    end: {
        fontSize: 25,
        fontWeight: '600',
        color: '#000',
    }


})