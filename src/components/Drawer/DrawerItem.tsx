import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { Box, Text, Theme } from "../../Theme/Theme";
import { RectButton } from "react-native-gesture-handler";
import { Feather as Icon } from "@expo/vector-icons";
import RoundedIcon from "../RoundedIcon/RoundedIcon";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { HomeDrawerNavigatorParamList } from "../../Navigation/HomeNavigator";
import { SingleItem } from "./Drawer";
import { logoutAction } from "../../helpers/login";

const DrawerItem = ({ icon, label, color, screen }: SingleItem) => {
  const navigation = useNavigation();
  const logout = () => {
    logoutAction()
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };
  return (
    <Pressable
      style={{ borderRadius: 30 }}
      onPress={() =>
        label == "Logout" ? logout() : navigation.navigate(screen as never)
      }
    >
      <Box flexDirection="row" alignItems="center" padding={"m"}>
        <RoundedIcon
          name={icon}
          size={36}
          backgroundColor={color}
          color={"white"}
          iconRatio={0.5}
        />
        <Text variant="tabs" marginLeft={"m"}>
          {label}
        </Text>
      </Box>
    </Pressable>
  );
};

export default DrawerItem;
