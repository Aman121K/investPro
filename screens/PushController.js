import React, { Component } from "react";
import PushNotification from "react-native-push-notification";
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

var user = auth().currentUser


PushNotification.getChannels(function (channel_ids) {
    console.log(channel_ids);
});

if (user != null) {
    PushNotification.configure({
        onRegister: function (token) {
        },

        onNotification: function (notification) {
            console.log("NOTIFICATION:", notification);

            PushNotification.localNotification({
                channelId: notification.channelId,
                title: notification.title,
                message: notification.message,
                allowWhileIdle: false,
                repeatTime: 1
            })

        },
        senderID: "826413314482",

        popInitialNotification: true,
        requestPermissions: true
    });

}


export default class PushController extends Component {


    render() {
        return null;
    }
}