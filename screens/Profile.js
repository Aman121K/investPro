import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView,Image,TextInput} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { heightPercentageToDP, widthPercentageToDP } from './Utility'
import ImagePicker from 'react-native-image-crop-picker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from './Utility'
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// import Ionicons from 'react-native-vector-icons/Ionicons';

var user = null;


export default class Profile extends Component {


    constructor(props) {
        super(props);
        this.state = {
            username: '',
            userImage:''
        }

    }

    componentDidMount() {

        user = auth().currentUser;

        if (user != null) {
            firestore()
                .collection('Users')
                .doc(user.uid)
                .collection('User_Details')
                .doc(user.email)
                .get()
                .then(documentSnapshot => {
                    if (documentSnapshot.exists) {
                        this.setState({ username: documentSnapshot.data().name })

                    }
                })
                .catch(error => console.log(error))
        }
    }

    logout() {
        auth().signOut().then(() => this.props.navigation.navigate('Signup'))
    }
     chooseProfile(){
        //  console.log("profile")
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
              this.setState({userImage:image.path})
            // console.log(image);
          });
     }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.toolbar}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                       
                        <TouchableOpacity >
                            <Ionicons
                                name="ios-arrow-back-sharp"
                                size={30}
                                color="#fff"
                                style={{ left: 10 }}
                                onPress={() => this.props.navigation.goBack()}
                            />
                        </TouchableOpacity>
                        <Text style={styles.title}>PROFILE</Text>
                    </View>

                </View>
                <View style={styles.topContainer}>
                {!this.state.userImage?
                    <TouchableOpacity onPress={()=>this.chooseProfile()}>
                   <Image source={{uri:'https://d25u15mvjkult8.cloudfront.net/Website/Assets/Images/users.png'}} style={{height:100,width:100,borderRadius:50}}></Image>
                    </TouchableOpacity>
                    :
                    <Image source={{uri:this.state.userImage}} style={{height:100,width:100,borderRadius:50}}></Image>

                }

                    <Text style={styles.username}>{this.state.username}</Text>
                   
                </View>
                {/* <View style={styles.ViewFrame}>
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
                    </View> */}
                <View style={styles.logout}>
                <TouchableOpacity onPress={() => this.logout()}><Text style={styles.logoutText}>Logout</Text></TouchableOpacity>
                </View>

                <View style={styles.bottomContainer}>
                    <View>
                <Text>Want More our organisaztion</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('About')}>
                    <Text style={styles.aboutTitle}>About Us</Text>
                    </TouchableOpacity>
                    </View>
                    
                </View>
            </View>
        );
    }

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
        // flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        margin:hp('5%')
    },
    bottomContainer: {
        // flex: 5,
        justifyContent: 'center',
        flexDirection:'row',
        // alignItems: 'center',
        alignSelf:'center',
        alignItems:'center'
        // marginTop:heightPercentageToDP('10%')
    },
    username: {
        fontSize: 30,
        fontWeight: '700',
        color: '#000'
    },
    aboutTitle: {
        fontSize: 15,
        color: '#000',
        fontWeight: '700',
        // bottom: 20
        textDecorationLine:'underline'
    },
    about: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 5,
        borderRadius: 20,
        padding: 10
    },
    aboutText: {
        fontSize: 27,
        fontStyle: 'italic'
    },
    logout: {
        width: widthPercentageToDP('90%'),
        margin:heightPercentageToDP('5%'),
        alignSelf:'center',
        padding:10,
        backgroundColor: '#003f5c',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // top: 30
    },
    logoutText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 20
    }
})