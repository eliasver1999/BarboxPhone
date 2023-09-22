import { Text, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { PieChart } from "react-native-chart-kit";
import { Box } from "../../Theme/Theme";
import { useSelector } from "react-redux";
import { getByDay } from "../../helpers/analytics/books";

const screenWidth = Dimensions.get("window").width;

type Props = {
  title: string;
};

const chartConfig = {
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 15, // optional, default 3
  barPercentage: 0.5,
  decimalPlaces: 2,
  backgroundColor: "transparent",
  useShadowColorFromDataset: false, // optional
};
interface DataType {
  name: string;
  population: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const colors = [
  "#bd312a",
  "#bd872a",
  "#9fbd2a",
  "#2abd91",
  "#2a78bd",
  "#6c2abd",
  "#bd2a93",
];
const BookDay = ({ title }: Props) => {
  const books = useSelector((state: any) => state.books);
  const [dataDays, setDataDays] = useState<DataType[]>([]);
  useEffect(() => {
    let d = [];
    for (let i = 0; i < days.length; i++) {
      let obj: DataType = {
        name: "",
        population: 0,
        color: "red",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      };
      obj.population = getByDay(days[i]);
      obj.name = days[i];
      obj.color = colors[i];
      obj.legendFontColor = colors[i];
      if (obj.population > 0) {
        d.push(obj);
      }
    }
    setDataDays(d);
  }, [books]);

  return (
    <Box
      flex={1}
      alignItems="center"
      paddingHorizontal={"m"}
      justifyContent="center"
      borderRadius={20}
    >
      <Text>{title}</Text>
      <PieChart
        data={dataDays}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
      />
    </Box>
  );
};

export default BookDay;
