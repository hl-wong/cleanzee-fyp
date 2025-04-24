import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useContext, useRef } from "react";
import { Layout } from "../../../layouts";
import { goBack, resetTo } from "../../../utils";
import {
  Button,
  Column,
  Content,
  Footer,
  Input,
  RatingInput,
} from "../../../components";
import { glob } from "../../../assets/styles";
import { Formik, FormikProps } from "formik";
import { rateReviewSchema } from "../../../validations";
import { rateService } from "../../../services";
import { UserContext } from "../../../context";

interface RateServiceScreenProps {
  navigation: any;
  route: any;
}

const RateServiceScreen: React.FC<RateServiceScreenProps> = ({
  navigation,
  route,
}) => {
  const { user } = useContext(UserContext);
  const { cleanerId, serviceId, bookingId } = route.params;

  const formikRef = useRef<FormikProps<{
    serviceRating: number;
    serviceReview: string;
    cleanerRating: number;
    cleanerReview: string;
  }> | null>(null);
  const handleSubmit = () => {
    if (formikRef.current) {
      formikRef.current.submitForm();
    }
  };

  return (
    <Layout headerTitle="Rate Service" onBack={() => goBack(navigation)}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={glob.container}
      >
        <Content bgColor="white">
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingVertical: 24,
            }}
          >
            <Formik
              initialValues={{
                serviceRating: 0,
                serviceReview: "",
                cleanerRating: 0,
                cleanerReview: "",
              }}
              onSubmit={async (values) => {
                console.log(values);

                const ratingData = {
                  userId: user._id,
                  cleanerId: cleanerId,
                  serviceId: serviceId,
                  bookingId: bookingId,
                  serviceRating: values.serviceRating,
                  serviceReview: values.serviceReview,
                  cleanerRating: values.cleanerRating,
                  cleanerReview: values.cleanerReview,
                };

                const response = await rateService(ratingData);
                if (response.status === 200) {
                  resetTo(navigation, "My Booking Screen");
                }
              }}
              validationSchema={rateReviewSchema}
              innerRef={formikRef}
            >
              {({ handleChange, values, errors, touched, setFieldValue }) => {
                return (
                  <Column gap={16}>
                    <RatingInput
                      label="Service Overall Rating"
                      value={values.serviceRating}
                      onChange={(values) =>
                        setFieldValue("serviceRating", values)
                      }
                      style={glob.center}
                    />

                    <Input
                      variant="textarea"
                      label="Review Service"
                      maxLength={2000}
                      placeholder="Review the service"
                      onChangeText={handleChange("serviceReview")}
                      value={values.serviceReview}
                      errors={
                        errors.serviceReview && touched.serviceReview
                          ? errors.serviceReview
                          : ""
                      }
                    />

                    <RatingInput
                      label="Cleaner Overall Rating"
                      value={values.cleanerRating}
                      onChange={(values) =>
                        setFieldValue("cleanerRating", values)
                      }
                      style={glob.center}
                    />

                    <Input
                      variant="textarea"
                      label="Review Cleaner"
                      maxLength={2000}
                      placeholder="Review the cleaner"
                      onChangeText={handleChange("cleanerReview")}
                      value={values.cleanerReview}
                      errors={
                        errors.cleanerReview && touched.cleanerReview
                          ? errors.cleanerReview
                          : ""
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
            label="Rate Service"
            onPress={handleSubmit}
          />
        </Footer>
      </KeyboardAvoidingView>
    </Layout>
  );
};

export default RateServiceScreen;

const styles = StyleSheet.create({});
