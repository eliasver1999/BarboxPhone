import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { useSelector } from "react-redux";
import { body } from "../../redux/actions/body";
import theme, { Box } from "../../Theme/Theme";
type Props = {
  title: string;
};

const Weight = ({ title }: Props) => {
  const body = useSelector((state: any) => state.body);
  const [weight, setWeight] = useState<number[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [show, setShow] = useState<number>(-1);
  useEffect(() => {
    setWeight(body.map((t: body) => t.weight));
    setDates(
      body
        .slice(0)
        .reverse()
        .map((t: body) => t.date)
    );
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>{title}</Text>
        {weight.length > 0 ? (
          <LineChart
            data={{
              labels: [],
              datasets: [
                {
                  data: weight,
                },
              ],
            }}
            width={Dimensions.get("window").width - 16} // from react-native
            height={320}
            onDataPointClick={(value) => setShow(value.index)}
            withInnerLines={false}
            withOuterLines={false}
            withVerticalLabels={false}
            yLabelsOffset={16}
            xLabelsOffset={16}
            renderDotContent={(indexData) =>
              show == indexData.index ? (
                <Text
                  key={indexData.index}
                  style={{
                    textAlign: "center",
                    color: "gray",
                    marginTop: 280,
                    alignItems: "flex-end",
                  }}
                >
                  Your weight on {dates[indexData.index]} was{" "}
                  {indexData.indexData}kg
                </Text>
              ) : (
                ""
              )
            }
            yAxisSuffix="kg"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "white",
              backgroundGradientFrom: "white",
              backgroundGradientTo: "white",
              strokeWidth: 2,
              decimalPlaces: 1, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              barPercentage: 1,
            }}
            bezier
            style={{
              marginVertical: 16,
              borderRadius: 16,
            }}
          />
        ) : (
          ""
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chart: {
    flex: 1,
  },
});
export default Weight;
