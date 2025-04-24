import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useRef } from "react";
import { FieldArray, Formik, FormikProps } from "formik";
import { Layout } from "../../../layouts";
import {
  Button,
  Column,
  Content,
  Footer,
  IconButton,
  ImageUploader,
  Input,
  Row,
  SelectInput,
} from "../../../components";
import { goBack, resetTo } from "../../../utils";
import { glob, theme } from "../../../assets/styles";
import { createService } from "../../../services";
import { serviceSchema } from "../../../validations";
import {
  duration,
  pricingType,
  serviceCategories,
  sqftRange,
} from "../../../constants";

interface NewServiceScreenProps {
  navigation: any;
}

const NewServiceScreen: React.FC<NewServiceScreenProps> = ({ navigation }) => {
  const serviceNameRef = useRef<TextInput>(null);
  const serviceDescRef = useRef<TextInput>(null);

  const formikRef = useRef<FormikProps<{
    serviceImage: string;
    serviceName: string;
    serviceDesc: string;
    serviceCategory: string;
    servicePricingType: string;
    servicePrice: {
      label?: string;
      sqftRange?: string;
      duration?: string;
      price: string;
    }[];
  }> | null>(null);
  const handleSubmit = () => {
    if (formikRef.current) {
      formikRef.current.submitForm();
    }
  };

  return (
    <Layout headerTitle="New Service" onBack={() => goBack(navigation)}>
      <Content bgColor="white">
        <KeyboardAvoidingView behavior="padding" style={glob.container}>
          <ScrollView contentContainerStyle={styles.scroll}>
            <Formik
              initialValues={{
                serviceImage: "",
                serviceName: "",
                serviceCategory: "",
                serviceDesc: "",
                servicePricingType: "",
                servicePrice: [],
              }}
              onSubmit={async (values) => {
                console.log(values);

                const serviceData = {
                  serviceImage: values.serviceImage,
                  serviceName: values.serviceName,
                  serviceCategory: values.serviceCategory,
                  serviceDesc: values.serviceDesc,
                  servicePricingType: values.servicePricingType,
                  servicePrice: values.servicePrice,
                };

                const response = await createService(
                  serviceData,
                  "services",
                  "service"
                );
                if (response.status === 200) {
                  resetTo(navigation, "Service Management Screen");
                }
              }}
              innerRef={formikRef}
              validationSchema={serviceSchema}
            >
              {({
                handleChange,
                values,
                errors,
                touched,
                setFieldValue,
                handleBlur,
              }) => {
                return (
                  <Column gap={16}>
                    <ImageUploader
                      onImageSelected={(imageUri) =>
                        setFieldValue("serviceImage", imageUri)
                      }
                      errors={
                        errors.serviceImage && touched.serviceImage
                          ? errors.serviceImage
                          : ""
                      }
                    />

                    <Input
                      variant="text"
                      label="Service Name"
                      placeholder="Enter service name"
                      onChangeText={handleChange("serviceName")}
                      value={values.serviceName}
                      ref={serviceNameRef}
                      onSubmitEditing={() => serviceDescRef.current?.focus()}
                      errors={
                        errors.serviceName && touched.serviceName
                          ? errors.serviceName
                          : ""
                      }
                    />

                    <SelectInput
                      items={serviceCategories}
                      label="Service Category"
                      placeholder="Select service category"
                      onValueChange={(value) =>
                        setFieldValue("serviceCategory", value)
                      }
                      errors={
                        errors.serviceCategory && touched.serviceCategory
                          ? errors.serviceCategory
                          : ""
                      }
                    />

                    <Input
                      variant="textarea"
                      label="Service Description"
                      placeholder="Enter service description"
                      onChangeText={handleChange("serviceDesc")}
                      value={values.serviceDesc}
                      ref={serviceDescRef}
                      maxLength={2000}
                      errors={
                        errors.serviceDesc && touched.serviceDesc
                          ? errors.serviceDesc
                          : ""
                      }
                    />

                    <SelectInput
                      items={pricingType}
                      label="Pricing Type"
                      placeholder="Select pricing type"
                      value={values.servicePricingType}
                      onValueChange={(value) => {
                        setFieldValue("servicePricingType", value);

                        if (value === "Hour") {
                          setFieldValue("servicePrice", [
                            { label: "", price: "", duration: "" },
                          ]);
                        }

                        if (value === "Sqft") {
                          setFieldValue("servicePrice", [
                            { label: "", price: "", sqftRange: "" },
                          ]);
                        }

                        if (value === "Fixed") {
                          setFieldValue("servicePrice", [{ price: "" }]);
                        }
                      }}
                      errors={
                        errors.servicePricingType && touched.servicePricingType
                          ? errors.servicePricingType
                          : ""
                      }
                    />

                    {values.servicePricingType === "Fixed" && (
                      <Input
                        variant="text"
                        label="Price"
                        placeholder="Enter service price"
                        onChangeText={handleChange("servicePrice.0.price")}
                        keyboardType="numeric"
                        prefix="RM"
                        errors={
                          typeof errors.servicePrice?.[0] === "object" &&
                          errors.servicePrice?.[0]?.price &&
                          touched.servicePrice?.[0]?.price
                            ? errors.servicePrice?.[0]?.price
                            : ""
                        }
                      />
                    )}

                    {(values.servicePricingType === "Sqft" ||
                      values.servicePricingType === "Hour") && (
                      <FieldArray name="servicePrice">
                        {({ push, remove }) => (
                          <>
                            {values.servicePrice.map((_, index) => {
                              return (
                                <Column gap={16} key={index}>
                                  <Row
                                    gap={16}
                                    style={[
                                      typeof errors.servicePrice?.[index] ===
                                        "object" &&
                                      errors.servicePrice?.[index]?.label &&
                                      touched.servicePrice?.[index]?.label
                                        ? glob.horizontalCenter
                                        : { alignItems: "flex-end" },
                                    ]}
                                  >
                                    <Input
                                      variant="text"
                                      label="Label"
                                      placeholder="Enter label"
                                      onChangeText={handleChange(
                                        `servicePrice.${index}.label`
                                      )}
                                      onBlur={handleBlur(
                                        `servicePrice.${index}.label`
                                      )}
                                      style={{ flex: 1 }}
                                      errors={
                                        typeof errors.servicePrice?.[index] ===
                                          "object" &&
                                        errors.servicePrice?.[index]?.label &&
                                        touched.servicePrice?.[index]?.label
                                          ? errors.servicePrice?.[index]?.label
                                          : ""
                                      }
                                    />

                                    <IconButton
                                      variant="rounded"
                                      size="md"
                                      name={index === 0 ? "add" : "delete"}
                                      style={{ height: 48, width: 48 }}
                                      iconColor={theme.color.white}
                                      onPress={() => {
                                        if (index === 0) {
                                          push({
                                            label: "",
                                            price: "",
                                            ...(values.servicePricingType ===
                                            "Sqft"
                                              ? { sqftRange: "" }
                                              : values.servicePricingType ===
                                                "Hour"
                                              ? { duration: "" }
                                              : {}),
                                          });
                                        }

                                        if (index > 0) {
                                          remove(index);
                                        }
                                      }}
                                    />
                                  </Row>

                                  {values.servicePricingType === "Sqft" && (
                                    <Row gap={16}>
                                      <Input
                                        variant="text"
                                        label="Price"
                                        placeholder="Price"
                                        onChangeText={handleChange(
                                          `servicePrice.${index}.price`
                                        )}
                                        keyboardType="numeric"
                                        prefix="RM"
                                        style={{ flex: 1 }}
                                        errors={
                                          typeof errors.servicePrice?.[
                                            index
                                          ] === "object" &&
                                          errors.servicePrice?.[index]?.price &&
                                          touched.servicePrice?.[index]?.price
                                            ? errors.servicePrice?.[index]
                                                ?.price
                                            : ""
                                        }
                                      />

                                      <SelectInput
                                        items={sqftRange}
                                        label="Sqft Range"
                                        placeholder="Sqft Range"
                                        onValueChange={(value) =>
                                          setFieldValue(
                                            `servicePrice.${index}.sqftRange`,
                                            value
                                          )
                                        }
                                        style={{ flex: 1 }}
                                        errors={
                                          typeof errors.servicePrice?.[
                                            index
                                          ] === "object" &&
                                          errors.servicePrice?.[index]
                                            ?.sqftRange &&
                                          touched.servicePrice?.[index]
                                            ?.sqftRange
                                            ? errors.servicePrice?.[index]
                                                ?.sqftRange
                                            : ""
                                        }
                                      />
                                    </Row>
                                  )}

                                  {values.servicePricingType === "Hour" && (
                                    <Row gap={16}>
                                      <Input
                                        variant="text"
                                        label="Price"
                                        placeholder="Price"
                                        onChangeText={handleChange(
                                          `servicePrice.${index}.price`
                                        )}
                                        keyboardType="numeric"
                                        prefix="RM"
                                        style={{ flex: 1 }}
                                        errors={
                                          typeof errors.servicePrice?.[
                                            index
                                          ] === "object" &&
                                          errors.servicePrice?.[index]?.price &&
                                          touched.servicePrice?.[index]?.price
                                            ? errors.servicePrice?.[index]
                                                ?.price
                                            : ""
                                        }
                                      />

                                      <SelectInput
                                        items={duration}
                                        label="Duration"
                                        placeholder="Duration"
                                        onValueChange={(value) =>
                                          setFieldValue(
                                            `servicePrice.${index}.duration`,
                                            value
                                          )
                                        }
                                        style={{ flex: 1 }}
                                        errors={
                                          typeof errors.servicePrice?.[
                                            index
                                          ] === "object" &&
                                          errors.servicePrice?.[index]
                                            ?.duration &&
                                          touched.servicePrice?.[index]
                                            ?.duration
                                            ? errors.servicePrice?.[index]
                                                ?.duration
                                            : ""
                                        }
                                      />
                                    </Row>
                                  )}
                                </Column>
                              );
                            })}
                          </>
                        )}
                      </FieldArray>
                    )}
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
          label="Create"
          onPress={handleSubmit}
        />
      </Footer>
    </Layout>
  );
};

export default NewServiceScreen;

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 24 : 16,
  },
});
