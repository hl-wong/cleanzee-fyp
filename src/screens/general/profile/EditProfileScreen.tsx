import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useContext } from "react";
import { Layout } from "../../../layouts";
import { goBack } from "../../../utils";
import { UserContext } from "../../../context";
import {
  Button,
  Column,
  Content,
  Input,
  ProfileImageUploader,
  Row,
} from "../../../components";
import { glob } from "../../../assets/styles";
import { Formik } from "formik";
import { editProfileSchema } from "../../../validations";
import { updateProfile } from "../../../services";
import { resetTo } from "../../../utils/navigationHelper";

interface EditProfileScreenProps {
  navigation: any;
}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({
  navigation,
}) => {
  const { user, refreshUserData } = useContext(UserContext);

  return (
    <Layout headerTitle="Edit Profile" onBack={() => goBack(navigation)}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={glob.container}
      >
        <Content bgColor="white">
          <ScrollView contentContainerStyle={{ padding: 16 }}>
            <ProfileImageUploader />
            <Formik
              initialValues={{
                firstName: user?.firstName ?? "",
                lastName: user?.lastName ?? "",
                email: user?.email ?? "",
                phoneNo: user?.phoneNo ?? "",
              }}
              onSubmit={async (values) => {
                console.log(values);

                const route = navigation.getState();
                const prevScreen = route.routes[route.index - 1].name;

                const userData = {
                  userId: user._id,
                  firstName: values.firstName,
                  lastName: values.lastName,
                  phoneNo: values.phoneNo,
                };

                const response = await updateProfile(userData);
                if (response.status === 200) {
                  await refreshUserData();

                  if (prevScreen === "Profile Screen") {
                    resetTo(navigation, "Profile Screen");
                  }

                  if (prevScreen === "Cleaner Profile Screen") {
                    resetTo(navigation, "Cleaner Profile Screen");
                  }
                }
              }}
              validationSchema={editProfileSchema}
            >
              {({ handleChange, values, errors, touched, handleSubmit }) => {
                return (
                  <Column gap={32}>
                    <Column gap={16}>
                      <Row gap={16}>
                        <Input
                          variant="text"
                          label="First Name"
                          placeholder="First Name"
                          value={values.firstName}
                          onChangeText={handleChange("firstName")}
                          style={{ flex: 1 }}
                          errors={
                            errors.firstName && touched.firstName
                              ? String(errors.firstName)
                              : undefined
                          }
                        />
                        <Input
                          variant="text"
                          label="Last Name"
                          placeholder="Last Name"
                          value={values.lastName}
                          onChangeText={handleChange("lastName")}
                          style={{ flex: 1 }}
                          errors={
                            errors.lastName && touched.lastName
                              ? String(errors.lastName)
                              : undefined
                          }
                        />
                      </Row>

                      <Input
                        variant="text"
                        label="Email"
                        placeholder="Enter your email"
                        value={values.email}
                        onChangeText={handleChange("email")}
                        editable={false}
                        errors={
                          errors.email && touched.email
                            ? String(errors.email)
                            : undefined
                        }
                      />

                      <Input
                        variant="text"
                        label="Phone No"
                        placeholder="Enter your phone number"
                        value={values.phoneNo}
                        onChangeText={handleChange("phoneNo")}
                        errors={
                          errors.phoneNo && touched.phoneNo
                            ? String(errors.phoneNo)
                            : undefined
                        }
                      />
                    </Column>

                    <Button
                      variant="primary"
                      size={Platform.OS === "ios" ? "lg" : "md"}
                      label="Update"
                      onPress={handleSubmit}
                    />
                  </Column>
                );
              }}
            </Formik>
          </ScrollView>
        </Content>
      </KeyboardAvoidingView>
    </Layout>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({});
