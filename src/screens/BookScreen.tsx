import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import ClassCard from "../components/ClassCard/ClassCard";
import Header from "../components/Header/Header";
import { HomeNavigationProps } from "../Navigation/HomeNavigator";
import DateTimePicker from "@react-native-community/datetimepicker";
import theme, { Box, Text } from "../Theme/Theme";
import Footer from "../components/Footer/Footer";
import { useSelector } from "react-redux";
import { ClassTimes, SingleClassTime } from "../redux/actions/classTimes";
import { addBook } from "../helpers/getters/books";
import { formatDate } from "../helpers/dates/formatDate";
import Snackbar, {
  SnackbarPosition,
  SnackbarType,
} from "../components/Snackbar/Snackbar";
import { hour, HoursData } from "../redux/actions/hours";
const { width: wWidth } = Dimensions.get("window");

export interface selected {
  id: number;
  color: string;
  aspectRatio: number;
}
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const BookScreen = ({ navigation }: HomeNavigationProps<"Book">) => {
  const { classTimes, hours } = useSelector((state: any) => state);
  const width = (wWidth - 32 - 4) / 2;
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [day, setDay] = useState<string>();
  const [selectedClass, setSelectedClass] = useState<SingleClassTime>();
  const [footerHeight, setFooterHeight] = useState(0);
  const [todayLesson, setTodayLesson] = useState<SingleClassTime[]>();
  const [visible, setVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("You have to select a class");
  const [type, setType] = useState<SnackbarType>(SnackbarType.WARNING);
  const renderCounter = useRef(0);
  renderCounter.current = renderCounter.current + 1;
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };
  useEffect(() => {
    setDay(days[date.getDay()]);
    const newLessons: SingleClassTime[] = classTimes.filter(
      (cl: SingleClassTime) => cl.days === day
    );
    newLessons.sort(function (a: SingleClassTime, b: SingleClassTime) {
      const start: any = new Date("1970/01/01 " + a.start_time);
      const end: any = new Date("1970/01/01 " + b.start_time);
      return start - end;
    });
    setTodayLesson((prevState: SingleClassTime[] | undefined) => [
      ...newLessons,
    ]);
  }, [date, classTimes, day]);
  const showDatepicker = () => {
    setShow(true);
  };
  const book = () => {
    if (selectedClass) {
    }
  };
  return (
    <Box style={{ width: "100%", flex: 1, minHeight: "100%" }} flex={1}>
      <Snackbar
        message={message}
        position={SnackbarPosition.BOTTOM}
        visible={visible}
        setVisible={setVisible}
        color={type}
      />
      <Header
        title="Book"
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
        right={{ icon: "bell", onPress: () => navigation.openDrawer() }}
        dark={true}
      />
      <TouchableOpacity onPress={showDatepicker}>
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
          {date.toDateString()}
        </Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          is24Hour={true}
          onChange={onChange}
        />
      )}
      <Box flex={1}>
        <ScrollView contentContainerStyle={{ paddingBottom: footerHeight }}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <View style={{ marginRight: 10 }}>
              {todayLesson
                ? todayLesson.map((classTime: SingleClassTime, i: number) => {
                    if (i % 2 == 0) {
                      if (
                        hours.some((e: hour) => {
                          if (
                            e.start_time == classTime.start_time &&
                            e.end_time == classTime.end_time
                          ) {
                            return true;
                          }
                          return false;
                        })
                      ) {
                        return (
                          <ClassCard
                            key={classTime.id}
                            outfit={classTime}
                            width={width}
                            onSelect={() => setSelectedClass(classTime)}
                            selectedClass={selectedClass}
                            onDiselect={() => setSelectedClass(undefined)}
                          />
                        );
                      }
                    }
                  })
                : ""}
            </View>
            <View>
              {todayLesson
                ? todayLesson.map((classTime: SingleClassTime, i: number) => {
                    if (i % 2 !== 0) {
                      if (
                        hours.some((e: hour) => {
                          if (
                            e.start_time == classTime.start_time &&
                            e.end_time == classTime.end_time
                          ) {
                            return true;
                          }
                          return false;
                        })
                      ) {
                        return (
                          <ClassCard
                            key={classTime.id}
                            outfit={classTime}
                            width={width}
                            onSelect={() => setSelectedClass(classTime)}
                            selectedClass={selectedClass}
                            onDiselect={() => setSelectedClass(undefined)}
                          />
                        );
                      }
                    }
                  })
                : ""}
            </View>
          </View>
        </ScrollView>
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          onLayout={({
            nativeEvent: {
              layout: { height },
            },
          }) => setFooterHeight(height)}
        >
          <Footer
            onPress={() =>
              selectedClass
                ? addBook(selectedClass.id, formatDate(date))
                    .then((res) => {
                      setVisible(true);
                      setType(SnackbarType.SUCCESS);
                      setMessage(res);
                    })
                    .catch((error) => {
                      setVisible(true);
                      setType(SnackbarType.FAILURE);
                      setMessage(error);
                    })
                : setVisible(true)
            }
            label="Book"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default BookScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
