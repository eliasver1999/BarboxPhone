import { View, Text } from "react-native";
import React from "react";
import { Box, Theme } from "../../Theme/Theme";
import { Feather as Icon, Ionicons as Icon2 } from "@expo/vector-icons";

export interface RoundedIconProps {
  name: keyof typeof Icon.glyphMap;
  size: number;
  color: keyof Theme["colors"];
  backgroundColor: keyof Theme["colors"];
  iconRatio: number;
}

const RoundedIcon = ({
  name,
  size,
  color,
  backgroundColor,
  iconRatio,
}: RoundedIconProps) => {
  const iconSize = size * iconRatio;
  return (
    <Box
      height={size}
      width={size}
      justifyContent="center"
      alignItems="center"
      style={{ borderRadius: size / 2 }}
      {...{ backgroundColor }}
    >
      <Text style={{ width: iconSize, height: iconSize }} {...{ color }}>
        <Icon size={iconSize} {...{ name }} {...{ color }} />
      </Text>
    </Box>
  );
};
RoundedIcon.defaultProps = {
  iconRatio: 0.7,
};
export default RoundedIcon;
