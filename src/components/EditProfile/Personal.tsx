import { View } from "react-native";
import React, { useState } from "react";
import { Box, Text } from "../../Theme/Theme";
import CheckBoxGroup from "./CheckBoxGroup";
import SliderInput from "../CustomInput/SliderInput";
import { ScrollView } from "react-native-gesture-handler";
import SaveButton from "../CustomButton/SaveButton";
import CustomInput from "../CustomInput";
type Props = {};

const Personal = (props: Props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conf, setConf] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confNew, setConfNew] = useState("");
  return (
    <ScrollView style={{ minHeight: "100%" }}>
      <Box padding={"m"}>
        <Text variant="label">Account Information</Text>
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
          value={conf}
          setValue={setConf}
          secureTextEntry={true}
        />
        <Box justifyContent="center" alignItems="center" marginVertical={"m"}>
          <SaveButton />
        </Box>
        <Text variant="label">Change Password</Text>
        <CustomInput
          placeholder="New Password"
          value={newPassword}
          setValue={setNewPassword}
          secureTextEntry={true}
        />
        <CustomInput
          placeholder="Confirm New Password"
          value={confNew}
          setValue={setConfNew}
          secureTextEntry={true}
        />
        <CustomInput
          placeholder="Old Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />
        <Box justifyContent="center" alignItems="center" marginTop={"m"}>
          <SaveButton />
        </Box>
      </Box>
    </ScrollView>
  );
};

export default Personal;
