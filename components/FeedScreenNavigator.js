import React from "react";
import { StackNavigator } from "react-navigation";

import FeedScreen from "./FeedScreen";

const FeedScreenNavigator = StackNavigator({
  Home: { screen: FeedScreen },
});

export default FeedScreenNavigator;
