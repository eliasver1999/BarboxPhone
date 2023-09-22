import { View, Dimensions, Image, ImageBackground } from "react-native";
import React from "react";
import { Box, Text } from "../Theme/Theme";
import Header from "../components/Header/Header";
import { HomeNavigationProps } from "../Navigation/HomeNavigator";
import { DrawerActions } from "@react-navigation/native";
import Tabs from "../components/EditProfile/Tabs";
import Configuration from "../components/EditProfile/Configuration";
import Personal from "../components/EditProfile/Personal";
import { useSelector } from "react-redux";
import { userType } from "../redux/actions/user";

const { width } = Dimensions.get("window");
const tabs = [
  { id: "configuration", title: "Body Configuration" },
  { id: "info", title: "Personal Info" },
];
type Props = {};

const EditProfileScreen = ({
  navigation,
}: HomeNavigationProps<"EditProfile">) => {
  const user: userType = useSelector((state: any) => state.user);
  return (
    <Box flex={1}>
      <Box flex={0.25}>
        <ImageBackground
          source={require("../images/bg.jpg")}
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
            title="Edit Profile"
            left={{
              icon: "menu",
              onPress: () => navigation.dispatch(DrawerActions.openDrawer()),
            }}
          />
        </ImageBackground>
      </Box>
      <Box>
        <Box
          position="absolute"
          left={width / 2 - 50}
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
        <Box marginVertical={"m"} style={{ marginTop: 50 }}>
          <Text variant={"title1"} textAlign="center">
            {user.name}
          </Text>

          <Text variant={"title2"} textAlign="center">
            {user.email}
          </Text>
        </Box>
      </Box>
      <Tabs tabs={tabs}>
        <Personal />
        <Configuration />
      </Tabs>
    </Box>
  );
};

export default EditProfileScreen;
