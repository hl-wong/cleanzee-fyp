import { StyleSheet } from "react-native";
import React from "react";
import { AddressInput, Column, Input } from "../../../components";
import { navigateTo } from "../../../utils";

interface InformationScreenProps {
  formikProps: any;
  navigation: any;
}

const InformationScreen: React.FC<InformationScreenProps> = ({
  formikProps,
  navigation,
}) => {
  return (
    <Column gap={16} style={{ paddingBottom: 16 }}>
      <Input
        variant="text"
        label="Full Name (as per NRIC)"
        placeholder="Enter your full name"
        value={formikProps.values.fullName}
        onChangeText={formikProps.handleChange("fullName")}
        onBlur={formikProps.handleBlur("fullName")}
        errors={
          formikProps.errors.fullName && formikProps.touched.fullName
            ? formikProps.errors.fullName
            : ""
        }
      />

      <Input
        variant="text"
        label="Phone Number"
        placeholder="Enter your phone no"
        value={formikProps.values.phoneNo}
        onChangeText={formikProps.handleChange("phoneNo")}
        onBlur={formikProps.handleBlur("phoneNo")}
        errors={
          formikProps.errors.phoneNo && formikProps.touched.phoneNo
            ? formikProps.errors.phoneNo
            : ""
        }
      />

      <AddressInput
        value={formikProps.values.address}
        errors={
          formikProps.errors.address && formikProps.touched.address
            ? formikProps.errors.address
            : ""
        }
        onPress={() =>
          navigateTo(navigation, "My Address Stack", "My Address Screen")
        }
      />
    </Column>
  );
};

export default InformationScreen;

const styles = StyleSheet.create({});
