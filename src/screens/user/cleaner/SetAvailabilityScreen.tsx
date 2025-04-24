import {
  Alert,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useRef } from "react";
import { Formik, FormikProps } from "formik";
import { UserContext } from "../../../context";
import { Layout } from "../../../layouts";
import { goBack } from "../../../utils";
import {
  AccordionItem,
  Button,
  Column,
  Content,
  DateTimeInput,
  Row,
  ToggleSwitch,
} from "../../../components";
import { availabiltySchema } from "../../../validations";
import { setAvailability } from "../../../services";
import { glob } from "../../../assets/styles";

interface SetAvailabilityScreenProps {
  navigation: any;
}

const SetAvailabilityScreen: React.FC<SetAvailabilityScreenProps> = ({
  navigation,
}) => {
  const { cleaner, refreshCleanerData } = useContext(UserContext);

  const formikRef = useRef<FormikProps<{
    availability: {
      day: string;
      startTime: string;
      endTime: string;
      off: boolean;
    }[];
  }> | null>(null);
  const handleSubmit = () => {
    if (formikRef.current) {
      formikRef.current.submitForm();
    }
  };

  const defaultAvailability = [
    { day: "Mon", startTime: "", endTime: "", off: false },
    { day: "Tue", startTime: "", endTime: "", off: false },
    { day: "Wed", startTime: "", endTime: "", off: false },
    { day: "Thur", startTime: "", endTime: "", off: false },
    { day: "Fri", startTime: "", endTime: "", off: false },
    { day: "Sat", startTime: "", endTime: "", off: false },
    { day: "Sun", startTime: "", endTime: "", off: false },
  ];

  return (
    <Layout headerTitle="Set Availability" onBack={() => goBack(navigation)}>
      <Content bgColor="white">
        <Formik
          initialValues={{
            availability: defaultAvailability.map((defaultItem) => {
              const existingItem = cleaner?.availability?.find(
                (item: { day: string }) => item.day === defaultItem.day
              );

              return {
                day: defaultItem.day,
                startTime: existingItem?.startTime ?? "",
                endTime: existingItem?.endTime ?? "",
                off: existingItem?.off ?? false,
              };
            }),
          }}
          onSubmit={async (values) => {
            console.log(values);

            const response = await setAvailability(
              cleaner._id,
              values.availability
            );
            if (response.status === 200) {
              Alert.alert("Update successfully");
              refreshCleanerData();
            }
          }}
          validationSchema={availabiltySchema}
          innerRef={formikRef}
        >
          {({ values, setFieldValue }) => {
            return (
              <FlatList
                data={values.availability}
                keyExtractor={(item) => item.day}
                renderItem={({
                  item,
                  index,
                }: {
                  item: {
                    day: string;
                    startTime: string;
                    endTime: string;
                    off: boolean;
                  };
                  index: number;
                }) => {
                  return (
                    <AccordionItem
                      title={item.day}
                      content={
                        <Column gap={16}>
                          {!item.off && (
                            <Row
                              gap={16}
                              style={[glob.spaceBetween, glob.horizontalCenter]}
                            >
                              <DateTimeInput
                                mode="time"
                                placeholder="Start Time"
                                value={
                                  item.startTime
                                    ? new Date(item.startTime)
                                    : undefined
                                }
                                onChange={(time) =>
                                  setFieldValue(
                                    `availability[${index}].startTime`,
                                    time
                                  )
                                }
                                style={{ flex: 1 }}
                              />
                              <Text>-</Text>
                              <DateTimeInput
                                mode="time"
                                placeholder="End Time"
                                value={
                                  item.endTime
                                    ? new Date(item.endTime)
                                    : undefined
                                }
                                onChange={(time) =>
                                  setFieldValue(
                                    `availability[${index}].endTime`,
                                    time
                                  )
                                }
                                style={{ flex: 1 }}
                              />
                            </Row>
                          )}

                          <ToggleSwitch
                            label="Off"
                            value={item.off}
                            onValueChange={(value) => {
                              setFieldValue(
                                `availability[${index}].off`,
                                value
                              );

                              if (value) {
                                setFieldValue(
                                  `availability[${index}].startTime`,
                                  ""
                                );
                                setFieldValue(
                                  `availability[${index}].endTime`,
                                  ""
                                );
                              }
                            }}
                          />
                        </Column>
                      }
                    />
                  );
                }}
                ListFooterComponent={
                  <View style={{ paddingHorizontal: 16, paddingVertical: 32 }}>
                    <Button
                      variant="primary"
                      size={Platform.OS === "ios" ? "lg" : "md"}
                      label="Update"
                      onPress={handleSubmit}
                    />
                  </View>
                }
              />
            );
          }}
        </Formik>
      </Content>
    </Layout>
  );
};

export default SetAvailabilityScreen;

const styles = StyleSheet.create({});
