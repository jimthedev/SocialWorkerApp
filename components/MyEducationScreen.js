import React from 'react';
import { Text, View } from "react-native";
import { Icon } from "native-base";

export default class MyEducationScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'CEUs',
    headerLeft: null,
    header: null,
    gesturesEnabled: false,
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon
        name={focused ? 'ios-school' : 'ios-school-outline'}
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
        <Text>CEUs</Text>
      </View>
    );
  }
}
