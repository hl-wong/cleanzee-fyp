import { Platform, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { AuthLayout } from "../../layouts";
import { theme } from "../../assets/styles";
import { getFontSize, goBack, navigateTo } from "../../utils";
import { Button, Column, Input, Row } from "../../components";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { sendOTP } from "../../services";
import Dialog from "react-native-dialog";
import { Formik, FormikProps } from "formik";
import { registerSchema } from "../../validations";

interface RegisterScreenProps {
  navigation: any;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const firstNameRef = useRef<TextInput>(null);
  const lastNameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const formikRef = useRef<FormikProps<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }> | null>(null);
  const handleSubmit = () => {
    if (formikRef.current) {
      formikRef.current.submitForm();
    }
  };

  const [isFormValid, setIsFormValid] = useState(false);

  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState<{
    title: string;
    description: string;
  } | null>(null);

  return (
    <>
      <AuthLayout
        headerTitle="Register"
        onBack={() => goBack(navigation)}
        footer={
          <Button
            variant="primary"
            size={Platform.OS === "ios" ? "lg" : "md"}
            label="Register"
            onPress={handleSubmit}
            disabled={!isFormValid}
          />
        }
      >
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={async (values) => {
            console.log(values);

            const userData = {
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              password: values.password,
            };

            try {
              const response = await sendOTP(values.email);
              if (response.status === 200) {
                navigateTo(
                  navigation,
                  "Auth Stack",
                  "OTP Verification Screen",
                  {
                    userData,
                    email: values.email,
                  }
                );
              }
            } catch (e: any) {
              console.log(e.message);
              setErrors({
                title: "Register Failed",
                description: e.message,
              });
              setVisible(true);
            }
          }}
          innerRef={formikRef}
          validationSchema={registerSchema}
        >
          {({
            handleChange,
            values,
            errors,
            touched,
            handleBlur,
            setFieldTouched,
            isValid,
            dirty,
          }) => {
            const isPasswordValid =
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
                values.password
              );

            useEffect(() => {
              setIsFormValid(isValid && dirty);
            }, [isValid, dirty]);

            return (
              <Column gap={16}>
                <Row gap={16}>
                  <Input
                    variant="text"
                    label="First Name"
                    placeholder="First Name"
                    ref={firstNameRef}
                    returnKeyType="next"
                    value={values.firstName}
                    onChangeText={handleChange("firstName")}
                    onSubmitEditing={() => lastNameRef.current?.focus()}
                    onBlur={handleBlur("firstName")}
                    style={{ flex: 1 }}
                    errors={
                      errors.firstName && touched.firstName
                        ? errors.firstName
                        : ""
                    }
                  />

                  <Input
                    variant="text"
                    label="Last Name"
                    placeholder="Last Name"
                    ref={lastNameRef}
                    returnKeyType="next"
                    value={values.lastName}
                    onChangeText={handleChange("lastName")}
                    onSubmitEditing={() => emailRef.current?.focus()}
                    onBlur={handleBlur("lastName")}
                    style={{ flex: 1 }}
                    errors={
                      errors.lastName && touched.lastName ? errors.lastName : ""
                    }
                  />
                </Row>

                <Input
                  variant="text"
                  label="Email"
                  placeholder="Enter your email address"
                  ref={emailRef}
                  returnKeyType="next"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  onBlur={handleBlur("email")}
                  errors={errors.email && touched.email ? errors.email : ""}
                />

                <Column gap={16}>
                  <Input
                    variant="password"
                    label="Password"
                    placeholder="Enter your password"
                    ref={passwordRef}
                    returnKeyType="next"
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                    onBlur={() => setFieldTouched("password")}
                  />

                  <Row gap={8}>
                    <MaterialIcons
                      name={
                        values.password.length === 0
                          ? "info"
                          : isPasswordValid
                          ? "check-circle"
                          : "cancel"
                      }
                      size={18}
                      color={
                        values.password.length === 0
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
                      At least 8 characters with uppercase, lowercase, number,
                      and symbol
                    </Text>
                  </Row>
                </Column>

                <Input
                  variant="password"
                  label="Confirm Password"
                  placeholder="Re-enter your password"
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

export default RegisterScreen;

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
});
