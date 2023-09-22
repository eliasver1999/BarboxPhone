import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

type Props = {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  secureTextEntry: boolean;
};

const CustomInput = (props: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={props.placeholder}
        style={styles.input}
        value={props.value}
        onChangeText={props.setValue}
        secureTextEntry={props.secureTextEntry}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    padding: 10,
  },
  input: {},
});
export default CustomInput;
