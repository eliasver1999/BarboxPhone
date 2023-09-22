import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useMemo } from "react";

import Header from "../components/Header/Header";
import { HomeNavigationProps } from "../Navigation/HomeNavigator";
import DateTimePicker from "@react-native-community/datetimepicker";
import theme, { Box, Text } from "../Theme/Theme";

import Weight from "../components/Graphs/Weight";
import BookingsHeatMap from "../components/Graphs/BookingsHeatMap";
import BookDay from "../components/Graphs/BookDay";

const Analytics = ({ navigation }: HomeNavigationProps<"Analytics">) => {
  return (
    <Box style={{ width: "100%", height: "100%" }} flex={1}>
      <Header
        title="Analytics"
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
        right={{ icon: "bell", onPress: () => navigation.openDrawer() }}
        dark={true}
      />

      <ScrollView>
        <Box marginVertical={"m"} paddingHorizontal={"s"}>
          <Box>
            <Weight title="Weight Progress" />
          </Box>
          <Box>
            <BookingsHeatMap />
          </Box>
          <Box marginTop={"m"}>
            <BookDay title="Prefered Days" />
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default Analytics;

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
