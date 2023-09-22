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
import { useNavigation } from "@react-navigation/native";
import { login, register } from "../helpers/login";
import { SafeAreaView } from "react-native-safe-area-context";
import Snackbar, {
  SnackbarPosition,
  SnackbarType,
} from "../components/Snackbar/Snackbar";
type Props = {};
type Nav = {
  navigate: (value: string) => void;
};
const SignUpScreen = (props: Props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const { navigate } = useNavigation<Nav>();
  const onSignInPressed = () => {
    const data = {
      name: username,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    };
    const loginData = {
      email: email,
      password: password,
    };
    register(data)
      .then((t) =>
        login(loginData)
          .then((t) => navigate("Home"))
          .catch((error) => {
            console.log(error);
          })
      )
      .catch((error) => {
        setMessage(error);
        setVisible(true);
      });
  };
  const onForgotPasswordPressed = () => {
    console.warn("Forgot Password");
  };
  return (
    <SafeAreaView>
      <Snackbar
        message={message}
        position={SnackbarPosition.BOTTOM}
        visible={visible}
        setVisible={setVisible}
        color={SnackbarType.FAILURE}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Text style={styles.title}>Create an account</Text>
          <CustomInput
            placeholder="Username"
            value={username}
            setValue={setUsername}
            secureTextEntry={false}
          />
          <CustomInput
            placeholder="Email"
            value={email}
            setValue={setEmail}
            secureTextEntry={false}
          />
          <CustomInput
            placeholder="Password"
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
          />
          <CustomInput
            placeholder="Confirm Password"
            value={passwordConfirmation}
            setValue={setPasswordConfirmation}
            secureTextEntry={true}
          />
          <CustomButton
            onPress={onSignInPressed}
            text="Register"
            type="container_PRIMARY"
            text_type="text_PRIMARY"
            bgColor=""
            fgColor=""
          />
          <Text style={styles.text}>
            By registering,you confirm that you accept our{" "}
            <Text style={styles.link}>Terms of Use</Text> and{" "}
            <Text style={styles.link}>Privacy Policy</Text>
          </Text>
          {/* <SocialSignInButton /> */}
          <CustomButton
            onPress={() => navigate("SignIn")}
            text="Have an account? Sign in"
            type="container_SECONDARY"
            text_type="text_SECONDARY"
            bgColor=""
            fgColor=""
          />
        </View>
      </ScrollView>
    </SafeAreaView>
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
export default SignUpScreen;
