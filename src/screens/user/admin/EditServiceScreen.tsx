import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useRef } from "react";

import { FieldArray, Formik, FormikErrors, FormikProps } from "formik";
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
import { updateService } from "../../../services";
import { serviceSchema } from "../../../validations";
import {
  duration,
  pricingType,
  serviceCategories,
  sqftRange,
} from "../../../constants";

interface EditServiceScreenProps {
  navigation: any;
  route: any;
}

const EditServiceScreen: React.FC<EditServiceScreenProps> = ({
  navigation,
  route,
}) => {
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

  const { item } = route.params;

  return (
    <Layout headerTitle="Edit Service" onBack={() => goBack(navigation)}>
      <Content bgColor="white">
        <KeyboardAvoidingView behavior="padding" style={glob.container}>
          <ScrollView contentContainerStyle={styles.scroll}>
            <Formik
              initialValues={{
                serviceImage: item.serviceImage ?? "",
                serviceName: item.serviceName ?? "",
                serviceCategory: item.serviceCategory ?? "",
                serviceDesc: item.serviceDesc ?? "",
                servicePricingType: item.servicePricingType ?? "",
                servicePrice: item.servicePrice ?? [],
              }}
              onSubmit={async (values) => {
                console.log(values);

                const serviceData = {
                  serviceId: item._id,
                  serviceImage: values.serviceImage,
                  serviceName: values.serviceName,
                  serviceCategory: values.serviceCategory,
                  serviceDesc: values.serviceDesc,
                  servicePricingType: values.servicePricingType,
                  servicePrice: values.servicePrice,
                };

                const response = await updateService(
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
                      initialValues={values.serviceImage}
                      errors={
                        errors.serviceImage && touched.serviceImage
                          ? String(errors.serviceImage)
                          : undefined
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
                          ? String(errors.serviceName)
                          : undefined
                      }
                    />

                    <SelectInput
                      items={serviceCategories}
                      label="Service Category"
                      placeholder="Select service category"
                      value={values.serviceCategory}
                      onValueChange={(value) =>
                        setFieldValue("serviceCategory", value)
                      }
                      errors={
                        errors.serviceCategory && touched.serviceCategory
                          ? String(errors.serviceCategory)
                          : undefined
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
                          ? String(errors.serviceDesc)
                          : undefined
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
                          ? String(errors.servicePricingType)
                          : undefined
                      }
                    />

                    {values.servicePricingType === "Fixed" && (
                      <Input
                        variant="text"
                        label="Price"
                        placeholder="Enter service price"
                        value={values.servicePrice[0].price}
                        onChangeText={handleChange("servicePrice.0.price")}
                        keyboardType="numeric"
                        prefix="RM"
                        errors={
                          Array.isArray(errors.servicePrice) &&
                          errors.servicePrice[0] &&
                          (errors.servicePrice[0] as FormikErrors<any>)
                            ?.price &&
                          Array.isArray(touched.servicePrice) &&
                          touched.servicePrice[0]?.price
                            ? String(
                                (errors.servicePrice[0] as FormikErrors<any>)
                                  ?.price
                              )
                            : undefined
                        }
                      />
                    )}

                    {(values.servicePricingType === "Sqft" ||
                      values.servicePricingType === "Hour") && (
                      <FieldArray name="servicePrice">
                        {({ push, remove }) => (
                          <>
                            {values.servicePrice.map(
                              (_: any, index: number) => {
                                return (
                                  <Column gap={16} key={index}>
                                    <Row
                                      gap={16}
                                      style={[
                                        Array.isArray(errors.servicePrice) &&
                                        errors.servicePrice[index] &&
                                        (
                                          errors.servicePrice[
                                            index
                                          ] as FormikErrors<any>
                                        )?.label &&
                                        Array.isArray(touched.servicePrice) &&
                                        touched.servicePrice[index]?.label
                                          ? glob.horizontalCenter
                                          : { alignItems: "flex-end" },
                                      ]}
                                    >
                                      <Input
                                        variant="text"
                                        label="Label"
                                        placeholder="Enter label"
                                        value={values.servicePrice[index].label}
                                        onChangeText={handleChange(
                                          `servicePrice.${index}.label`
                                        )}
                                        onBlur={handleBlur(
                                          `servicePrice.${index}.label`
                                        )}
                                        style={{ flex: 1 }}
                                        errors={
                                          Array.isArray(errors.servicePrice) &&
                                          errors.servicePrice[index] &&
                                          (
                                            errors.servicePrice[
                                              index
                                            ] as FormikErrors<any>
                                          )?.label &&
                                          Array.isArray(touched.servicePrice) &&
                                          touched.servicePrice[index]?.label
                                            ? String(
                                                (
                                                  errors.servicePrice[
                                                    index
                                                  ] as FormikErrors<any>
                                                )?.label
                                              )
                                            : undefined
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
                                          value={
                                            values.servicePrice[index].price
                                          }
                                          onChangeText={handleChange(
                                            `servicePrice.${index}.price`
                                          )}
                                          keyboardType="numeric"
                                          prefix="RM"
                                          style={{ flex: 1 }}
                                          errors={
                                            Array.isArray(
                                              errors.servicePrice
                                            ) &&
                                            errors.servicePrice[index] &&
                                            (
                                              errors.servicePrice[
                                                index
                                              ] as FormikErrors<any>
                                            )?.price &&
                                            Array.isArray(
                                              touched.servicePrice
                                            ) &&
                                            touched.servicePrice[index]?.price
                                              ? String(
                                                  (
                                                    errors.servicePrice[
                                                      index
                                                    ] as FormikErrors<any>
                                                  )?.price
                                                )
                                              : undefined
                                          }
                                        />

                                        <SelectInput
                                          items={sqftRange}
                                          label="Sqft Range"
                                          placeholder="Sqft Range"
                                          value={
                                            values.servicePrice[index].sqftRange
                                          }
                                          onValueChange={(value) =>
                                            setFieldValue(
                                              `servicePrice.${index}.sqftRange`,
                                              value
                                            )
                                          }
                                          style={{ flex: 1 }}
                                          errors={
                                            Array.isArray(
                                              errors.servicePrice
                                            ) &&
                                            errors.servicePrice[index] &&
                                            (
                                              errors.servicePrice[
                                                index
                                              ] as FormikErrors<any>
                                            )?.sqftRange &&
                                            Array.isArray(
                                              touched.servicePrice
                                            ) &&
                                            touched.servicePrice[index]
                                              ?.sqftRange
                                              ? String(
                                                  (
                                                    errors.servicePrice[
                                                      index
                                                    ] as FormikErrors<any>
                                                  )?.sqftRange
                                                )
                                              : undefined
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
                                          value={
                                            values.servicePrice[index].price
                                          }
                                          onChangeText={handleChange(
                                            `servicePrice.${index}.price`
                                          )}
                                          keyboardType="numeric"
                                          prefix="RM"
                                          style={{ flex: 1 }}
                                          errors={
                                            Array.isArray(
                                              errors.servicePrice
                                            ) &&
                                            errors.servicePrice[index] &&
                                            (
                                              errors.servicePrice[
                                                index
                                              ] as FormikErrors<any>
                                            )?.price &&
                                            Array.isArray(
                                              touched.servicePrice
                                            ) &&
                                            touched.servicePrice[index]?.price
                                              ? String(
                                                  (
                                                    errors.servicePrice[
                                                      index
                                                    ] as FormikErrors<any>
                                                  )?.price
                                                )
                                              : undefined
                                          }
                                        />

                                        <SelectInput
                                          items={duration}
                                          label="Duration"
                                          placeholder="Duration"
                                          value={
                                            values.servicePrice[index].duration
                                          }
                                          onValueChange={(value) =>
                                            setFieldValue(
                                              `servicePrice.${index}.duration`,
                                              value
                                            )
                                          }
                                          style={{ flex: 1 }}
                                          errors={
                                            Array.isArray(
                                              errors.servicePrice
                                            ) &&
                                            errors.servicePrice[index] &&
                                            (
                                              errors.servicePrice[
                                                index
                                              ] as FormikErrors<any>
                                            )?.duration &&
                                            Array.isArray(
                                              touched.servicePrice
                                            ) &&
                                            touched.servicePrice[index]
                                              ?.duration
                                              ? String(
                                                  (
                                                    errors.servicePrice[
                                                      index
                                                    ] as FormikErrors<any>
                                                  )?.duration
                                                )
                                              : undefined
                                          }
                                        />
                                      </Row>
                                    )}
                                  </Column>
                                );
                              }
                            )}
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
          label="Update"
          onPress={handleSubmit}
        />
      </Footer>
    </Layout>
  );
};

export default EditServiceScreen;

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 24 : 16,
  },
});
