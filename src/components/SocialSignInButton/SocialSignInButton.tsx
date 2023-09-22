import { View, Text } from "react-native";
import React from "react";
import CustomButton from "../CustomButton/CustomButton";

type Props = {};

const SocialSignInButton = (props: Props) => {
  const onSignInPressed = () => {
    console.warn("Sign In pressed");
  };
  return (
    <>
      <CustomButton
        onPress={onSignInPressed}
        text="Sign In with Facebook"
        type="container_PRIMARY"
        text_type="text_PRIMARY"
        bgColor="#E7EAF4"
        fgColor="#4765a9"
      />
      <CustomButton
        onPress={onSignInPressed}
        text="Sign In with Google"
        type="container_PRIMARY"
        text_type="text_PRIMARY"
        bgColor="#FAE9EA"
        fgColor="#dd4d44"
      />
    </>
  );
};

export default SocialSignInButton;
