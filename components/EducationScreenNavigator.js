import React from "react";
import { StackNavigator } from "react-navigation";

import MyEducationScreen from "./MyEducationScreen";

const EducationScreenNavigator = StackNavigator({
  Home: { screen: MyEducationScreen },
});

export default EducationScreenNavigator;
