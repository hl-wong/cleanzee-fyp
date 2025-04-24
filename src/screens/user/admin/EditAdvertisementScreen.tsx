import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import React, { useRef } from "react";
import { Formik, FormikProps } from "formik";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Layout } from "../../../layouts";
import { getFontSize, goBack, resetTo } from "../../../utils";
import { glob } from "../../../assets/styles";
import {
  Button,
  Column,
  Content,
  DateTimeInput,
  Footer,
  FormErrorMessage,
  ImageUploader,
  Input,
  Row,
  SelectInput,
  ToggleSwitch,
} from "../../../components";
import { updateAdvertisement } from "../../../services";
import { adverSchema } from "../../../validations";
import { advertisementData } from "../../../constants";

interface EditAdvertisementScreenProps {
  navigation: any;
  route: any;
}

const EditAdvertisementScreen: React.FC<EditAdvertisementScreenProps> = ({
  navigation,
  route,
}) => {
  const adverTitleRef = useRef<TextInput>(null);
  const adverDescRef = useRef<TextInput>(null);

  const formikRef = useRef<FormikProps<{
    adverPopUpImage: string;
    adverBannerImage: string;
    adverTitle: string;
    adverDesc: string;
    adverStart: string;
    adverEnd: string;
    discountType: string;
    amount?: string;
    percentage?: string;
    promoCode: string;
    adverStatus: boolean;
  }> | null>(null);
  const handleSubmit = () => {
    if (formikRef.current) {
      formikRef.current.submitForm();
    }
  };

  const { item } = route.params;

  return (
    <Layout headerTitle="Edit Advertisement" onBack={() => goBack(navigation)}>
      <Content bgColor="white">
        <KeyboardAvoidingView behavior="padding" style={glob.container}>
          <ScrollView contentContainerStyle={styles.scroll}>
            <Formik
              initialValues={{
                adverPopUpImage: item.adverPopUpImage ?? "",
                adverBannerImage: item.adverBannerImage ?? "",
                adverTitle: item.adverTitle ?? "",
                adverDesc: item.adverDesc ?? "",
                adverStart: item.adverStart ?? "",
                adverEnd: item.adverEnd ?? "",
                discountType: item.discountType ?? "",
                amount: item.amount ?? "",
                percentage: item.percentage ?? "",
                promoCode: item.promoCode ?? "",
                adverStatus: item.adverStatus ?? false,
              }}
              onSubmit={async (values) => {
                console.log(values);

                const adverData = {
                  adverId: item._id,
                  adverPopUpImage: values.adverPopUpImage,
                  adverBannerImage: values.adverBannerImage,
                  adverTitle: values.adverTitle,
                  adverDesc: values.adverDesc,
                  adverStart: values.adverStart,
                  adverEnd: values.adverEnd,
                  discountType: values.discountType,
                  percentage: values.percentage,
                  amount: values.amount,
                  promoCode: values.promoCode,
                  adverStatus: values.adverStatus,
                };

                const response = await updateAdvertisement(
                  adverData,
                  "advertisements",
                  "advertisement"
                );
                if (response.status === 200) {
                  resetTo(navigation, "Advertisement Screen");
                }
              }}
              innerRef={formikRef}
              validationSchema={adverSchema}
            >
              {({ handleChange, values, errors, touched, setFieldValue }) => {
                return (
                  <Column gap={Platform.OS === "ios" ? 24 : 16}>
                    <Column gap={16}>
                      <Row gap={16}>
                        <ImageUploader
                          size={{ width: 600, height: 600 }}
                          onImageSelected={(imageUri) => {
                            setFieldValue("adverPopUpImage", imageUri);
                          }}
                          initialValues={values.adverPopUpImage}
                        />

                        <ImageUploader
                          size={{ width: 1080, height: 400 }}
                          onImageSelected={(imageUri) => {
                            setFieldValue("adverBannerImage", imageUri);
                          }}
                          initialValues={values.adverBannerImage}
                        />
                      </Row>

                      <Row gap={8} style={glob.horizontalCenter}>
                        <MaterialIcons name="info" size={16} color="#888888" />
                        <Text style={styles.imageInfo}>
                          Pop-Up (600 x 600), Banner (1080 x 400)
                        </Text>
                      </Row>

                      {(errors.adverPopUpImage || errors.adverBannerImage) && (
                        <>
                          {errors.adverPopUpImage &&
                          touched.adverPopUpImage &&
                          errors.adverBannerImage &&
                          touched.adverBannerImage ? (
                            <FormErrorMessage errors="Image is required" />
                          ) : (
                            <>
                              {errors.adverPopUpImage &&
                                touched.adverPopUpImage && (
                                  <FormErrorMessage
                                    errors={errors.adverPopUpImage}
                                  />
                                )}

                              {errors.adverBannerImage &&
                                touched.adverBannerImage && (
                                  <FormErrorMessage
                                    errors={errors.adverBannerImage}
                                  />
                                )}
                            </>
                          )}
                        </>
                      )}
                    </Column>

                    <Input
                      variant="text"
                      label="Title"
                      placeholder="Enter advertisement title"
                      value={values.adverTitle}
                      onSubmitEditing={() => adverDescRef.current?.focus()}
                      onChangeText={handleChange("adverTitle")}
                      returnKeyType="next"
                      ref={adverTitleRef}
                      errors={
                        errors.adverTitle && touched.adverTitle
                          ? errors.adverTitle
                          : ""
                      }
                    />

                    <Input
                      variant="textarea"
                      label="Description"
                      placeholder="Enter advertisement title"
                      value={values.adverDesc}
                      onSubmitEditing={() => adverDescRef.current?.focus()}
                      onChangeText={handleChange("adverDesc")}
                      returnKeyType="next"
                      ref={adverDescRef}
                      maxLength={2000}
                      errors={
                        errors.adverDesc && touched.adverDesc
                          ? errors.adverDesc
                          : ""
                      }
                    />

                    <Row gap={16}>
                      <DateTimeInput
                        label="Start Date"
                        placeholder="Start Date"
                        mode="date"
                        value={
                          values.adverStart
                            ? new Date(values.adverStart)
                            : undefined
                        }
                        onChange={(date) => setFieldValue("adverStart", date)}
                        style={{ flex: 1 }}
                        errors={
                          errors.adverStart && touched.adverStart
                            ? errors.adverStart
                            : ""
                        }
                      />

                      <DateTimeInput
                        label="End Date"
                        placeholder="End Date"
                        mode="date"
                        value={
                          values.adverEnd
                            ? new Date(values.adverEnd)
                            : undefined
                        }
                        onChange={(date) => setFieldValue("adverEnd", date)}
                        style={{ flex: 1 }}
                        errors={
                          errors.adverEnd && touched.adverEnd
                            ? errors.adverEnd
                            : ""
                        }
                      />
                    </Row>

                    <SelectInput
                      items={advertisementData.discountType}
                      label="Discount Type"
                      placeholder="Select discount type"
                      value={values.discountType}
                      onValueChange={(value) => {
                        setFieldValue("discountType", value);
                        if (value === "Percentage") setFieldValue("amount", "");
                        else setFieldValue("percentage", "");
                      }}
                      errors={
                        errors.discountType && touched.discountType
                          ? errors.discountType
                          : ""
                      }
                    />

                    {values.discountType && (
                      <Row gap={16}>
                        {values.discountType === "Percentage" && (
                          <Input
                            label="Percentage"
                            variant="text"
                            placeholder="Percentage"
                            value={String(values.percentage)}
                            keyboardType="numeric"
                            suffix="%"
                            maxLength={3}
                            onChangeText={(value) => {
                              let numericValue = value.replace(/[^0-9]/g, "");

                              if (value !== "") {
                                numericValue = Math.min(
                                  parseInt(numericValue, 10) || 0,
                                  100
                                ).toString();
                              }
                              setFieldValue("percentage", numericValue);
                            }}
                            style={{ flex: 1 }}
                            errors={
                              errors.percentage && touched.percentage
                                ? errors.percentage
                                : ""
                            }
                          />
                        )}

                        {values.discountType === "Fixed Amount" && (
                          <Input
                            label="Amount"
                            variant="text"
                            placeholder="Amount"
                            value={values.amount}
                            keyboardType="numeric"
                            prefix="RM"
                            onChangeText={handleChange("amount")}
                            style={{ flex: 1 }}
                            errors={
                              errors.amount && touched.amount
                                ? errors.amount
                                : ""
                            }
                          />
                        )}

                        <Input
                          variant="text"
                          label="Promo Code"
                          placeholder="Promo Code"
                          value={values.promoCode}
                          onChangeText={handleChange("promoCode")}
                          style={{ flex: 1 }}
                          errors={
                            errors.promoCode && touched.promoCode
                              ? errors.promoCode
                              : ""
                          }
                        />
                      </Row>
                    )}

                    <ToggleSwitch
                      label="Active"
                      value={values.adverStatus}
                      onValueChange={(value) =>
                        setFieldValue("adverStatus", value)
                      }
                    />
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

export default EditAdvertisementScreen;

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 24 : 16,
  },
  imageInfo: {
    fontSize: Platform.OS === "ios" ? getFontSize(10) : getFontSize(12),
    color: "#888888",
  },
});
