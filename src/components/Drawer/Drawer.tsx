import { Image, Dimensions, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import { Box, Text, Theme } from "../../Theme/Theme";
import { Feather as Icon } from "@expo/vector-icons";
import DrawerItem from "./DrawerItem";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../Header/Header";
import { HomeDrawerNavigatorParamList } from "../../Navigation/HomeNavigator";
import { useSelector } from "react-redux";
type Props = {};
export type SingleItem = {
  icon: keyof typeof Icon.glyphMap;
  label: string;
  color: keyof Theme["colors"];
  screen: keyof HomeDrawerNavigatorParamList;
};
interface EnumServiceItems extends Array<SingleItem> {}
const items: EnumServiceItems = [
  {
    icon: "home",
    label: "Home",
    color: "greenLight",
    screen: "DashBoard",
  },
  {
    icon: "clock",
    label: "Book",
    color: "purple",
    screen: "Book",
  },
  {
    icon: "heart",
    label: "Wod",
    color: "orange",
    screen: "Wod",
  },
  {
    icon: "activity",
    label: "Analytics",
    color: "cyan",
    screen: "Analytics",
  },
  {
    icon: "settings",
    label: "Edit Profile",
    color: "pink",
    screen: "EditProfile",
  },
  {
    icon: "log-out",
    label: "Logout",
    color: "gray",
    screen: "Settings",
  },
];
const { width } = Dimensions.get("window");
export const DRAWER_WIDTH = width * 0.8;
const aspectRatio = 750 / 1125;
const height = width * aspectRatio;
const DrawerComponent = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const user = useSelector((state: any) => state.user);

  return (
    <Box flex={1}>
      <Box flex={0.2} backgroundColor="white">
        <ImageBackground
          source={require("../../images/bg.jpg")}
          imageStyle={{ borderBottomRightRadius: 80 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <Header
            title="Menu"
            right={{
              icon: "x",
              onPress: () => navigation.dispatch(DrawerActions.closeDrawer()),
            }}
          />
        </ImageBackground>
      </Box>
      <Box flex={0.8}>
        <ImageBackground
          source={require("../../images/bg.jpg")}
          style={{ flex: 1 }}
        />
        <ImageBackground
          source={require("../../images/bg.jpg")}
          style={{ flex: 1 }}
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          borderTopLeftRadius={60}
          borderBottomRightRadius={70}
          backgroundColor="white"
          justifyContent="center"
          padding={"xl"}
        >
          <Box
            position="absolute"
            left={DRAWER_WIDTH / 2 - 50}
            top={-50}
            width={100}
            height={100}
            style={{ borderRadius: 50 }}
          >
            {user.avatar ? (
              <Image
                source={{ uri: user.avatar }}
                style={{ width: "100%", height: "100%", borderRadius: 50 }}
              />
            ) : (
              ""
            )}
          </Box>
         
          <Box marginTop={"xl"}>
            {items.map((item) => (
              <DrawerItem {...item} key={item.screen} />
            ))}
          </Box>
        </Box>
      </Box>
      {/* <Box
        flex={0.05}
        backgroundColor="white"
        width={DRAWER_WIDTH}
        height={height * 0.11}
        overflow="hidden"
      >
        <Image
          source={require("../../images/bg2.jpg")}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: -height * (1 - 0.91),
            width: DRAWER_WIDTH,
            height,
            borderTopLeftRadius: 60,
          }}
        />
      </Box> */}
    </Box>
  );
};

export default DrawerComponent;
