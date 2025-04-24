import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Layout } from "../../../layouts";
import { goBack, navigateTo } from "../../../utils";
import {
  Button,
  Content,
  Footer,
  ProgressStep,
  Row,
} from "../../../components";
import InformationScreen from "./InformationScreen";
import VerificationScreen from "./VerificationScreen";
import { Formik, FormikProps } from "formik";
import { glob } from "../../../assets/styles";
import { UserContext } from "../../../context";
import { informationSchema, verificationSchema } from "../../../validations";
import { registerAsCleaner, uploadImageToCloudinary } from "../../../services";

interface CleanerRegistrationFormScreenProps {
  navigation: any;
}

const CleanerRegistrationFormScreen: React.FC<
  CleanerRegistrationFormScreenProps
> = ({ navigation }) => {
  const { user } = useContext(UserContext);

  const labels = ["Information", "Verification"];
  const [currentStep, setCurrentStep] = useState(0);

  const renderStepContent = (formikProps: any) => {
    switch (currentStep) {
      case 0:
        return (
          <InformationScreen
            formikProps={formikProps}
            navigation={navigation}
          />
        );
      case 1:
        return (
          <VerificationScreen
            formikProps={formikProps}
            navigation={navigation}
          />
        );
      default:
        return null;
    }
  };

  const formikRef = useRef<FormikProps<{
    fullName: string;
    phoneNo: string;
    address: string;
    icNumber: string;
    selfiePhoto: string;
    agreeToTerms: boolean;
  }> | null>(null);

  const getDefaultAddress = useCallback(() => {
    return user.address.find(
      (addr: {
        street: string;
        city: string;
        postcode: string;
        state: string;
        isDefault: boolean;
      }) => addr.isDefault
    );
  }, [user.address]);

  const defaultAddress = getDefaultAddress();

  const [initialValues, setInitialValues] = useState({
    fullName: "",
    phoneNo: user.phoneNo ?? "",
    address: defaultAddress
      ? `${defaultAddress.street}, ${defaultAddress.postcode} ${defaultAddress.city}, ${defaultAddress.state}`
      : "",
    icNumber: "",
    selfiePhoto: "",
    agreeToTerms: false,
  });

  useEffect(() => {
    const updatedAddress = getDefaultAddress();
    setInitialValues((prevValues) => ({
      ...prevValues,
      address: updatedAddress
        ? `${updatedAddress.street}, ${updatedAddress.postcode} ${updatedAddress.city}, ${updatedAddress.state}`
        : "",
    }));
  }, [user.address]);

  useEffect(() => {
    if (formikRef.current) {
      formikRef.current.setValues(initialValues);
    }
  }, [initialValues]);

  return (
    <Layout
      headerTitle="Cleaner Registration"
      onBack={() => goBack(navigation)}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={glob.container}
      >
        <Content bgColor="white">
          <ProgressStep labels={labels} currentStep={currentStep} />
          <ScrollView style={styles.scroll}>
            <Formik
              initialValues={initialValues}
              onSubmit={async (values) => {
                console.log(values);

                if (currentStep === labels.length - 1) {
                  const imageUri = await uploadImageToCloudinary(
                    "cleaners",
                    "cleaners",
                    values.selfiePhoto,
                    user._id
                  );

                  if (imageUri) {
                    const cleanerData = {
                      userId: user._id,
                      fullName: values.fullName,
                      phoneNo: values.phoneNo,
                      address: {
                        street: defaultAddress.street,
                        city: defaultAddress.city,
                        postcode: defaultAddress.postcode,
                        state: defaultAddress.state,
                      },
                      icNumber: values.icNumber,
                      selfiePhoto: imageUri,
                      agreeToTerms: values.agreeToTerms,
                      approved: false,
                    };

                    const response = await registerAsCleaner(cleanerData);
                    if (response.status === 200) {
                      navigateTo(
                        navigation,
                        "Become Cleaner Stack",
                        "Pending Screen",
                        {
                          title: "Pending Approval",
                          desc: "Your cleaner application is under review. You will be notified once the verification process is complete.",
                        }
                      );
                    }
                  }
                }
              }}
              validationSchema={
                currentStep === 0 ? informationSchema : verificationSchema
              }
              innerRef={formikRef}
            >
              {(formikProps) => <>{renderStepContent(formikProps)}</>}
            </Formik>
          </ScrollView>
        </Content>
        <Footer>
          <Row gap={16}>
            <Button
              variant="secondary"
              size={Platform.OS === "ios" ? "lg" : "md"}
              label="Back"
              onPress={() => setCurrentStep(currentStep - 1)}
              style={{ flex: 1 }}
              disabled={currentStep === 0}
            />
            <Button
              variant="primary"
              size={Platform.OS === "ios" ? "lg" : "md"}
              label={currentStep === labels.length - 1 ? "Submit" : "Next"}
              onPress={async () => {
                if (currentStep < labels.length - 1) {
                  formikRef.current?.handleSubmit();

                  const errors = await formikRef.current?.validateForm();
                  if (errors && Object.keys(errors).length === 0) {
                    setCurrentStep(currentStep + 1);
                  }
                }

                if (currentStep === labels.length - 1) {
                  formikRef.current?.handleSubmit();
                }
              }}
              style={{ flex: 1 }}
            />
          </Row>
        </Footer>
      </KeyboardAvoidingView>
    </Layout>
  );
};

export default CleanerRegistrationFormScreen;

const styles = StyleSheet.create({
  scroll: {
    padding: 16,
  },
});
