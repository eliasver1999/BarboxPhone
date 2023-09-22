import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";

import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import theme, { Box, Text } from "../../Theme/Theme";
import { snapPoint } from "react-native-redash";
import { LinearGradient } from "expo-linear-gradient";
import RoundedIcon from "../RoundedIcon/RoundedIcon";
type SwipeableProps = {
  children: React.ReactNode;
  onDelete: () => void;
};

const { width } = Dimensions.get("window");
const finalDestination = width;
const snapPoints = [-125 * 1, 0, 85];

const SwipeableRow = ({ children, onDelete }: SwipeableProps) => {
  const translateX = useSharedValue(0);
  const heightStart = useSharedValue(80);
  const [pressed, setPressed] = useState(false);
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
    },
    onActive: ({ translationX }, ctx) => {
      translateX.value = ctx.x + translationX;
    },
    onEnd: ({ velocityX }) => {
      const dest = snapPoint(translateX.value, velocityX, snapPoints);
      translateX.value = withSpring(dest, { overshootClamping: true }, () => {
        if (dest === -125 && pressed) {
          heightStart.value = withTiming(0, { duration: 250 });
        }
      });
    },
  });
  useEffect(() => {
    if (pressed) {
      heightStart.value = withTiming(0, { duration: 250 });
    }
  }, [pressed]);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    height: heightStart.value,
    backgroundColor: theme.colors.white,
  }));
  const deleteStyle = useAnimatedStyle(() => ({
    opacity: translateX.value < 0 ? 1 : 0,
    height: heightStart.value,
  }));
  const editStyle = useAnimatedStyle(() => ({
    opacity: translateX.value > 0 ? 1 : 0,
  }));

  return (
    <View>
      <Animated.View style={[StyleSheet.absoluteFill, deleteStyle]}>
        <ImageBackground
          source={require("../../images/bg.jpg")}
          resizeMode="cover"
          style={{ flex: 1, zIndex: -1 }}
        >
          <Box
            justifyContent="center"
            alignItems={"flex-end"}
            flex={1}
            paddingHorizontal={"l"}
            zIndex={0}
          >
            <TouchableOpacity
              onPress={() => {
                onDelete();
                setPressed(true);
              }}
            >
              <Text variant={"header"}>Delete Book</Text>
            </TouchableOpacity>
          </Box>
        </ImageBackground>
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFill, editStyle]}>
        <LinearGradient
          style={StyleSheet.absoluteFill}
          colors={["#bfeaf5", "#fff"]}
          start={[0.8, 0.5]}
          end={[1, 0.5]}
        />
        <Box
          justifyContent="center"
          alignItems={"flex-start"}
          flex={1}
          paddingHorizontal={"l"}
        >
          <RoundedIcon
            name="plus"
            size={24}
            color={"white"}
            backgroundColor={"pink"}
          />
        </Box>
      </Animated.View>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        activeOffsetX={[-10, 10]}
      >
        <Animated.View style={style}>{children}</Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default SwipeableRow;
