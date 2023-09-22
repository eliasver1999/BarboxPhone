import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import CustomInput from "../components/CustomInput";
import React, { useState } from "react";
import CustomButton from "../components/CustomButton/CustomButton";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { login } from "../helpers/login";
import Snackbar, {
  SnackbarPosition,
  SnackbarType,
} from "../components/Snackbar/Snackbar";
import { SafeAreaView } from "react-navigation";
type Props = {};
type Nav = {
  navigate: (value: string) => void;
};

const SignInScreen = (props: Props) => {
  const { height } = useWindowDimensions();
  const { navigate } = useNavigation<Nav>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const { handleSubmit, control } = useForm();

  const onSignInPressed = () => {
    const data = { email: username, password: password };
    login(data)
      .then((t) => {
        navigate("Home");
      })
      .catch((error) => {
        setMessage(error);
        setVisible(true);
      });
  };
  const onRegisterPressed = () => {
    navigate("SignUp");
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.root}>
          <Image
            source={require("../images/logo.png")}
            style={[styles.logo, { height: height * 0.45,width: 300 }]}
            resizeMode="contain"
          />
         
          <CustomInput
            placeholder="Email"
            value={username}
            setValue={setUsername}
            secureTextEntry={false}
          />
          <CustomInput
            placeholder="Password"
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
          />
          <CustomButton
            onPress={onSignInPressed}
            text="Sign In"
            type="container_PRIMARY"
            text_type="text_PRIMARY"
            bgColor="#bd0900"
            fgColor=""
          />

          <CustomButton
            onPress={onForgotPasswordPressed}
            text="Forgot Password?"
            type="container_SECONDARY"
            text_type="text_SECONDARY"
            bgColor=""
            fgColor=""
          />
          <CustomButton
            onPress={onRegisterPressed}
            text="Don't have an account? Create one!"
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
    width: "100%",
  },
  root: {
    flex: 1,
    alignItems: "center",
    padding: 40,
    paddingTop: 20,
  },
});
export default SignInScreen;
