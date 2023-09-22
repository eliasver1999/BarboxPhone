import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import CustomInput from "../components/CustomInput";
import React, { useState } from "react";
import CustomButton from "../components/CustomButton/CustomButton";
import SocialSignInButton from "../components/SocialSignInButton/SocialSignInButton";
type Props = {};

const ForgotPassword = (props: Props) => {
  const { height } = useWindowDimensions();
  const [email, setEmail] = useState("");

  const onSignInPressed = () => {
    console.warn("Sign In pressed");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Forgot Password?</Text>

        <CustomInput
          placeholder="Enter your Email"
          value={email}
          setValue={setEmail}
          secureTextEntry={false}
        />

        <CustomButton
          onPress={onSignInPressed}
          text="Send Code"
          type="container_PRIMARY"
          text_type="text_PRIMARY"
          bgColor=""
          fgColor=""
        />
        <CustomButton
          onPress={onSignInPressed}
          text="Resend Code"
          type="container_THIRD"
          text_type="text_THIRD"
          bgColor=""
          fgColor=""
        />
        <CustomButton
          onPress={onSignInPressed}
          text="Back to Sign in"
          type="container_SECONDARY"
          text_type="text_SECONDARY"
          bgColor=""
          fgColor=""
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: "60%",
    maxHeight: 300,
    maxWidth: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051c60",
    margin: 10,
  },
  root: {
    alignItems: "center",
    padding: 40,
  },
  text: {
    color: "gray",
    marginVertical: 10,
  },
  link: {
    color: "#FBB075",
  },
});
export default ForgotPassword;
