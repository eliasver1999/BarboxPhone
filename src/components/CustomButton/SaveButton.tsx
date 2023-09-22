import { View, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type Props = {
  onComplete: () => Promise<void>;
};
type AnimatedGHContext = {
  completed: boolean;
};
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const BUTTON_WIDTH = 230;
const BUTTON_HEIGHT = 50;
const BUTTON_PADDING = 10;
const SWIPEABLE_DIMENSIONS = BUTTON_HEIGHT - 2 * BUTTON_PADDING;

const H_WAVE_RANGE = SWIPEABLE_DIMENSIONS + 2 * BUTTON_PADDING;
const H_SWIPE_RANGE = BUTTON_WIDTH - 2 * BUTTON_PADDING - SWIPEABLE_DIMENSIONS;
const SaveButton = ({ onComplete }: Props) => {
  const [toggled, setToggled] = useState(false);
  const x = useSharedValue(0);
  useEffect(() => {
    if (toggled) {
      onComplete();
    }
  }, [toggled]);

  const animatedGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    AnimatedGHContext
  >({
    onStart: (_, ctx) => {
      ctx.completed = toggled;
    },
    onActive: (e, ctx) => {
      let newValue;

      if (ctx.completed) {
        newValue = H_SWIPE_RANGE + e.translationX;
      } else {
        newValue = e.translationX;
      }
      if (newValue >= 0 && newValue <= H_SWIPE_RANGE) {
        x.value = newValue;
      }
    },
    onEnd: () => {
      if (x.value < BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS / 2) {
        x.value = withSpring(0);
        runOnJS(setToggled)(false);
      } else {
        x.value = withSpring(H_SWIPE_RANGE);
        runOnJS(setToggled)(true);
      }
    },
  });
  const InterpolateXInput = [0, H_SWIPE_RANGE];
  const AnimatedStyles = {
    swipeable: useAnimatedStyle(() => {
      return {
        transform: [{ translateX: x.value }],
        backgroundColor: interpolateColor(
          x.value,
          [0, BUTTON_WIDTH - SWIPEABLE_DIMENSIONS - BUTTON_PADDING],
          ["#d11406", "#fff"]
        ),
      };
    }),
    textSwipe: useAnimatedStyle(() => {
      return {
        opacity: interpolate(x.value, InterpolateXInput, [0.8, 0]),
        transform: [
          {
            translateX: interpolate(x.value, InterpolateXInput, [
              0,
              BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS / 2,
            ]),
          },
        ],
      };
    }),
    colorWave: useAnimatedStyle(() => {
      return {
        width: x.value + H_WAVE_RANGE,
        opacity: interpolate(x.value, InterpolateXInput, [0, 1]),
      };
    }),
  };
  return (
    <View style={styles.container}>
      <AnimatedLinearGradient
        colors={["#e8776f", "#d11406"]}
        start={{ x: 0.0, y: 0.5 }}
        end={{ x: 1.0, y: 0.5 }}
        style={[styles.colorWave, AnimatedStyles.colorWave]}
      ></AnimatedLinearGradient>
      <PanGestureHandler onGestureEvent={animatedGestureHandler}>
        <Animated.View
          style={[styles.swipeable, AnimatedStyles.swipeable]}
        ></Animated.View>
      </PanGestureHandler>
      <Animated.Text style={[styles.textSwipe, AnimatedStyles.textSwipe]}>
        Swipe to Save
      </Animated.Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: BUTTON_HEIGHT,
    width: BUTTON_WIDTH,
    paddingLeft: BUTTON_PADDING,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BUTTON_HEIGHT,
  },
  colorWave: {
    position: "absolute",
    left: 0,
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_HEIGHT,
    backgroundColor: "#000",
  },
  swipeable: {
    height: SWIPEABLE_DIMENSIONS,
    width: SWIPEABLE_DIMENSIONS,
    borderRadius: SWIPEABLE_DIMENSIONS,
    marginLeft: BUTTON_PADDING,
    backgroundColor: "#f0f4",
    position: "absolute",
    left: 0,
    zIndex: 3,
  },
  textSwipe: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    zIndex: 2,
  },
});
export default SaveButton;
