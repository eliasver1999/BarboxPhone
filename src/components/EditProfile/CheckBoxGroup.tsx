import { Pressable } from "react-native";
import React, { useState } from "react";
import theme, { Box, Text } from "../../Theme/Theme";
import RoundedIconButton from "../RoundedIcon/RoundedIconButton";
import { Feather as Icon } from "@expo/vector-icons";
import Button from "../CustomButton/Button";
import { useSelector } from "react-redux";
type CheckBoxGroupProps = {
  options: {
    value: string;
    label: string;
    icon?: keyof typeof Icon.glyphMap;
  }[];
};

const CheckBoxGroup = ({ options }: CheckBoxGroupProps) => {
  const [selectedValue, setSelectedValue] = useState<string>(
    useSelector((state: any) =>
      state.body && state.body.length>0 ? state.body[state.body.length - 1].gender : ""
    )
  );
  return (
    <Box flexDirection="row" flexWrap="wrap" justifyContent="center">
      {options.map(({ label, value }) => {
        const isSelected = value === selectedValue;
        return (
          <Button
            key={value}
            variant={isSelected ? "primary" : "default"}
            onPress={() => {
              setSelectedValue(value);
            }}
            label={label}
            height={32}
            width="40%"
          ></Button>
        );
      })}
    </Box>
  );
};

export default CheckBoxGroup;
