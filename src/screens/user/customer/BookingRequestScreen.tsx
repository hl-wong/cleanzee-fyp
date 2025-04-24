import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import moment from "moment";
import { Layout } from "../../../layouts";
import { getFontSize, goBack, navigateTo } from "../../../utils";
import {
  AddressInput,
  Button,
  Column,
  Content,
  Footer,
  FormErrorMessage,
  IconButton,
  Input,
  MonthSelector,
  Row,
  TimeSlotPicker,
} from "../../../components";
import { Formik, FormikProps } from "formik";
import { UserContext } from "../../../context";
import { glob, theme } from "../../../assets/styles";
import { requestBooking, validatePromoCode } from "../../../services";
import { bookingRequestSchema } from "../../../validations";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

interface BookingRequestScreenProps {
  navigation: any;
  route: any;
}

const BookingRequestScreen: React.FC<BookingRequestScreenProps> = ({
  navigation,
  route,
}) => {
  const { item } = route.params;

  const [selectedMonth, setSelectedMonth] = useState(moment());
  const formikRef = useRef<FormikProps<{
    address: string;
    date: string;
    time: string;
    promoCode: string;
  }> | null>(null);
  const handleSubmit = () => {
    if (formikRef.current) {
      formikRef.current.submitForm();
    }
  };

  const { user } = useContext(UserContext);
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
    address: defaultAddress
      ? `${defaultAddress.street}, ${defaultAddress.postcode} ${defaultAddress.city}, ${defaultAddress.state}`
      : "",
    date: "",
    time: "",
    promoCode: "",
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

  const [promo, setPromo] = useState<{
    discountType?: string;
    percentage?: number;
    amount?: string;
    success: string;
    errors: string;
  } | null>(null);

  const total =
    promo?.discountType === "Percentage"
      ? (
          item.servicePrice -
          item.servicePrice * ((promo.percentage ?? 0) / 100)
        ).toFixed(2)
      : promo?.discountType === "Fixed Amount"
      ? item.servicePrice - parseFloat(promo.amount ?? "0")
      : item.servicePrice;

  return (
    <Layout headerTitle="Booking Request" onBack={() => goBack(navigation)}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={glob.container}
      >
        <Content bgColor="white" style={{ paddingBottom: 16 }}>
          <ScrollView contentContainerStyle={styles.scroll}>
            <FlatList
              data={[{}]}
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
              renderItem={() => {
                return (
                  <Formik
                    initialValues={initialValues}
                    onSubmit={async (values) => {
                      console.log(values);

                      const bookingData = {
                        userId: user._id,
                        cleanerId: item.cleanerId._id,
                        cleanerServiceId: item._id,
                        address: {
                          fullName: defaultAddress.fullName,
                          phoneNo: defaultAddress.phoneNo,
                          street: defaultAddress.street,
                          city: defaultAddress.city,
                          postcode: defaultAddress.postcode,
                          state: defaultAddress.state,
                        },
                        date: values.date,
                        time: values.time,
                        total: total,
                        bookingStatus: "Response",
                        currentStatus: "Response",
                        promoCode: values.promoCode,
                        ...(promo?.discountType && {
                          discountType: promo.discountType,
                          ...(promo?.percentage && {
                            percentage: promo.percentage,
                          }),
                          ...(promo?.amount && { amount: promo.amount }),
                          subtotal: item.servicePrice,
                        }),
                        fee: (parseFloat(total) * 0.06).toFixed(2),
                        isRated: false,
                        isReleased: false,
                      };

                      const response = await requestBooking(bookingData);
                      if (response.status === 200) {
                        navigateTo(
                          navigation,
                          "Home Stack",
                          "Booking Request Success Screen",
                          { item, bookingData }
                        );
                      }
                    }}
                    innerRef={formikRef}
                    validationSchema={bookingRequestSchema}
                  >
                    {({
                      setFieldValue,
                      values,
                      errors,
                      touched,
                      handleChange,
                    }) => {
                      const handleValidatePromo = async () => {
                        try {
                          const response = await validatePromoCode(
                            user._id,
                            values.promoCode
                          );
                          if (response.status === 200) {
                            if (response.data.discountType === "Percentage") {
                              setPromo({
                                discountType: response.data.discountType,
                                percentage: response.data.percentage,
                                success: response.data.message,
                                errors: "",
                              });
                            }

                            if (response.data.discountType === "Fixed Amount") {
                              setPromo({
                                discountType: response.data.discountType,
                                amount: response.data.amount,
                                success: response.data.message,
                                errors: "",
                              });
                            }
                          }
                        } catch (e: any) {
                          setPromo({
                            discountType: "",
                            percentage: 0,
                            amount: "",
                            success: "",
                            errors: e.error,
                          });
                        }
                      };

                      return (
                        <View>
                          <Column gap={16}>
                            <MonthSelector
                              selectedMonth={selectedMonth}
                              setSelectedMonth={setSelectedMonth}
                              selectedDate={values.date}
                              setSelectedDate={(date) =>
                                setFieldValue("date", date)
                              }
                              errors={
                                errors.date && touched.date
                                  ? String(errors.date)
                                  : ""
                              }
                            />

                            {values.date &&
                              (item.timeslots[values.date]?.length > 0 ? (
                                <TimeSlotPicker
                                  timeSlots={item.timeslots[values.date]}
                                  selectedTime={values.time}
                                  onSelectTime={(value) =>
                                    setFieldValue("time", value)
                                  }
                                  errors={
                                    errors.time && touched.time
                                      ? errors.time
                                      : ""
                                  }
                                />
                              ) : (
                                <View style={glob.center}>
                                  <Text style={glob.noData}>
                                    No timeslots available
                                  </Text>
                                </View>
                              ))}

                            <AddressInput
                              value={values.address}
                              onPress={() =>
                                navigateTo(
                                  navigation,
                                  "Home Stack",
                                  "My Address Stack"
                                )
                              }
                            />

                            <Column gap={8}>
                              <Row gap={16} style={{ alignItems: "flex-end" }}>
                                <Input
                                  variant="text"
                                  label="Promo Code"
                                  placeholder="Promo Code"
                                  value={values.promoCode}
                                  onChangeText={handleChange("promoCode")}
                                  returnKeyType="done"
                                  onSubmitEditing={handleValidatePromo}
                                  style={{ flex: 1 }}
                                />
                                <IconButton
                                  variant="rounded"
                                  size="md"
                                  name="check"
                                  iconColor={theme.color.white}
                                  onPress={handleValidatePromo}
                                  style={{ height: 48, width: 48 }}
                                />
                              </Row>
                              {promo && (
                                <>
                                  {promo.success && (
                                    <Row gap={8} style={glob.horizontalCenter}>
                                      <MaterialIcons
                                        name="check-circle"
                                        size={16}
                                        color={theme.color.success}
                                      />
                                      <Text style={styles.success}>
                                        {promo.success}
                                      </Text>
                                    </Row>
                                  )}

                                  {promo.errors && (
                                    <FormErrorMessage errors={promo.errors} />
                                  )}
                                </>
                              )}
                            </Column>
                          </Column>
                        </View>
                      );
                    }}
                  </Formik>
                );
              }}
            />
          </ScrollView>
        </Content>

        <Footer>
          <Column gap={16}>
            {promo && promo.discountType ? (
              <>
                <Row style={[glob.horizontalCenter, glob.spaceBetween]}>
                  <Text style={styles.label}>Subtotal</Text>
                  <Text style={styles.label}>{`RM${item.servicePrice}`}</Text>
                </Row>

                <Row style={[glob.horizontalCenter, glob.spaceBetween]}>
                  <Text style={styles.label}>Promo Applied</Text>
                  {promo.discountType === "Percentage" && (
                    <Text style={styles.label}>{`-${promo.percentage}%`}</Text>
                  )}
                  {promo.discountType === "Fixed Amount" && (
                    <Text style={styles.label}>{`${promo.amount}%`}</Text>
                  )}
                </Row>

                <Row style={[glob.horizontalCenter, glob.spaceBetween]}>
                  <Text style={styles.label}>Total</Text>
                  <Text style={styles.label}>{`RM${total}`}</Text>
                </Row>
              </>
            ) : (
              <Row style={[glob.horizontalCenter, glob.spaceBetween]}>
                <Text style={styles.label}>Total</Text>
                <Text style={styles.label}>{`RM${total}`}</Text>
              </Row>
            )}
            <Button
              variant="primary"
              size={Platform.OS === "ios" ? "lg" : "md"}
              label="Request"
              onPress={handleSubmit}
            />
          </Column>
        </Footer>
      </KeyboardAvoidingView>
    </Layout>
  );
};

export default BookingRequestScreen;

const styles = StyleSheet.create({
  scroll: {
    padding: 16,
  },
  label: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 500,
  },
  success: {
    fontSize: getFontSize(12),
    color: theme.color.success,
  },
});
