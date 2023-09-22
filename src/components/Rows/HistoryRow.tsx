import { View, Dimensions } from "react-native";
import React from "react";
import { Box, Text } from "../../Theme/Theme";
import SwipeableRow from "./SwipeableRow";
import { book } from "../../redux/actions/books";

interface BookSingle {
  date: string;
  className: string;
  time: string;
}
const { width } = Dimensions.get("window");
const HistoryRow = ({ data }: { data: book }) => {
  return (
    <Box
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      flex={1}
      width={width}
      paddingHorizontal={"l"}
      paddingVertical={"m"}
      marginVertical={"s"}
      backgroundColor={"cardPrimaryBackground"}
    >
      <Text variant={"tabs"}>
        {data.class_time[0].start_time}:{data.class_time[0].end_time}
      </Text>
      <Text variant={"tabs"}>{data.class_time[0].classes[0].name}</Text>
      <Text variant={"tabs"}>{data.date}</Text>
    </Box>
  );
};

export default HistoryRow;
