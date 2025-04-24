import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { AuthLayout } from "../../layouts";
import { goBack, navigateTo } from "../../utils";
import { Button, Column, Input } from "../../components";
import { Formik } from "formik";
import { forgotPassword } from "../../services";
import Dialog from "react-native-dialog";
import { forgotPasswordSchema } from "../../validations";

interface ForgotPasswordScreenProps {
  navigation: any;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  navigation,
}) => {
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState<{
    title: string;
    description: string;
  } | null>(null);

  return (
    <>
      <AuthLayout
        headerTitle="Forgot Password"
        headerDesc="Enter your email and we'll send you the OTP to reset your password"
        onBack={() => goBack(navigation)}
      >
        <Column gap={32}>
          <Formik
            initialValues={{ email: "" }}
            onSubmit={async (values) => {
              console.log(values);

              try {
                const response = await forgotPassword(values.email);
                if (response.status === 200) {
                  navigateTo(
                    navigation,
                    "Auth Stack",
                    "OTP Verification Screen",
                    {
                      email: values.email,
                    }
                  );
                }
              } catch (e: any) {
                console.log(e.message);
                setErrors({
                  title: "Invalid Email",
                  description: e.message,
                });
                setVisible(true);
              }
            }}
            validationSchema={forgotPasswordSchema}
          >
            {({ handleChange, values, errors, touched, handleSubmit }) => {
              return (
                <Column gap={32}>
                  <Input
                    variant="text"
                    label="Email"
                    placeholder="Enter your email"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    errors={errors.email && touched.email ? errors.email : ""}
                  />

                  <Button
                    variant="primary"
                    size={Platform.OS === "ios" ? "lg" : "md"}
                    label="Continue"
                    onPress={handleSubmit}
                  />
                </Column>
              );
            }}
          </Formik>
        </Column>
      </AuthLayout>

      <Dialog.Container visible={visible}>
        <Dialog.Title>{errors?.title}</Dialog.Title>
        <Dialog.Description>{errors?.description}</Dialog.Description>
        <Dialog.Button label="OK" onPress={() => setVisible(false)} />
      </Dialog.Container>
    </>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({});
