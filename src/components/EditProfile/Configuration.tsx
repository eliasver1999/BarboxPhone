import { View } from "react-native";
import React, { useState } from "react";
import { Box, Text } from "../../Theme/Theme";
import CheckBoxGroup from "./CheckBoxGroup";
import SliderInput from "../CustomInput/SliderInput";
import { ScrollView } from "react-native-gesture-handler";
import SaveButton from "../CustomButton/SaveButton";
import { body } from "../../redux/actions/body";
import { useSelector } from "react-redux";
import { addBody } from "../../helpers/getters/body";
import Snackbar, { SnackbarPosition, SnackbarType } from "../Snackbar/Snackbar";

type Props = {};

const genderType = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];
export interface Body {
  height: number;
  weight: number;
  waist: number;
  neck: number;
  arms: number;
  hips: number;
  chest: number;
}
export type BodyKeys = keyof Body;
const Configuration = (props: Props) => {
  const bodyData = useSelector((state: any) => state.body);
  const [body, setBody] = useState<body>(bodyData[0]);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<SnackbarType>(SnackbarType.WARNING);
  return (
    <View>
      <Snackbar
        message={message}
        position={SnackbarPosition.BOTTOM}
        visible={visible}
        setVisible={setVisible}
        color={type}
      />
      <ScrollView style={{ minHeight: "100%" }}>
        <Box padding={"m"}>
          <Text variant="label">Gender</Text>
          <CheckBoxGroup options={genderType} />
          <Text variant="label">Height</Text>
          <SliderInput
            minValue={0}
            maxValue={240}
            count="cm"
            setValue={setBody}
            field="height"
            data={body}
          />
          <Text variant="label">Weight</Text>
          <SliderInput
            minValue={0}
            maxValue={240}
            count="kg"
            step={0.5}
            setValue={setBody}
            field="weight"
            data={body}
          />
          <Text variant="label">Waist</Text>
          <SliderInput
            minValue={0}
            maxValue={240}
            count="cm"
            step={0.5}
            setValue={setBody}
            field="waist"
            data={body}
          />
          <Text variant="label">Neck</Text>
          <SliderInput
            minValue={0}
            maxValue={240}
            count="cm"
            step={0.5}
            setValue={setBody}
            field="neck"
            data={body}
          />
          <Text variant="label">Chest</Text>
          <SliderInput
            minValue={0}
            maxValue={240}
            count="cm"
            step={0.5}
            setValue={setBody}
            field="chest"
            data={body}
          />
          <Text variant="label">Hips</Text>
          <SliderInput
            minValue={0}
            maxValue={240}
            count="cm"
            step={0.5}
            setValue={setBody}
            field="hips"
            data={body}
          />
          <Text variant="label">Arms</Text>
          <SliderInput
            minValue={0}
            maxValue={240}
            count="cm"
            step={0.5}
            setValue={setBody}
            field="arms"
            data={body}
          />
          <Box justifyContent="center" alignItems="center" marginTop={"m"}>
            <SaveButton
              onComplete={() =>
                addBody(body)
                  .then((res) => {
                    setVisible(true);
                    setMessage(res);
                    setType(SnackbarType.SUCCESS);
                  })
                  .catch((error) => {
                    setVisible(true);
                    setMessage(error);
                    setType(SnackbarType.FAILURE);
                  })
              }
            />
          </Box>
        </Box>
      </ScrollView>
    </View>
  );
};

export default Configuration;
