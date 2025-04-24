import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import { Layout } from "../../../layouts";
import { getFontSize, goBack } from "../../../utils";
import { Button, Column, Content, Input, Row } from "../../../components";
import { UserContext } from "../../../context";
import Dialog from "react-native-dialog";
import { glob, theme } from "../../../assets/styles";
import { Formik } from "formik";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { changePasswordSchema } from "../../../validations";
import { changePassword } from "../../../services";
import { resetTo } from "../../../utils/navigationHelper";

interface ChangePasswordScreenProps {
  navigation: any;
}

const ChangePasswordScreen: React.FC<ChangePasswordScreenProps> = ({
  navigation,
}) => {
  const { user, refreshUserData } = useContext(UserContext);

  const currentPasswordRef = useRef<TextInput>(null);
  const newPasswordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState<{
    title: string;
    description: string;
  } | null>(null);

  return (
    <>
      <Layout headerTitle="Change Password" onBack={() => goBack(navigation)}>
        <Content bgColor="white">
          <KeyboardAvoidingView behavior="padding" style={glob.container}>
            <ScrollView contentContainerStyle={{ padding: 16 }}>
              <Formik
                initialValues={{
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                }}
                onSubmit={async (values) => {
                  console.log(values);

                  const route = navigation.getState();
                  const prevScreen = route.routes[route.index - 1].name;

                  try {
                    const response = await changePassword(
                      user._id,
                      values.currentPassword,
                      values.newPassword
                    );

                    if (response.status === 200) {
                      await refreshUserData();

                      if (prevScreen === "Profile Screen") {
                        resetTo(navigation, "Profile Screen");
                      }

                      if (prevScreen === "Cleaner Profile Screen") {
                        resetTo(navigation, "Cleaner Profile Screen");
                      }
                    }
                  } catch (e: any) {
                    console.log(e.message);
                    setErrors({
                      title: "Change Password Failed",
                      description: e.message,
                    });
                    setVisible(true);
                  }
                }}
                validationSchema={changePasswordSchema}
              >
                {({ handleChange, values, errors, touched, handleSubmit }) => {
                  const isPasswordValid =
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
                      values.newPassword
                    );

                  return (
                    <Column gap={32}>
                      <Column gap={16}>
                        <Input
                          variant="password"
                          label="Current Password"
                          placeholder="Enter your current password"
                          ref={currentPasswordRef}
                          returnKeyType="next"
                          value={values.currentPassword}
                          onChangeText={handleChange("currentPassword")}
                          onSubmitEditing={() =>
                            newPasswordRef.current?.focus()
                          }
                          errors={
                            errors.currentPassword && touched.currentPassword
                              ? errors.currentPassword
                              : ""
                          }
                        />

                        <Column gap={16}>
                          <Input
                            variant="password"
                            label="New Password"
                            placeholder="Enter your new password"
                            ref={newPasswordRef}
                            returnKeyType="next"
                            value={values.newPassword}
                            onChangeText={handleChange("newPassword")}
                            onSubmitEditing={() =>
                              newPasswordRef.current?.focus()
                            }
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
                              style={{
                                flexShrink: 1,
                                fontSize: getFontSize(12),
                              }}
                            >
                              At least 8 characters with uppercase, lowercase,
                              number, and symbol
                            </Text>
                          </Row>
                        </Column>

                        <Input
                          variant="password"
                          label="Confirm Password"
                          placeholder="Re-enter your new password"
                          ref={confirmPasswordRef}
                          value={values.confirmPassword}
                          onChangeText={handleChange("confirmPassword")}
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
                        label="Change"
                        onPress={handleSubmit}
                      />
                    </Column>
                  );
                }}
              </Formik>
            </ScrollView>
          </KeyboardAvoidingView>
        </Content>
      </Layout>

      <Dialog.Container visible={visible}>
        <Dialog.Title>{errors?.title}</Dialog.Title>
        <Dialog.Description>{errors?.description}</Dialog.Description>
        <Dialog.Button label="OK" onPress={() => setVisible(false)} />
      </Dialog.Container>
    </>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({});
