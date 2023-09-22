import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useMemo } from "react";

import Header from "../components/Header/Header";
import { HomeNavigationProps } from "../Navigation/HomeNavigator";
import DateTimePicker from "@react-native-community/datetimepicker";
import theme, { Box, Text } from "../Theme/Theme";

import WodCard from "../components/ClassCard/WodCard";
import { useSharedValue } from "react-native-reanimated";
import { useSelector } from "react-redux";
import { wod, Wods } from "../redux/actions/wod";

interface wodsData {
  id: number;
  title: string;
  date: string;
  content: string;
}

const WodScreen = ({ navigation }: HomeNavigationProps<"Book">) => {
  const { wod } = useSelector((state: any) => state);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const shuffleBack = useSharedValue(false);
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = new Date(
      selectedDate.getTime() +
        Math.abs(selectedDate.getTimezoneOffset() * 60000)
    );

    setShow(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const filterData = () => {
    let arr: wod[] = [];
    for (let i = 0; i < wod.length; i++) {
      date.setHours(0, 0, 0);
      const wodDate: string[] = wod[i].date.split("/");
      const wodDate2 = new Date(
        Number(wodDate[2]),
        Number(wodDate[1]) - 1,
        Number(wodDate[0])
      );
      if (wodDate2 === date) {
        arr.push(wod[i]);
      } else if (wodDate2 > new Date()) {
        continue;
      } else {
        arr.push(wod[i]);
      }
    }
    return arr.sort(function (a, b) {
      var aa = a.date.split("/").reverse().join(),
        bb = b.date.split("/").reverse().join();
      return aa < bb ? -1 : aa > bb ? 1 : 0;
    });
  };
  const activeWods = useMemo(() => {
    return filterData();
  }, []);
  console.log(shuffleBack.value);
  return (
    <Box style={{ width: "100%", flex: 1, minHeight: "100%" }} flex={1}>
      <Header
        title="Wod"
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
        right={{ icon: "bell", onPress: () => navigation.openDrawer() }}
        dark={true}
      />
      <TouchableOpacity onPress={() => (shuffleBack.value = true)}>
        <Text
          variant={"date"}
          style={{
            textAlign: "center",
            borderWidth: 1,
            borderRadius: 10,
            padding: theme.spacing.s,
            marginHorizontal: 96,
            marginVertical: theme.spacing.s,
            borderColor: "black",
          }}
        >
          Back to today's WOD
        </Text>
      </TouchableOpacity>

      <Box flex={1}>
        <View style={styles.cardContainer}>
          {activeWods.map((wod, i) => {
            const wodDate: string[] = wod.date.split("/");
            const wodDate2 = new Date(
              Number(wodDate[2]),
              Number(wodDate[1]) - 1,
              Number(wodDate[0])
            );

            return (
              <WodCard
                title={wod.title}
                content={wod.body}
                key={wod.id}
                shuffleBack={shuffleBack}
                index={i}
                date={wod.date}
                shuffleDate={false}
                shuffleBackDate={false}
              />
            );
          })}
        </View>
      </Box>
    </Box>
  );
};

export default WodScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    flex: 1,
  },
});
