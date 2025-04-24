import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useContext, useRef } from "react";
import { Layout } from "../../../layouts";
import { goBack } from "../../../utils";
import {
  Button,
  Column,
  Content,
  Footer,
  Input,
  Row,
  SelectInput,
  ToggleSwitch,
} from "../../../components";
import { UserContext } from "../../../context";
import { Formik, FormikProps } from "formik";
import { glob } from "../../../assets/styles";
import { addressData } from "../../../constants";
import { addressSchema } from "../../../validations";
import { addNewAddress } from "../../../services";
import { resetTo } from "../../../utils/navigationHelper";

interface NewAddressScreenProps {
  navigation: any;
}

const NewAddressScreen: React.FC<NewAddressScreenProps> = ({ navigation }) => {
  const { user, refreshUserData } = useContext(UserContext);

  const labelRef = useRef<TextInput>(null);
  const fullNameRef = useRef<TextInput>(null);
  const streetRef = useRef<TextInput>(null);
  const postcodeRef = useRef<TextInput>(null);
  const phoneNoRef = useRef<TextInput>(null);

  const formikRef = useRef<FormikProps<{
    label: string;
    fullName: string;
    street: string;
    state: string;
    city: string;
    postcode: string;
    phoneNo: string;
    isDefault: boolean;
  }> | null>(null);
  const handleSubmit = () => {
    if (formikRef.current) {
      formikRef.current.submitForm();
    }
  };

  return (
    <Layout headerTitle="New Address" onBack={() => goBack(navigation)}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={glob.container}
      >
        <Content bgColor="white">
          <ScrollView contentContainerStyle={{ padding: 16 }}>
            <Formik
              initialValues={{
                label: "",
                fullName: "",
                street: "",
                state: "",
                city: "",
                postcode: "",
                phoneNo: "",
                isDefault: false,
              }}
              onSubmit={async (values) => {
                console.log(values);

                const addressData = {
                  userId: user._id,
                  label: values.label,
                  fullName: values.fullName,
                  street: values.street,
                  state: values.state,
                  city: values.city,
                  postcode: values.postcode,
                  phoneNo: values.phoneNo,
                  isDefault: values.isDefault,
                };

                const response = await addNewAddress(addressData);
                if (response.status === 200) {
                  await refreshUserData();

                  resetTo(navigation, "My Address Screen");
                }
              }}
              validationSchema={addressSchema}
              innerRef={formikRef}
            >
              {({ handleChange, values, errors, touched, setFieldValue }) => {
                type StateKeys = keyof typeof addressData.cities;

                return (
                  <Column gap={16}>
                    <Input
                      variant="text"
                      label="Label"
                      placeholder="Enter label"
                      value={values.label}
                      onChangeText={handleChange("label")}
                      onSubmitEditing={() => fullNameRef.current?.focus()}
                      returnKeyType="next"
                      ref={labelRef}
                      errors={errors.label && touched.label ? errors.label : ""}
                    />

                    <Input
                      variant="text"
                      label="Full Name"
                      placeholder="Enter full name"
                      value={values.fullName}
                      onChangeText={handleChange("fullName")}
                      onSubmitEditing={() => streetRef.current?.focus()}
                      returnKeyType="next"
                      ref={fullNameRef}
                      errors={
                        errors.fullName && touched.fullName
                          ? errors.fullName
                          : ""
                      }
                    />

                    <Input
                      variant="text"
                      label="Street"
                      placeholder="Enter street"
                      value={values.street}
                      onChangeText={handleChange("street")}
                      onSubmitEditing={() => postcodeRef.current?.focus()}
                      returnKeyType="next"
                      ref={streetRef}
                      errors={
                        errors.street && touched.street ? errors.street : ""
                      }
                    />

                    <SelectInput
                      label="State"
                      items={addressData.states}
                      onValueChange={(value) => setFieldValue("state", value)}
                      value={values.state}
                      placeholder="Select state"
                      errors={errors.state && touched.state ? errors.state : ""}
                    />

                    <Row gap={16}>
                      <SelectInput
                        label="City"
                        items={
                          addressData.cities[values.state as StateKeys] || []
                        }
                        onValueChange={(value) => setFieldValue("city", value)}
                        value={values.city}
                        placeholder="Select city"
                        style={{ flex: 1 }}
                        errors={errors.city && touched.city ? errors.city : ""}
                      />

                      <Input
                        variant="text"
                        label="Postcode"
                        placeholder="Enter postcode"
                        value={values.postcode}
                        onChangeText={handleChange("postcode")}
                        ref={postcodeRef}
                        returnKeyType="next"
                        onSubmitEditing={() => phoneNoRef.current?.focus()}
                        style={{ flex: 1 }}
                        errors={
                          errors.postcode && touched.postcode
                            ? errors.postcode
                            : ""
                        }
                      />
                    </Row>

                    <Input
                      variant="text"
                      label="Phone No"
                      placeholder="Enter phone no"
                      value={values.phoneNo}
                      onChangeText={handleChange("phoneNo")}
                      ref={phoneNoRef}
                      errors={
                        errors.phoneNo && touched.phoneNo ? errors.phoneNo : ""
                      }
                    />

                    <ToggleSwitch
                      label="Set as Default"
                      value={values.isDefault}
                      onValueChange={(value) =>
                        setFieldValue("isDefault", value)
                      }
                    />
                  </Column>
                );
              }}
            </Formik>
          </ScrollView>
        </Content>

        <Footer>
          <Button
            variant="primary"
            size={Platform.OS === "ios" ? "lg" : "md"}
            label="Add"
            onPress={handleSubmit}
          />
        </Footer>
      </KeyboardAvoidingView>
    </Layout>
  );
};

export default NewAddressScreen;

const styles = StyleSheet.create({});
