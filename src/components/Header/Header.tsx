import { TouchableOpacity, View } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Feather as Icon } from "@expo/vector-icons";
import { Box, Text } from "../../Theme/Theme";
import RoundedIconButton from "../RoundedIcon/RoundedIconButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
interface HeaderProps {
  left?: {
    icon: keyof typeof Icon.glyphMap;
    onPress: () => void;
  };
  title: string;
  right?: {
    icon: keyof typeof Icon.glyphMap;
    onPress: () => void;
  };
  dark: boolean;
}

const Header = ({ title, left, right, dark }: HeaderProps) => {
  const insets = useSafeAreaInsets();
  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      style={{ marginTop: insets.top, marginBottom: 10 }}
      paddingHorizontal={"m"}
      alignItems="center"
      zIndex={20}
    >
      {left ? (
        <RoundedIconButton
          name={left.icon}
          iconRatio={0.6}
          size={44}
          color={dark ? "body" : "white"}
          backgroundColor={"transparent"}
          onPress={left.onPress}
        />
      ) : (
        <View style={{ width: 44 }} />
      )}
      <Text variant={"header"} style={{ color: dark ? "gray" : "white" }}>
        {title.toUpperCase()}
      </Text>
      {right ? (
        <RoundedIconButton
          name={right.icon}
          iconRatio={0.6}
          size={44}
          color={dark ? "body" : "white"}
          backgroundColor={"transparent"}
          onPress={right.onPress}
        />
      ) : (
        <View style={{ width: 44 }} />
      )}
    </Box>
  );
};
Header.defaultProps = {
  dark: false,
};
export default Header;
