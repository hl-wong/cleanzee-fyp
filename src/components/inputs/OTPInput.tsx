import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import React, { useRef } from "react";
import Row from "../Row";
import { glob, theme } from "../../assets/styles";
import { getFontSize } from "../../utils";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Column from "../Column";
import { FormErrorMessage } from "../errors";

interface OTPInputProps {
  length: number;
  style?: StyleProp<ViewStyle>;
  label?: string;
  onChangeText: (otp: string) => void;
  value?: string;
  errors?: string;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length,
  style,
  label,
  onChangeText,
  value,
  errors,
}) => {
  const otpRefs = useRef<TextInput[]>([]);
  const otpArray = new Array(length).fill("").map((_, i) => value?.[i] || "");

  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text) || text === "") {
      const newOtp = [...otpArray];
      newOtp[index] = text;
      const otpString = newOtp.join("");

      onChangeText(otpString);

      if (text && index < length - 1) {
        otpRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (
      event.nativeEvent.key === "Backspace" &&
      !otpArray[index] &&
      index > 0
    ) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={style}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Column
        gap={Platform.OS === "ios" ? 12 : 8}
        style={[label && { marginTop: 16 }]}
      >
        <Row style={[glob.center, glob.spaceBetween]}>
          {otpArray.map((digit, index) => (
            <View key={index} style={styles.container}>
              <TextInput
                key={index}
                ref={(el) => (otpRefs.current[index] = el!)}
                style={styles.input}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(event) => handleKeyPress(event, index)}
                returnKeyType={index === length - 1 ? "done" : "next"}
                autoFocus={index === 0}
              />
            </View>
          ))}
        </Row>
        {errors && <FormErrorMessage errors={errors} />}
      </Column>
    </View>
  );
};

export default OTPInput;

const styles = StyleSheet.create({
  label: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 600,
  },
  container: {
    borderWidth: 1,
    borderColor: "#A6A6A6",
    borderRadius: 4,
    backgroundColor: theme.color.white,
    height: wp("13%"),
    width: wp("13%"),
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: Platform.OS === "ios" ? 16 : 14,
  },
});
