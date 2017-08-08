import React from 'react';
import { Button, Text, TextInput, View } from "react-native";

export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: "Sign Up"
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button onPress={() => navigate('LogIn', { })} title="Log in" />
        <Button onPress={() => {}} title="Need help?" />
        <Text>Sign Up</Text>
        <Text>(it's free)</Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <Button onPress={() => {}} title="Create account" />
      </View>
    );
  }
}
