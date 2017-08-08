import React from 'react';
import { Button, Text, TextInput, View } from "react-native";

export default class LogInScreen extends React.Component {
  static navigationOptions = {
    title: "Log In"
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button onPress={() => navigate('SignUp', { })} title="Sign Up" />
        <Button onPress={() => {}} title="Forgot Your Password" />
        <Text>Log In</Text>
        <Text>(welcome back!)</Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <Button onPress={() => navigate('Main', { })} title="Log in" />
      </View>
    );
  }
}
