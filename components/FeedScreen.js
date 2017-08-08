import React from 'react';
import { Text, View } from "react-native";
import { Icon } from "native-base";

export default class FeedScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Feed',
    headerLeft: null,
    header: null,
    gesturesEnabled: false,
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon
        name={focused ? 'ios-grid' : 'ios-grid-outline'}
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
        <Text>Feed</Text>
      </View>
    );
  }
}
