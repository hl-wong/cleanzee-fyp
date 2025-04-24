import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import moment from "moment";
import { Formik, FormikProps } from "formik";
import { UserContext } from "../../../context";
import { Layout } from "../../../layouts";
import { goBack, resetTo } from "../../../utils";
import {
  Button,
  Column,
  Content,
  Footer,
  Input,
  MonthSelector,
  TimeSlotButton,
} from "../../../components";
import { glob } from "../../../assets/styles";
import { assignService, updateAssignService } from "../../../services";
import { pricingAndTimeSlotSchema } from "../../../validations";

interface PricingAndTimeSlotScreenProps {
  navigation: any;
  route: any;
}

const PricingAndTimeSlotScreen: React.FC<PricingAndTimeSlotScreenProps> = ({
  navigation,
  route,
}) => {
  const { selectedService, selectedOption, existingData } = route.params;

  const [selectedMonth, setSelectedMonth] = useState(moment());
  const formikRef = useRef<FormikProps<{
    date: string;
    timeslots: Record<string, string[]>;
    customPrice: string;
  }> | null>(null);
  const handleSubmit = () => {
    if (formikRef.current) {
      formikRef.current.submitForm();
    }
  };

  const { user, cleaner } = useContext(UserContext);

  useEffect(() => {
    if (existingData) {
      formikRef.current?.setValues({
        date: "",
        timeslots: existingData.timeslots || {},
        customPrice: existingData.servicePrice || "",
      });
    }
  }, [existingData]);

  return (
    <Layout
      headerTitle="Pricing And Time Slot"
      onBack={() => goBack(navigation)}
    >
      <Content bgColor="white">
        <KeyboardAvoidingView behavior="padding" style={glob.container}>
          <ScrollView contentContainerStyle={styles.scroll}>
            <Formik
              initialValues={{
                date: "",
                timeslots: {} as Record<string, string[]>,
                customPrice: "",
              }}
              onSubmit={async (values) => {
                console.log(values);

                const serviceData = {
                  userId: user._id,
                  cleanerId: cleaner._id,
                  serviceId: selectedService._id,
                  serviceName:
                    selectedOption?.label ?? selectedService?.serviceName,
                  serviceCategory: selectedService.serviceCategory,
                  servicePrice:
                    values.customPrice === ""
                      ? selectedOption
                        ? selectedOption.price
                        : selectedService.servicePrice[0]?.price
                      : values.customPrice,
                  timeslots: values.timeslots,
                  ...(selectedOption && { optionId: selectedOption._id }),
                  ...(existingData && { id: existingData._id }),
                };

                if (existingData) {
                  const response = await updateAssignService(serviceData);
                  if (response.status === 200) {
                    resetTo(navigation, "My Service Screen");
                  }
                } else {
                  const response = await assignService(serviceData);
                  if (response.status === 200) {
                    resetTo(navigation, "Browse Service Screen");
                  }
                }
              }}
              innerRef={formikRef}
              validationSchema={pricingAndTimeSlotSchema}
            >
              {({ setFieldValue, handleChange, values, errors, touched }) => {
                useEffect(() => {
                  console.log("Updated timeslots:", values.timeslots);
                }, [values.timeslots]);

                return (
                  <Column>
                    <Column gap={16}>
                      <MonthSelector
                        selectedMonth={selectedMonth}
                        setSelectedMonth={setSelectedMonth}
                        selectedDate={values.date}
                        setSelectedDate={(date) => setFieldValue("date", date)}
                        errors={
                          errors.timeslots && touched.timeslots
                            ? String(errors.timeslots)
                            : ""
                        }
                      />

                      {values.date && (
                        <TimeSlotButton
                          key={values.date}
                          value={values.timeslots[values.date] || []}
                          onChange={(value) => {
                            const selectedTime = Array.from(new Set(value));

                            setFieldValue("timeslots", {
                              ...values.timeslots,
                              [values.date]: selectedTime,
                            });
                          }}
                          onRemove={(value) => {
                            setFieldValue("timeslots", {
                              ...values.timeslots,
                              [values.date]: value,
                            });
                          }}
                        />
                      )}

                      <Input
                        variant="text"
                        label="Custom Price (Optional)"
                        placeholder="Enter your custom price"
                        value={values.customPrice}
                        onChangeText={handleChange("customPrice")}
                        keyboardType="numeric"
                        prefix="RM"
                        errors={
                          errors.customPrice && touched.customPrice
                            ? errors.customPrice
                            : ""
                        }
                      />
                    </Column>
                  </Column>
                );
              }}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
      </Content>
      <Footer>
        <Button
          variant="primary"
          size={Platform.OS === "ios" ? "lg" : "md"}
          label="Assign"
          onPress={handleSubmit}
        />
      </Footer>
    </Layout>
  );
};

export default PricingAndTimeSlotScreen;

const styles = StyleSheet.create({
  scroll: {
    padding: 16,
  },
});
