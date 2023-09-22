import { Pressable, Dimensions } from "react-native";
import React, { Children, ReactNode, useState } from "react";
import theme, { Box, Text } from "../../Theme/Theme";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
interface Tab {
  id: string;
  title: string;
}

interface TabsProps {
  tabs: Tab[];
  children: ReactNode;
}
const { width } = Dimensions.get("window");
const Tabs = ({ tabs, children }: TabsProps) => {
  const [index, setIndex] = useState(0);

  const animatedStyles = useAnimatedStyle(() => {
    if (index === 0) {
      return {
        transform: [{ translateX: withSpring(index + width * 0.25) }],
      };
    } else {
      return {
        transform: [{ translateX: withSpring(1 * width * 0.75) }],
      };
    }
  });
  const animatedStylesContent = useAnimatedStyle(() => {
    if (index === 0) {
      return {
        transform: [{ translateX: withSpring(-width) }],
      };
    } else {
      return {
        transform: [{ translateX: withSpring(0) }],
      };
    }
  });
  return (
    <Box flex={1}>
      <Box flexDirection="row">
        {tabs.map((tab, i) => (
          <Pressable style={{ flex: 1 }} onPress={() => setIndex(i)} key={i}>
            <Box padding={"m"} style={{ paddingBottom: theme.spacing.m + 10 }}>
              <Text variant="tabs" textAlign="center">
                {tab.title}
              </Text>
            </Box>
          </Pressable>
        ))}
        <Animated.View
          style={[
            {
              position: "absolute",
              bottom: 0,
              left: -5,
              backgroundColor: theme.colors.cardPrimaryBackground,
              width: 10,
              height: 10,
              borderRadius: 5,
            },
            animatedStyles,
          ]}
        />
      </Box>
      <Animated.View
        style={[
          {
            flexDirection: "row",
            flex: 1,
          },
          animatedStylesContent,
        ]}
      >
        {Children.map(children, (child, index) => (
          <Box key={index} width={width}>
            {child}
          </Box>
        ))}
      </Animated.View>
    </Box>
  );
};

export default Tabs;
