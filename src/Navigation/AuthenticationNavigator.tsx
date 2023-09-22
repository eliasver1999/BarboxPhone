import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ForgotPassword from "../screens/ForgotPassword";

type Props = {};
export type Routes = {
  SignIn: undefined;
  SignUp: undefined;
  Forgot: undefined;
};
const AuthenticationStack = createStackNavigator<Routes>();
const AuthenticationNavigator = (props: Props) => {
  return (
    <AuthenticationStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthenticationStack.Screen name="SignIn" component={SignInScreen} />
      <AuthenticationStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthenticationStack.Screen name="Forgot" component={ForgotPassword} />
    </AuthenticationStack.Navigator>
  );
};

export default AuthenticationNavigator;
