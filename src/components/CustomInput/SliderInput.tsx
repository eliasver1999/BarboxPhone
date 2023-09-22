import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { Box } from "../../Theme/Theme";
import { Slider } from "@miblanchard/react-native-slider";
import CustomInput from "./CustomInput";
import { Body, BodyKeys } from "../EditProfile/Configuration";
import { body } from "../../redux/actions/body";

type SliderInputProps = {
  minValue: number;
  maxValue: number;
  setValue: (value: any) => void;
  count: string;
  field: BodyKeys;
  data: body;
  step?: number;
};
interface Data {
  value: number | number[];
}
const SliderInput = ({
  minValue,
  maxValue,
  count,
  setValue,
  field,
  data,
  step,
}: SliderInputProps) => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text>
        {data[field]}
        {count}
      </Text>
      <Slider
        minimumValue={minValue}
        maximumValue={maxValue}
        value={data[field]}
        onValueChange={(value) =>
          setValue({ ...data, [field]: value.toString() })
        }
        step={step}
        containerStyle={{
          width: 300,
          justifyContent: "center",
        }}
      />
    </Box>
  );
};
SliderInput.defaultProps = {
  step: 1,
};
export default SliderInput;
