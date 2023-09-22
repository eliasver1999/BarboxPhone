import { View, Text, Pressable } from "react-native";
import React from "react";
import RoundedIcon, { RoundedIconProps } from "./RoundedIcon";
import { RectButton } from "react-native-gesture-handler";
interface RoundedIconButtonProps extends RoundedIconProps {
  onPress: () => void;
}

const RoundedIconButton = ({ onPress, ...props }: RoundedIconButtonProps) => {
  return (
    <Pressable {...{ onPress }}>
      <RoundedIcon {...props} />
    </Pressable>
  );
};
RoundedIconButton.defaultProps = {
  iconRatio: 0.7,
};
export default RoundedIconButton;
