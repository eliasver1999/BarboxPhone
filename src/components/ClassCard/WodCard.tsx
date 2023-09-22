import {
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import theme, { Box, Text } from "../../Theme/Theme";
import RenderHtml from "react-native-render-html";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";
import { useSelector } from "react-redux";
type WodCardProps = {
  title: string;
  content: string;
  shuffleBack: Animated.SharedValue<Boolean>;
  shuffleDate: Boolean;
  shuffleBackDate: Boolean;
  index: number;
  date: string;
};
const { width } = Dimensions.get("window");
const tagsStyles = {
  body: {
    whiteSpace: "normal",
    color: "gray",
    textAlign: "center",
    height: 500,
  },
  a: {
    color: "green",
  },
  span: {
    color: "white",
  },
  p: {
    color: "white",
    lineHeight: 20,
    margin: 0,
  },
};
const SNAP_POINTS = [-width, 0, width];
const WodCard = ({
  title,
  content,
  shuffleBack,
  index,
  date,
  shuffleDate,
  shuffleBackDate,
}: WodCardProps) => {
  const source = {
    html: content,
  };
  const wods = useSelector((state: any) => state.wod);
  const [open, setOpen] = useState(index === wods.length - 1 ? true : false);

  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const scale = useSharedValue(1);
  useAnimatedReaction(
    () => {
      shuffleBack.value;
    },
    () => {
      if (shuffleBackDate) {
        const delay = 0.5 * index;
        x.value = withDelay(
          delay,
          withSpring(0, {}, () => {})
        );
      }
      if (shuffleDate) {
        const delay = 50 * index;
        x.value = withDelay(
          delay,
          withSpring(width, {}, () => {})
        );
      }
      if (shuffleBack.value) {
        const delay = 20 * index;
        runOnJS(setOpen)(false);
        if (index == wods.length - 1) {
          runOnJS(setOpen)(true);
        }
        x.value = withDelay(
          delay,
          withSpring(0, {}, () => {
            shuffleBack.value = false;
          })
        );
      }
    }
  );

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
    onStart: (_, ctx) => {
      ctx.x = x.value;

      scale.value = withTiming(1.01, { easing: Easing.inOut(Easing.ease) });
    },
    onActive: ({ translationX, translationY }, ctx) => {
      x.value = ctx.x + translationX;
    },
    onEnd: ({ velocityX, velocityY }) => {
      const dest = snapPoint(x.value, velocityX, SNAP_POINTS);
      x.value = withSpring(dest, { velocity: velocityX });
      scale.value = withTiming(1, { easing: Easing.inOut(Easing.ease) }, () => {
        if (dest !== 0) {
          runOnJS(setOpen)(false);
        }
        if (index === 0 && dest !== 0) {
          shuffleBack.value = true;
        }
      });
    },
  });

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value },
      { translateY: y.value },
      { scale: scale.value },
    ],
  }));

  return (
    <View style={styles.container} pointerEvents="box-none">
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        activeOffsetX={[-10, 10]}
      >
        <Animated.View style={style}>
          <Box
            backgroundColor={"cardPrimaryBackground"}
            justifyContent="center"
            alignItems="center"
            marginHorizontal={"l"}
            paddingBottom={"xl"}
            borderRadius={30}
          >
            <ScrollView
              indicatorStyle={"white"}
              style={{ marginTop: theme.spacing.l }}
            >
              <Box
                backgroundColor={"cardPrimaryBackground"}
                alignItems="center"
                marginHorizontal={"l"}
              >
                <Text variant={"body"} color={"white"}>
                  {date}
                </Text>
                {open ? (
                  <RenderHtml
                    contentWidth={width}
                    source={source}
                    tagsStyles={tagsStyles}
                  />
                ) : (
                  <Pressable onPress={() => setOpen(true)}>
                    <Text variant={"card"} color={"white"}>
                      Press to open
                    </Text>
                  </Pressable>
                )}
              </Box>
            </ScrollView>
          </Box>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    paddingBottom: theme.spacing.l,
  },
});
export default WodCard;
