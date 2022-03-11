import auth from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Component } from "react";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import Payment from "./screens/Payment";
import MainScreen from "./screens/MainScreen";
import Splash from "./screens/SplashScreen";
import Withdraw from "./screens/Withdraw";
import Profile from "./screens/Profile";
import Statistics from './screens/Statistics';
import Transaction from './screens/Transaction'
import ForgotPassword from './screens/ForgotPassword'
import About from "./screens/About";

const SPLASH_SCREEN = "Splash";
const MAIN_SCREEN = "MainScreen";
const NAVIGATION_SCREEN = "navigation";

const Stack = createNativeStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentToRender: SPLASH_SCREEN,
    };
    console.disableYellowBox = true;
  }

  componentDidMount() {
    this.timeoutHandle = setTimeout(() => {
      var user = auth().currentUser;
      console.log(user)
      if (user == null) {
        this.setState({
          componentToRender: NAVIGATION_SCREEN,
        });

      } else {
        this.setState({
          componentToRender: MAIN_SCREEN,
        });
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutHandle);
  }

  render() {
    const { componentToRender } = this.state;

    if (componentToRender === MAIN_SCREEN) {
      return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainScreen" component={MainScreen} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="Withdraw" component={Withdraw} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Statistics" component={Statistics} />
            <Stack.Screen name="Transaction" component={Transaction} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="About" component={About}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    if (componentToRender === NAVIGATION_SCREEN) {
      return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="About" component={About}/>
            <Stack.Screen name="MainScreen" component={MainScreen} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="Withdraw" component={Withdraw} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Statistics" component={Statistics} />
            <Stack.Screen name="Transaction" component={Transaction} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return <Splash />;
  }
}