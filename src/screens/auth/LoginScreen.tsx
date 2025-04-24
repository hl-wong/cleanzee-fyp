import { Platform, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useRef, useState } from "react";
import { glob, theme } from "../../assets/styles";
import { getFontSize, goBack, navigateTo } from "../../utils";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { Formik } from "formik";
import { resetTo } from "../../utils/navigationHelper";
import Dialog from "react-native-dialog";
import { UserContext } from "../../context";
import { AuthLayout } from "../../layouts";
import { login } from "../../services";
import { Button, Column, Input, Row } from "../../components";

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const roles = ["User", "Cleaner", "Admin"];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState<{
    title: string;
    description: string;
  } | null>(null);

  const { setUser } = useContext(UserContext);

  return (
    <>
      <AuthLayout
        headerTitle="Cleanzee"
        headerDesc="Simplify your cleaning needs with trusted professionals at your fingertips"
        onBack={() => goBack(navigation)}
      >
        <Column gap={32}>
          <Text style={styles.title}>Login</Text>
          <Column gap={24}>
            <SegmentedControl
              values={roles}
              onChange={(event) => {
                const index = event.nativeEvent.selectedSegmentIndex;
                setSelectedIndex(index);
              }}
              selectedIndex={selectedIndex}
              tintColor={theme.color.primary}
              activeFontStyle={{
                color: theme.color.white,
                fontSize: getFontSize(16),
              }}
              fontStyle={{
                fontSize: getFontSize(16),
                color: theme.color.black,
              }}
              style={styles.segmentedControl}
            />

            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={async (values) => {
                console.log(values);

                const role = roles[selectedIndex];

                try {
                  const response = await login(
                    values.email,
                    values.password,
                    role
                  );

                  if (response.status === 200) {
                    setUser(response.data.user);

                    if (role === "User") {
                      resetTo(navigation, "User Tab");
                    }

                    if (role === "Cleaner") {
                      resetTo(navigation, "Cleaner Tab");
                    }

                    if (role === "Admin") {
                      resetTo(navigation, "Admin Stack");
                    }
                  }
                } catch (e: any) {
                  console.log(e);
                  setErrors({
                    title: "Login Failed",
                    description: e.message,
                  });
                  setVisible(true);
                }
              }}
            >
              {({ handleChange, values, handleSubmit }) => {
                return (
                  <Column gap={32}>
                    <Column gap={16}>
                      <Input
                        variant="text"
                        label="Email"
                        placeholder="Enter your email address"
                        ref={emailRef}
                        returnKeyType="next"
                        onSubmitEditing={() => passwordRef.current?.focus()}
                        value={values.email}
                        onChangeText={handleChange("email")}
                      />

                      <Column gap={Platform.OS === "ios" ? 12 : 8}>
                        <Input
                          variant="password"
                          label="Password"
                          placeholder="Enter your password"
                          ref={passwordRef}
                          value={values.password}
                          onChangeText={handleChange("password")}
                        />

                        <Button
                          variant="link"
                          label="Forgot Password"
                          onPress={() =>
                            navigateTo(
                              navigation,
                              "Auth Stack",
                              "Forgot Password Screen"
                            )
                          }
                          style={{ alignSelf: "flex-end" }}
                        />
                      </Column>
                    </Column>

                    <Column gap={16}>
                      <Button
                        variant="primary"
                        size={Platform.OS === "ios" ? "lg" : "md"}
                        label="Login"
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
                          Don't have account?{" "}
                        </Text>
                        <Button
                          variant="link"
                          label="Register"
                          onPress={() =>
                            navigateTo(
                              navigation,
                              "Auth Stack",
                              "Register Screen"
                            )
                          }
                        />
                      </Row>
                    </Column>
                  </Column>
                );
              }}
            </Formik>
          </Column>
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

export default LoginScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: getFontSize(24),
    fontWeight: 700,
    textAlign: "center",
    color: "#333333",
  },
  segmentedControl: {
    height: 40,
    ...Platform.select({
      ios: {
        shadowColor: theme.color.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
    backgroundColor: "#F5F5F5",
  },
});
