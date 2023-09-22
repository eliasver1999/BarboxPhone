import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  FlatList,
  ScrollView,
  Pressable,
} from "react-native";
import theme, { Box, Text } from "../Theme/Theme";
import Header from "../components/Header/Header";
import { HomeNavigationProps } from "../Navigation/HomeNavigator";
import BookRow from "../components/Rows/BookRow";
import ItemCard from "../components/ClassCard/ItemCard";
import { useSelector } from "react-redux";
import { getAll } from "../helpers/getters/getAll";
import { book } from "../redux/actions/books";
import { deleteBook } from "../helpers/getters/books";
import { useNavigation } from "@react-navigation/native";
import { Feather as Icon, Ionicons as Icon2 } from "@expo/vector-icons";
import RoundedIconButton from "../components/RoundedIcon/RoundedIconButton";
import {
  BooksComparedLastMonth,
  PreferedWorkout,
} from "../helpers/analytics/books";
import { WeightComparedToLastMonth } from "../helpers/analytics/body";

type Nav = {
  navigate: (value: string) => void;
};
export type CardData = {
  id: number;
  title: string;
  name: keyof typeof Icon.glyphMap;
  message: string;
  data: string;
  decrease: boolean;
  bottomMessage: string;
};
export const HomeScreen = ({
  navigation,
}: HomeNavigationProps<"DashBoard">) => {
  const { user, books, body } = useSelector((state: any) => state);
  const [previous, setPrevious] = useState<book[]>([]);
  const { navigate } = useNavigation<Nav>();
  const [trending, setTrending] = React.useState<CardData[]>([
    {
      id: 1,
      title: "Bookings",
      name: "plus",
      message: "This month",
      data: "0",
      decrease: false,
      bottomMessage: "",
    },
    {
      id: 2,
      title: "Weight",
      name: "plus",
      message: "Last measure",
      data: "0",
      decrease: false,
      bottomMessage: "",
    },
    {
      id: 3,
      title: "Leaderboard",
      name: "plus",
      message: "bye",
      data: "0",
      decrease: false,
      bottomMessage: "",
    },
  ]);
  useEffect(() => {
    getAll();
    let data = [...trending];
    data[2].data = "Position";
    data[2].message = "Position";
    data[2].bottomMessage = "Coming soon!";
    data[2].name = "clock";
    PreferedWorkout();
  }, []);
  useEffect(() => {
    let data = [...trending];
    const percentage = BooksComparedLastMonth();
    data[0].data = String(percentage) + "%";
    if (percentage < 0) {
      data[0].name = "trending-down";
      data[0].decrease = true;
      data[0].bottomMessage = "Less than the previous Month!";
    } else if (percentage > 0) {
      data[0].name = "trending-up";
      data[0].decrease = false;
      data[0].bottomMessage = "Great Job!";
    } else {
      data[0].data = String(0) + "%";
      data[0].name = "minus";
      data[0].decrease = true;
      data[0].bottomMessage = "No progress found!";
    }
    setTrending(data);
  }, [books]);
  const dataPrevious = useMemo(() => {
    let today = new Date();
    let data: book[] = [];
    for (let i = 0; i < books.length; i++) {
      var dateParts = books[i].date.split("/");
      var hour = books[i].class_time[0].start_time.split(":");

      var dateObject = new Date(
        +dateParts[2],
        dateParts[1] - 1,
        +dateParts[0],
        hour[0],
        hour[1],
        0
      );
      if (today < dateObject) {
        data.push(books[i]);
      }
    }
    data.sort(function (a: any, b: any) {
      return new Date(a.date) - new Date(b.date);
    });
    setPrevious((previous) => data);
    return data;
  }, [books]);
  useEffect(() => {
    let data = [...trending];
    const percentage = WeightComparedToLastMonth();
    data[1].data = String(percentage) + "%";
    if (percentage) {
      if (percentage < 0) {
        data[1].name = "trending-up";
        data[1].decrease = false;
        data[1].bottomMessage = "Great Job!";
      } else if (percentage > 0) {
        data[1].name = "trending-down";
        data[1].decrease = true;
        data[1].bottomMessage = "You have to work harder!";
      } else {
        data[1].bottomMessage = "No progress found!";
      }
    }
    setTrending(data);
  }, [body]);
  function renderHeader() {
    return (
      <View style={{ width: "100%", height: 280, ...styles.shadow }}>
        <ImageBackground
          source={require("../images/bg.jpg")}
          resizeMode="cover"
          style={{ flex: 1 }}
        >
          <Header
            title="Dashboard"
            left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
            right={{ icon: "bell", onPress: () => navigation.openDrawer() }}
          />
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text
              style={{ color: "#fafafa", fontSize: 22, letterSpacing: 2 }}
              variant="body"
            >
              Your Subscription:
            </Text>
            <Text
              style={{ color: "#fafafa", fontSize: 24, marginTop: 4 }}
              variant="body"
            >
              {user.sub} days
            </Text>
          </View>
          <View style={{ position: "absolute", bottom: "-25%" }}>
            <Text
              style={{
                marginLeft: 20,
                color: "#fafafa",
                fontSize: 20,
              }}
              variant="body"
            >
              Trending
            </Text>
            <FlatList
              contentContainerStyle={{ marginTop: 20 }}
              data={trending}
              renderItem={({ item }) => {
                return <ItemCard item={item} />;
              }}
              keyExtractor={(item) => `${item.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 2 }}>
      <View style={styles.container}>
        <View style={{ flex: 0.1, paddingBottom: 100, width: "100%" }}>
          {renderHeader()}
        </View>
        <Box flex={1}>
          <Box
            flex={0.3}
            justifyContent="flex-start"
            alignItems={"flex-start"}
            width="100%"
          >
            <Text variant={"label"} marginBottom={"m"} marginLeft={"m"}>
              Upcoming Bookings
            </Text>
            <Box flex={1}>
              {previous.length > 0 ? (
                previous.map((item: book, i: number) => (
                  <BookRow
                    id={item.id}
                    classBook={item.class_time[0].classes[0].name}
                    time={`${item.class_time[0].start_time}-${item.class_time[0].end_time}`}
                    date={item.date}
                    key={item.id}
                    onDelete={() => {
                      deleteBook(item.id)
                        .then((res) => console.log(res))
                        .catch((error) => console.log(error));
                      books.splice(i, 1);
                      books.concat();
                    }}
                  />
                ))
              ) : (
                <>
                  <Box
                    flex={0.01}
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    alignItems="center"
                    width={"100%"}
                    paddingHorizontal={"m"}
                  >
                    <Text variant={"tabs"} marginLeft={"m"}>
                      No bookings found!{" "}
                    </Text>
                    <RoundedIconButton
                      backgroundColor={"cardPrimaryBackground"}
                      color={"white"}
                      size={38}
                      name="plus"
                      onPress={() => navigate("Book")}
                    />
                  </Box>
                </>
              )}
            </Box>
            <Box justifyContent={"center"} alignItems={"center"} width={"100%"}>
              {/* <Pressable onPress={() => navigate("History")}>
                <Text
                  variant={"tabs"}
                  textAlign={"center"}
                  padding={"m"}
                  style={{
                    backgroundColor: theme.colors.cardPrimaryBackground,
                    borderRadius: theme.spacing.s,
                    color: theme.colors.white,
                  }}
                >
                  Show history
                </Text>
              </Pressable> */}
            </Box>
          </Box>
        </Box>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigation: {
    flex: 2,
    backgroundColor: "red",
  },
  body: {
    flex: 9,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
  },
  footer: {
    flex: 1,
    backgroundColor: "cyan",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});
