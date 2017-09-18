import React from 'react';
import { Button, Text, TextInput, View } from "react-native";
import { NativeRouter, Route, Link } from 'react-router-native';

const validationRules = {
  email: {
    presence: {
      message: "^Please enter an email address"
    },
    format: {
      pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "^Please enter a valid email address"
    }
  },

  password: {
    presence: {
      message: "^Please enter a password"
    },
    length: {
      minimum: 5,
      message: "^Your password must be at least 5 characters"
    }
  }
};

export default class LogInScreen extends React.Component {
  // static navigationOptions = {
  //   title: "Log In"
  // };
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailError: "",
      password: "",
      passwordError: ""
    };
  }
  validateRegister(success) {
    const emailError = validate(validationRules, "email", this.state.email);
    const passwordError = validate(validationRules, "password", this.state.password);

    this.setState({
      emailError: emailError,
      passwordError: passwordError
    });

    if (!emailError) {
      success();
    }
  }
  render() {
    // const { navigate } = this.props.navigation;
    return (
      <View style={{marginTop:50}}>
        <Link to="/sign-up"><Text>Sign Up</Text></Link>
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
        <Link to="/app/resources/your"><Text>Log in</Text></Link>
      </View>
    );
  }
}
