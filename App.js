import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { StackNavigator } from "react-navigation";
import { Root } from "native-base"; // For Toast component

import LogInScreen from './components/LogInScreen';
import SignUpScreen from './components/SignUpScreen';
import MainScreenNavigator from './components/MainScreenNavigator';

import { ApolloProvider, createNetworkInterface, ApolloClient } from 'react-apollo';

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj5j28ocpc73v0122wya21dbq'
});
const client = new ApolloClient({
  networkInterface
});

const StackNavigatorApp = StackNavigator({
  SignUp: { screen: SignUpScreen },
  //CheckEmail: { screen: CheckEmailScreen },
  LogIn: { screen: LogInScreen },
  // CreateAccount: { screen: CreateAccountScreen },
  // CreateProfile: { screen: CreateProfileScreen },
  // ForgotPassword: { screen: ForgotPasswordScreen },

  Main: { screen: MainScreenNavigator }

}, {
  initialRouteName: "SignUp",
  headerMode: "none"
});

const ApolloStackNavigatorApp = () => (
  <ApolloProvider client={client}>
    <Root>
      <StackNavigatorApp />
    </Root>
  </ApolloProvider>
);

export default ApolloStackNavigatorApp;
