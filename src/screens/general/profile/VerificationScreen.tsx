import { StyleSheet } from "react-native";
import React from "react";
import { CameraUploader, Checkbox, Column, Input } from "../../../components";

interface VerificationScreenProps {
  formikProps: any;
  navigation: any;
}

const VerificationScreen: React.FC<VerificationScreenProps> = ({
  formikProps,
  navigation,
}) => {
  return (
    <Column gap={16} style={{ paddingBottom: 16 }}>
      <Input
        variant="text"
        label="IC Number"
        placeholder="Enter your IC Number"
        value={formikProps.values.icNumber}
        onChangeText={formikProps.handleChange("icNumber")}
        errors={
          formikProps.errors.icNumber && formikProps.touched.icNumber
            ? formikProps.errors.icNumber
            : ""
        }
      />

      <CameraUploader
        label="Upload a selfie with your IC"
        desc="Make sure your IC is clearly visible in the photo."
        onImageSelected={(imageUri) =>
          formikProps.setFieldValue("selfiePhoto", imageUri)
        }
        errors={
          formikProps.errors.selfiePhoto && formikProps.touched.selfiePhoto
            ? formikProps.errors.selfiePhoto
            : ""
        }
      />

      <Checkbox
        label="I agree to the Terms & Conditions"
        value={formikProps.values.agreeToTerms}
        onPress={() =>
          formikProps.setFieldValue(
            "agreeToTerms",
            !formikProps.values.agreeToTerms
          )
        }
        errors={
          formikProps.errors.agreeToTerms && formikProps.touched.agreeToTerms
            ? formikProps.errors.agreeToTerms
            : ""
        }
      />
    </Column>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({});
