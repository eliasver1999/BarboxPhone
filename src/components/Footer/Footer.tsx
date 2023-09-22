import { View, Text, Dimensions } from "react-native";
import React from "react";
import theme, { Box } from "../../Theme/Theme";
import Button from "../CustomButton/Button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
type FooterProps = {
  label: string;
  onPress: () => void;
};
const { width } = Dimensions.get("window");
const Footer = ({ label, onPress }: FooterProps) => {
  const insets = useSafeAreaInsets();
  return (
    <Box
      backgroundColor={"cardPrimaryBackground"}
      padding={"s"}
      borderTopLeftRadius={theme.spacing.xl}
    >
      <Box style={{ padding: insets.bottom }} alignItems="center">
        <Button
          variant="secondary"
          {...{ label, onPress }}
          height={38}
          width={width / 2}
          label="Book"
        />
      </Box>
    </Box>
  );
};

export default Footer;
