import React from 'react';
import { Text, View } from "react-native";
import { Icon } from "native-base";

export default class MyProfileScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Profile',
    headerLeft: null,
    header: null,
    gesturesEnabled: false,
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon
        name={focused ? 'ios-contact' : 'ios-contact-outline'}
        style={{ color: tintColor }}
       />
    ),
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Profile</Text>
      </View>
    );
  }
}
