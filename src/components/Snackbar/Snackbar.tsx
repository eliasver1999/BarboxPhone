import { View, Text, StyleSheet, Animated } from "react-native";
import React, { useRef, useEffect } from "react";
import Button from "../CustomButton/Button";

type SnackbarProps = {
  message: string;
  position: SnackbarPosition;
  color: SnackbarType;
  visible: boolean;
  setVisible: (value: boolean) => void;
};
export enum SnackbarPosition {
  TOP = "top",
  BOTTOM = "bottom",
}
export enum SnackbarType {
  WARNING = "#d1820a",
  FAILURE = "#e30e07",
  SUCCESS = "#07e345",
}
const Snackbar = ({
  message,
  position,
  visible,
  color,
  setVisible,
}: SnackbarProps) => {
  const animatedValue = useRef(new Animated.Value(0));
  const showSnackbar = () => {
    Animated.timing(animatedValue.current, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
  };

  const hideSnackbar = () => {
    Animated.timing(animatedValue.current, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };
  useEffect(() => {
    if (visible) {
      showSnackbar();
      setTimeout(function () {
        setVisible(false);
      }, 3500);
    } else {
      hideSnackbar();
    }
  }, [visible]);

  return (
    <Animated.View
      style={[
        styles.snackbar,
        {
          [position]: animatedValue.current.interpolate({
            inputRange: [0, 1],
            outputRange: [-300, 0],
          }),
        },
      ]}
    >
      <View style={[styles.content, { backgroundColor: color }]}>
        <Text style={styles.text}>{message}</Text>
      </View>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  snackbar: {
    height: 50,
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    position: "absolute",
    width: "100%",
    zIndex: 20,
  },
  content: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    paddingVertical: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 10,
    paddingHorizontal: 16,
  },
  text: {
    color: "white",
  },
});
export default Snackbar;
