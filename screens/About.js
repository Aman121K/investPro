import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet, ScrollView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { heightPercentageToDP, widthPercentageToDP } from './Utility';
import Ionicons from 'react-native-vector-icons/Ionicons'
const About=({navigation})=>{
    return(
        <View>
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
                        <Text style={styles.title}>About Us</Text>
                    </View>

                </View>
          <View >
              <ScrollView>
                 
                    <View style={{width:widthPercentageToDP('90%'),alignSelf:'center',marginTop:heightPercentageToDP('5%')}}>
                        <Text style={{fontSize:15,fontWeight:'500'}}>We are the latest platform for digital payments. Our goal is to help people invest any chunk of amount daily for a fixed amount of time and earn a good rate of interest for this.</Text>
                    </View>

                    {/* <View>
                        <Text>What is Investment</Text>
                    </View>
                    <View>
                        <Text>An investment company is a corporation or trust engaged in the business of investing pooled capital into financial securities. Investment companies can be privately or publicly owned, and they engage in the management, sale, and marketing of investment products to the public.</Text>
                    </View> */}
                    </ScrollView>
                </View>
                
        </View>
    )
}
export default About;
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
        alignItems: 'center'
    },
    bottomContainer: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    username: {
        fontSize: 30,
        fontWeight: '700',
        color: '#000'
    },
    aboutTitle: {
        fontSize: 40,
        color: '#000',
        fontWeight: '700',
        bottom: 20
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
        alignSelf:'center',
        padding:5,
        backgroundColor: '#003f5c',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        top: 30
    },
    logoutText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 30
    }
})