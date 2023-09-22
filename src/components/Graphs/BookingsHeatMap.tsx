import { View, Text, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { ContributionGraph } from "react-native-chart-kit";
import { Box } from "../../Theme/Theme";
import { useSelector } from "react-redux";
import { book } from "../../redux/actions/books";

const screenWidth = Dimensions.get("window").width;
interface DataType {
  date: string;
  count: number;
}
type Props = {};

const chartConfig = {
  backgroundGradientFrom: "#595959",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#0B0B0B",
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(140, 0, 0, ${opacity})`,
  strokeWidth: 15, // optional, default 3
  barPercentage: 0.5,
  decimalPlaces: 2,
  useShadowColorFromDataset: false, // optional
};
const BookingsHeatMap = (props: Props) => {
  const books = useSelector((state: any) => state.books);
  const [data, setData] = useState<DataType[]>([]);
  useEffect(() => {
    const dt: DataType[] = [];
    const test = books.map((d: book) => {
      let obj: DataType = { date: "", count: 0 };
      let date = d.date;
      let dateArray = date.split("/");
      obj.date = dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];
      obj.count = 1;
      dt.push(obj);
    });
    setData(dt);
  }, [books]);

  return (
    <Box
      alignItems="center"
      paddingHorizontal={"m"}
      justifyContent="center"
      borderRadius={20}
    >
      <Text style={{ marginVertical: 4 }}>Booking Heatmap (last 110 days)</Text>
      <ContributionGraph
        values={data}
        endDate={new Date()}
        numDays={110}
        width={screenWidth - 16}
        height={220}
        chartConfig={chartConfig}
        fromZero={true}
        style={{
          borderRadius: 20,
          backgroundColor: "white",
        }}
        onDayPress={(date) => console.log(date)}
      />
    </Box>
  );
};

export default BookingsHeatMap;
