import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../Theme/Theme";

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    margin: 5,
  },
});
type ButtonProps = {
  variant: "default" | "primary";
  label?: string;
  onPress: () => void;
  height: number | string;
  width: number | string;
};

const Button = ({ label, onPress, variant, height, width }: ButtonProps) => {
  const theme = useTheme<Theme>();
  const backgroundColor =
    variant === "primary"
      ? theme.colors.cardPrimaryBackground
      : theme.colors.white;
  const color = variant === "primary" ? theme.colors.gray : theme.colors.white;
  return (
    <Pressable
      style={[styles.container, { backgroundColor, width, height }]}
      {...{ onPress }}
    >
      <Text
        style={{
          color: variant === "primary" ? theme.colors.white : theme.colors.gray,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default Button;
