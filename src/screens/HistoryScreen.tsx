import { StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState, useMemo } from "react";

import Header from "../components/Header/Header";
import { HomeNavigationProps } from "../Navigation/HomeNavigator";
import theme, { Box, Text } from "../Theme/Theme";

import Weight from "../components/Graphs/Weight";
import BookingsHeatMap from "../components/Graphs/BookingsHeatMap";
import BookDay from "../components/Graphs/BookDay";
import { useSelector } from "react-redux";
import HistoryRow from "../components/Rows/HistoryRow";
import { book } from "../redux/actions/books";

const HistoryScreen = ({ navigation }: HomeNavigationProps<"Analytics">) => {
  const books = useSelector((state: any) => state.books);
  const [test, setTest] = useState<book[]>([]);
  useEffect(() => {
    setTest(books);
  }, [books]);
  useEffect(() => {
    setTest(books);
  }, []);
  return (
    <Box style={{ width: "100%", height: "100%" }} flex={1}>
      <Header
        title="Book History"
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
        dark={true}
      />

      <Box flex={1} marginTop={"m"}>
        <FlatList
          data={test}
          renderItem={({ item }) => <HistoryRow data={item} />}
          keyExtractor={(item: book) => item.id.toLocaleString()}
        />
      </Box>
    </Box>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    flex: 1,
  },
});
