import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import React from "react";

type Props = {
  text: string;
  onPress(): void;
  type: string | void;
  text_type: string | void;
  bgColor: string | void;
  fgColor: string | void;
};

const CustomButton = (props: Props) => {
  return (
    <ScrollView keyboardShouldPersistTaps="always" style={{ width: "100%" }}>
      <Pressable
        onPress={props.onPress}
        style={[
          styles.container,
          styles[`${props.type as keyof typeof styles}`],
          props.bgColor ? { backgroundColor: props.bgColor } : "",
        ]}
      >
        <Text
          style={[
            styles.text,
            styles[`${props.text_type as keyof typeof styles}`],
            props.fgColor ? { color: props.fgColor } : "",
          ]}
        >
          {props.text}
        </Text>
      </Pressable>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 5,
    marginVertical: 5,
    alignItems: "center",
    textAlign: "center",
    borderRadius: 5,
  },
  container_PRIMARY: {
    backgroundColor: "#3b71f3",
    padding: 15,
  },
  container_THIRD: {
    borderColor: "#3b71f3",
    borderWidth: 2,
  },
  container_SECONDARY: {},
  text: {
    fontWeight: "bold",
  },
  text_PRIMARY: {
    color: "white",
  },
  text_SECONDARY: {
    color: "black",
    fontSize: 12
  },
  text_THIRD: {
    color: "#3b71f3",
  },
});
export default CustomButton;
