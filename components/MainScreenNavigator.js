import React from "react";
import { TabNavigator } from "react-navigation";

import FeedScreenNavigator from "./FeedScreenNavigator";
import EducationScreenNavigator from "./EducationScreenNavigator";
import ResourcesScreenNavigator from "./ResourcesScreenNavigator";
import ProfileScreenNavigator from "./ProfileScreenNavigator";

const MainScreenNavigator = TabNavigator({
  Feed: { screen: FeedScreenNavigator },
  Resources: { screen: ResourcesScreenNavigator },
  Education: { screen: EducationScreenNavigator },
  Profile: { screen: ProfileScreenNavigator }
}, {
    initialRouteName: "Feed",
    // lazy is needed for https://github.com/facebook/react-native/issues/1831
    lazy: true
});

export default MainScreenNavigator;
