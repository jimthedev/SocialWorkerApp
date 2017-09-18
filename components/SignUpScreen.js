import React from 'react';
import { Button, Text, TextInput, View } from "react-native";
import { NativeRouter, Route, Link } from 'react-router-native';

export default class SignUpScreen extends React.Component {
  // static navigationOptions = {
  //   title: "Sign Up"
  // };
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    // const { navigate } = this.props.navigation;
    return (
      <View style={{marginTop:50}}>
        <Link to="/log-in"><Text>Log in</Text></Link>

        <Button onPress={() => {}} title="Need help?" />
        <Text>Sign up</Text>
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
