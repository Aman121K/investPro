import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { LineChart } from "react-native-chart-kit";
import { heightPercentageToDP, widthPercentageToDP } from './Utility'

var user = auth().currentUser;

var monthly_amounts = [];
var amounts = [];
var dates = [];

if (user != null) {
    firestore()
        .collection('Users')
        .doc(user.uid)
        .collection('Payments')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                if (documentSnapshot.data().status) {
                    console.log("starting.. date",parseInt(documentSnapshot.data().amount))
                    amounts.push(parseInt(documentSnapshot.data().amount))
                    dates.push(documentSnapshot.data().date)
                }
            });
        });

    firestore()
        .collection('Users')
        .doc(user.uid)
        .collection('Monthly_Payment')
        .doc('monthly')
        .get()
        .then(documentSnapshot => {
            console.log("Real",documentSnapshot);
            if (documentSnapshot.exists) {
                console.log("Records???...",parseInt(documentSnapshot.data().february))
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
            }
        })

}





// export default class Statistics extends Component {

const Statistics=({navigation})=>{

    const [button1,setButton1]=useState(false);
    const [button2,setButton2]=useState(false);
    const [button3,setButton3]=useState(true);
    const [daily,setDaily]=useState();
    const [weeklyDate,setWeeklyDate]=useState();
    const [monthlyDate,setMonthlyDate]=useState();

    const [amount,setAmount]=useState();
    useEffect(()=>{
        getCurrentDate();
    },[])

    const getCurrentDate=()=>{
        var date = new Date().getDate();
        setDaily(date);
        console.log("current date is ",daily);
    }
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         button1: false,
    //         button2: false,
    //         button3:true,
    //     }

    // }

    // componentDidMount() {

    // }


     const weekly=()=> {
        setButton1(true);
        setButton2(false);
        setButton3(false);
        // this.setState({ button1: true, button2: false ,button3:false});
    }

    const monthly=() =>{
        // this.setState({ button1: false, button2: true,button3:false });
        setButton1(false);
        setButton2(true);
        setButton3(false);
    }
   const  daiily=()=>{
    setButton1(false);
    setButton2(false);
    setButton3(true);
    }
    const nextDate=()=>{
      setAmount(0)
    }
    const prevDate=()=>{
        setAmount(0);
    }
    const nextMonth=()=>{
        if (user != null) {
            firestore()
                .collection('Users')
                .doc(user.uid)
                .collection('Payments')
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(documentSnapshot => {
                        if (documentSnapshot.data().status) {
                            console.log("starting.. date",parseInt(documentSnapshot.data().amount))
                            setAmount(parseInt(documentSnapshot.data().amount))
                            amounts.push(parseInt(documentSnapshot.data().amount))
                            dates.push(documentSnapshot.data().date)
                        }
                    });
                });
        
            firestore()
                .collection('Users')
                .doc(user.uid)
                .collection('Monthly_Payment')
                .doc('monthly')
                .get()
                .then(documentSnapshot => {
                    console.log("Real",documentSnapshot);
                    if (documentSnapshot.exists) {
                        console.log("Records???...",parseInt(documentSnapshot.data().february))
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
                    }
                })
        
        }
    }
    const prevMonth=()=>{
        setAmount(0)
    }
    const nextWeek =()=>{
        setAmount(0);
    }
    const prevWeek=()=>{
        setAmount(0)
    }

    // render() {
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
                                onPress={() => navigation.goBack()}
                            />
                        </TouchableOpacity>
                        <Text style={styles.title}>STATISTICS</Text>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <MaterialIcons
                                name="account-circle"
                                size={40}
                                color="#fff"
                                style={{ right: 10 }}
                                onPress={() => navigation.navigate('Profile')}
                            />
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={styles.topContainer}>

                {button3 &&
                        <View style={{flexDirection:'row',alignItems:'center',width:widthPercentageToDP('80%'),justifyContent:'space-evenly'}}>
                        <View>
                        <TouchableOpacity onPress={()=>nextDate()}>
                        <Ionicons
                            name="ios-arrow-back-sharp"
                            size={60}
                            color="#green"
                            style={{ left: 10 }}
                            // onPress={() => this.props.navigation.goBack()}
                        />
                    </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={{fontSize:30,fontWeight:'700'}}>₹{amount}</Text></View>
                        <View>

                        <TouchableOpacity onPress={()=>prevDate()}>
                        <Ionicons
                            name="ios-arrow-forward-sharp"
                            size={60}
                            color="#green"
                            style={{ left: 10 }}
                            // onPress={() => this.props.navigation.goBack()}
                        />
                    </TouchableOpacity>
                        </View>
                    </View>
    }
                    
                        {button1 &&
                        <View style={{flexDirection:'row',alignItems:'center',width:widthPercentageToDP('80%'),justifyContent:'space-evenly'}}>
                        <View>
                        <TouchableOpacity onPress={()=>nextWeek()}>
                        <Ionicons
                            name="ios-arrow-back-sharp"
                            size={60}
                            color="#green"
                            style={{ left: 10 }}
                            // onPress={() => this.props.navigation.goBack()}
                        />
                    </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={{fontSize:30,fontWeight:'700'}}>₹{amount}</Text></View>
                        <View>

                        <TouchableOpacity onPress={()=>prevWeek()}>
                        <Ionicons
                            name="ios-arrow-forward-sharp"
                            size={60}
                            color="#green"
                            style={{ left: 10 }}
                            // onPress={() => this.props.navigation.goBack()}
                        />
                    </TouchableOpacity>
                        </View>
                    </View>
                            // <LineChart
                            //     data={{
                            //         labels: dates.length == 0 ? [0] : dates,
                            //         datasets: [
                            //             {
                            //                 data: amounts.length == 0 ? [0] : amounts
                            //             }
                            //         ]

                            //     }}
                            //     width={amounts.length < 5 ? Dimensions.get("window").width - 10 : Dimensions.get("window").width * amounts.length} // from react-native
                            //     height={320}
                            //     yAxisLabel="₹"
                            //     yAxisInterval={1} // optional, defaults to 1
                            //     chartConfig={{
                            //         backgroundColor: "#e26a00",
                            //         backgroundGradientFrom: "#003f5c",
                            //         backgroundGradientTo: "#0e79ab",
                            //         decimalPlaces: 2, // optional, defaults to 2dp
                            //         color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            //         labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            //         style: {
                            //             borderRadius: 16
                            //         },
                            //         propsForDots: {
                            //             r: "6",
                            //             strokeWidth: "2",
                            //             stroke: "#ffa726"
                            //         }
                            //     }}
                            //     bezier
                            //     style={{
                            //         marginVertical: 8,
                            //         borderRadius: 16
                            //     }}
                            // />
                        }
                        {
                            button2 &&
                            <View style={{flexDirection:'row',alignItems:'center',width:widthPercentageToDP('80%'),justifyContent:'space-evenly'}}>
                            <View>
                            <TouchableOpacity onPress={()=>nextMonth()}>
                            <Ionicons
                                name="ios-arrow-back-sharp"
                                size={60}
                                color="#green"
                                style={{ left: 10 }}
                                // onPress={() => this.props.navigation.goBack()}
                            />
                        </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={{fontSize:30,fontWeight:'700'}}>₹{amount}</Text></View>
                            <View>

                            <TouchableOpacity onPress={()=>prevMonth()}>
                            <Ionicons
                                name="ios-arrow-forward-sharp"
                                size={60}
                                color="gray"
                                style={{ left: 10 }}
                                // onPress={() => this.props.navigation.goBack()}
                            />
                        </TouchableOpacity>
                            </View>
                        </View>
                        }
                    <View style={{ flexDirection: 'row' ,marginTop:heightPercentageToDP('5%')}}>
                    <TouchableOpacity onPress={() => daiily()} style={button3 == true ? styles.radioButton1Clicked : styles.radioButton1}>
                            <Text style={button3 == true ? styles.buttonText1Clicked : styles.buttonText1}>Daily</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => weekly()} style={button1 == true ? styles.radioButton1Clicked : styles.radioButton1}>
                            <Text style={button1 == true ? styles.buttonText1Clicked : styles.buttonText1}>Weekly</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => monthly()} style={button2 == true ? styles.radioButton2Clicked : styles.radioButton2}>
                            <Text style={button2 == true ? styles.buttonText2Clicked : styles.buttonText2}>Monthly</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity style={styles.transaction} onPress={() =>navigation.navigate('Transaction')}><Text style={styles.transactionText}>Transaction History</Text></TouchableOpacity>
                </View>
            </View >
        );
    }
const styles = StyleSheet.create({
    container: {
        flex: 1
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
    topContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    bottomContainer: {
        flex: 2.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    username: {
        fontSize: 30,
        fontWeight: '700',
        color: '#000'
    },
    transactionText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff'
    },
    transaction: {
        width: widthPercentageToDP('90%'),
        // height: 50,
        backgroundColor: '#003f5c',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    radioButton1: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        padding: 5,
        borderRadius: 5,
        marginRight:5,
    },
    radioButton1Clicked: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor: '#003f5c',
        padding: 5,
        borderRadius: 5,
        marginRight:5,
    },
    radioButton2: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        left: 5,
        padding: 5,
        borderRadius: 5,
    },
    radioButton2Clicked: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor: '#003f5c',
        left: 5,
        padding: 5,
        borderRadius: 5,
    },
    buttonText1Clicked: {
        fontSize: 20,
        color: '#fff'
    },
    buttonText1: {
        fontSize: 20,
        color: '#000'
    },
    buttonText2Clicked: {
        fontSize: 20,
        color: '#fff'
    },
    buttonText2: {
        fontSize: 20,
        color: '#000'
    }
})

export default Statistics;