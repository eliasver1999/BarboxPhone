import { StyleSheet, View, Dimensions, Pressable } from "react-native";
import React from "react";
import theme, { Box, Text } from "../../Theme/Theme";
import RoundedIcon from "../RoundedIcon/RoundedIcon";
import { SingleClassTime } from "../../redux/actions/classTimes";

const { width: wWidth } = Dimensions.get("window");
const aspectRatios = [160 / 145, 210 / 145, 120 / 145, 1];
interface ClassProps {
  outfit: SingleClassTime;
  width: number;
  onSelect: (value: any) => void;
  selectedClass: SingleClassTime | undefined;
  onDiselect: (value: any) => void;
}
const ClassCard = ({
  outfit,
  width,
  onSelect,
  selectedClass,
  onDiselect,
}: ClassProps) => {
  const aspectRatio = aspectRatios[Math.round(Math.random() * (2 - 0) + 0)];
  return (
    <Pressable
      style={{
        backgroundColor: outfit.classes[0].color,
        width,
        height: width,
        flexBasis: "50%",
        borderRadius: 10,
        marginBottom: 10,
      }}
      onPress={
        selectedClass
          ? selectedClass.id === outfit.id
            ? onDiselect
            : onSelect
          : onSelect
      }
    >
      <Box
        flexDirection={"row"}
        justifyContent="space-between"
        marginTop={"s"}
        alignItems="center"
      >
        <View style={{ width: 28 }} />
        <Box>
          <Text variant="header">
            {outfit.start_time}-{outfit.end_time}
          </Text>
        </Box>
        <Box marginRight={"s"}>
          {selectedClass ? (
            selectedClass.id === outfit.id ? (
              <RoundedIcon
                name="check"
                size={18}
                backgroundColor={"greenLight"}
                color={"white"}
              />
            ) : (
              <RoundedIcon
                name="check"
                size={18}
                backgroundColor={"white"}
                color={"white"}
              />
            )
          ) : (
            <RoundedIcon
              name="check"
              size={18}
              backgroundColor={"white"}
              color={"white"}
            />
          )}
        </Box>
      </Box>
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text variant="header">{outfit.classes[0].name}</Text>
      </Box>
    </Pressable>
  );
};

export default ClassCard;

const styles = StyleSheet.create({});
