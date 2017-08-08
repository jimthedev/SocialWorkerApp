import React from "react";
import { StackNavigator } from "react-navigation";

import MyResourcesScreen from "./MyResourcesScreen";

const ResourcesScreenNavigator = StackNavigator(
  {
    MyResources: { screen: MyResourcesScreen }
  },
  {
    initialRouteName: "MyResources",
    headerMode: "none"
  }
);

export default ResourcesScreenNavigator;
