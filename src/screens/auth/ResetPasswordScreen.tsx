import { Platform, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useRef, useState } from "react";
import { AuthLayout } from "../../layouts";
import { getFontSize, goBack, navigateTo } from "../../utils";
import { Formik } from "formik";
import { Button, Column, Input, Row } from "../../components";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { theme } from "../../assets/styles";
import Dialog from "react-native-dialog";
import { resetPassword } from "../../services";
import { resetPasswordSchema } from "../../validations";

interface ResetPasswordScreenProps {
  navigation: any;
  route: any;
}

const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({
  navigation,
  route,
}) => {
  const newPasswordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState<{
    title: string;
    description: string;
  } | null>(null);

  const { email } = route.params;

  return (
    <>
      <AuthLayout
        headerTitle="Reset Password"
        headerDesc="Your new password must be different from previously used password"
        onBack={() => goBack(navigation)}
      >
        <Formik
          initialValues={{ newPassword: "", confirmPassword: "" }}
          onSubmit={async (values) => {
            console.log(values);

            try {
              const response = await resetPassword(email, values.newPassword);
              if (response.status === 200) {
                navigateTo(navigation, "Auth Stack", "Success Screen", {
                  title: "Reset Successful",
                  desc: "You have successfully reset your password for your account. You can now log in with your new password.",
                });
              }
            } catch (e: any) {
              console.log(e.message);
              setErrors({
                title: "Reset Password Failed",
                description: e.message,
              });
              setVisible(true);
            }
          }}
          validationSchema={resetPasswordSchema}
        >
          {({ handleChange, values, errors, touched, handleSubmit }) => {
            const isPasswordValid =
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
                values.newPassword
              );

            return (
              <Column gap={32}>
                <Column gap={16}>
                  <Column gap={16}>
                    <Input
                      variant="password"
                      label="New Password"
                      placeholder="Enter your new password"
                      value={values.newPassword}
                      onChangeText={handleChange("newPassword")}
                      ref={newPasswordRef}
                      onSubmitEditing={() =>
                        confirmPasswordRef.current?.focus()
                      }
                      returnKeyType="next"
                    />

                    <Row gap={8}>
                      <MaterialIcons
                        name={
                          values.newPassword.length === 0
                            ? "info"
                            : isPasswordValid
                            ? "check-circle"
                            : "cancel"
                        }
                        size={18}
                        color={
                          values.newPassword.length === 0
                            ? theme.color.info
                            : isPasswordValid
                            ? theme.color.success
                            : theme.color.error
                        }
                      />
                      <Text
                        style={{ flexShrink: 1, fontSize: getFontSize(12) }}
                      >
                        At least 8 characters with uppercase, lowercase, number,
                        and symbol
                      </Text>
                    </Row>
                  </Column>

                  <Input
                    variant="password"
                    label="Confirm Password"
                    placeholder="Re-enter your new password"
                    value={values.confirmPassword}
                    onChangeText={handleChange("confirmPassword")}
                    ref={confirmPasswordRef}
                    errors={
                      errors.confirmPassword && touched.confirmPassword
                        ? errors.confirmPassword
                        : ""
                    }
                  />
                </Column>

                <Button
                  variant="primary"
                  size={Platform.OS === "ios" ? "lg" : "md"}
                  label="Reset"
                  onPress={handleSubmit}
                />
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

export default ResetPasswordScreen;

const styles = StyleSheet.create({});
