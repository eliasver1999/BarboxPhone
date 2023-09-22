import { View, Text } from "react-native";
import React from "react";
import { HomeScreen } from "../screens/HomeScreen";
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from "@react-navigation/drawer";
import DrawerComponent, { DRAWER_WIDTH } from "../components/Drawer/Drawer";
import SettingsScreen from "../screens/SettingsScreen";
import BookScreen from "../screens/BookScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import WodScreen from "../screens/WodScreen";
import Analytics from "../screens/Analytics";
import HistoryScreen from "../screens/HistoryScreen";
type Props = {};
export type HomeDrawerNavigatorParamList = {
  DashBoard: undefined;
  Settings: undefined;
  Book: undefined;
  EditProfile: undefined;
  Wod: undefined;
  Analytics: undefined;
  History: undefined;
};
const Drawer = createDrawerNavigator<HomeDrawerNavigatorParamList>();
export interface HomeNavigationProps<
  RouteName extends keyof HomeDrawerNavigatorParamList
> {
  navigation: DrawerNavigationProp<HomeDrawerNavigatorParamList, RouteName>;
}
const HomeNavigator = (props: Props) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: DRAWER_WIDTH,
        },
      }}
      drawerContent={() => <DrawerComponent />}
    >
      <Drawer.Screen name="DashBoard" component={HomeScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Book" component={BookScreen} />
      <Drawer.Screen name="EditProfile" component={EditProfileScreen} />
      <Drawer.Screen name="Wod" component={WodScreen} />
      <Drawer.Screen name="Analytics" component={Analytics} />
      <Drawer.Screen name="History" component={HistoryScreen} />
    </Drawer.Navigator>
  );
};

export default HomeNavigator;
