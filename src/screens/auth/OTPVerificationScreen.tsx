import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { AuthLayout } from "../../layouts";
import { getFontSize, goBack, navigateTo } from "../../utils";
import { Formik } from "formik";
import { Button, Column, OTPInput, Row } from "../../components";
import { glob } from "../../assets/styles";
import { registerUser, resendOTP, verifyOTP } from "../../services";
import Dialog from "react-native-dialog";
import { otpValidationSchema } from "../../validations";

interface OTPVerificationScreenProps {
  navigation: any;
  route: any;
}

const OTPVerificationScreen: React.FC<OTPVerificationScreenProps> = ({
  navigation,
  route,
}) => {
  const { userData, email } = route.params;

  const [timer, setTimer] = useState<number>(0);
  useEffect(() => {
    if (timer <= 0) return;

    const interval: NodeJS.Timeout = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);
  const handleResend = async () => {
    await resendOTP(email);
    setTimer(60);
  };

  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState<{
    title: string;
    description: string;
  } | null>(null);

  return (
    <>
      <AuthLayout
        headerTitle="OTP Verification"
        headerDesc={`Please enter the 6 digit code sent to ${email}`}
        onBack={() => goBack(navigation)}
      >
        <Formik
          initialValues={{ otp: "" }}
          onSubmit={async (values) => {
            console.log(values);

            const route = navigation.getState();
            const prevScreen = route.routes[route.index - 1].name;

            try {
              const verifyRes = await verifyOTP(email, values.otp);
              if (verifyRes.status === 200) {
                if (prevScreen === "Register Screen") {
                  const registerRes = await registerUser(userData);
                  if (registerRes.status === 200) {
                    navigateTo(navigation, "Auth Stack", "Success Screen", {
                      title: "Registration Successful",
                      desc: "Your account has been successfully created and verified",
                    });
                  }
                }

                if (prevScreen === "Forgot Password Screen") {
                  navigateTo(
                    navigation,
                    "Auth Stack",
                    "Reset Password Screen",
                    {
                      email: email,
                    }
                  );
                }
              }
            } catch (e: any) {
              console.log(e.message);
              setErrors({
                title: "Invalid OTP",
                description: e.message,
              });
              setVisible(true);
            }
          }}
          validationSchema={otpValidationSchema}
        >
          {({ handleChange, values, errors, touched, handleSubmit }) => {
            return (
              <Column gap={32}>
                <OTPInput
                  length={6}
                  label="OTP"
                  value={values.otp}
                  onChangeText={handleChange("otp")}
                  errors={errors.otp && touched.otp ? errors.otp : ""}
                />

                <Column gap={16}>
                  <Button
                    variant="primary"
                    size={Platform.OS === "ios" ? "lg" : "md"}
                    label="Verify"
                    onPress={handleSubmit}
                  />

                  <Row style={glob.center}>
                    <Text
                      style={{
                        fontSize:
                          Platform.OS === "ios"
                            ? getFontSize(14)
                            : getFontSize(16),
                      }}
                    >
                      Didn't receive code?{" "}
                    </Text>
                    <Button
                      variant="link"
                      label={
                        timer > 0 ? `Resend Code (${timer}s)` : "Resend Code"
                      }
                      onPress={handleResend}
                      disabled={timer > 0}
                    />
                  </Row>
                </Column>
              </Column>
            );
          }}
        </Formik>
      </AuthLayout>

      <Dialog.Container visible={visible}>
        <Dialog.Title>{errors?.title}</Dialog.Title>
        <Dialog.Description>{errors?.description}</Dialog.Description>
        <Dialog.Button label="OK" onPress={() => setVisible(false)} />
      </Dialog.Container>
    </>
  );
};

export default OTPVerificationScreen;

const styles = StyleSheet.create({});
