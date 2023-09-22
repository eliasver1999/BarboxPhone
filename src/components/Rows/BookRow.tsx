import { View, Dimensions } from "react-native";
import React from "react";
import { Box, Text } from "../../Theme/Theme";
import SwipeableRow from "./SwipeableRow";

type BookRowProps = {
  id: number;
  date: string;
  classBook: string;
  time: string;
  onDelete: () => void;
};
const { width } = Dimensions.get("window");
const BookRow = ({ date, classBook, time, onDelete }: BookRowProps) => {
  return (
    <SwipeableRow onDelete={onDelete}>
      <Box
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        flex={1}
        width={width}
        paddingHorizontal={"l"}
      >
        <Text variant={"tabs"}>{date}</Text>
        <Text variant={"tabs"}>{classBook}</Text>
        <Text variant={"tabs"}>{time}</Text>
      </Box>
    </SwipeableRow>
  );
};

export default BookRow;
