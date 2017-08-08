import React from "react";
import { StackNavigator } from "react-navigation";

import MyProfileScreen from "./MyProfileScreen";

const ProfileScreenNavigator = StackNavigator({
  Home: { screen: MyProfileScreen },
}, {
    headerMode: 'none',
});

export default ProfileScreenNavigator;
