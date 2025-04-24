import {
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { Layout } from "../../../layouts";
import {
  goBack,
  handleAccept,
  handleCancel,
  handleComplete,
  handleCompleteReview,
  handlePay,
  handleReject,
  handleReleasePayment,
  navigateTo,
} from "../../../utils";
import {
  BookingDetailCard,
  BookingSummary,
  Button,
  Column,
  Content,
  Footer,
  ProgressStep,
  Row,
} from "../../../components";
import { UserContext } from "../../../context";
import { glob, theme } from "../../../assets/styles";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { qrCode } from "../../../assets/images";

interface BookingDetailScreenProps {
  navigation: any;
  route: any;
}

const BookingDetailScreen: React.FC<BookingDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const { item, role } = route.params;
  const { user, cleaner } = useContext(UserContext);
  const id = role === "customer" ? user?._id : cleaner?._id;

  const stepLabels = ["Response", "Deposit", "In Progress", "Completed"];
  const stepIndexMap: Record<string, number> = {
    Response: 0,
    Deposit: 1,
    "In Progress": 2,
    Completed: 3,
  };

  const currentStep =
    !item.bookingStatus || item.bookingStatus === "Completed"
      ? 4
      : stepIndexMap[item.bookingStatus] ?? 4;

  const [visible, setVisible] = useState(false);
  const showDialog = () => {
    setVisible(!visible);
  };

  let statusMessage = "";
  if (item?.bookingStatus === "Response") {
    statusMessage =
      role === "customer" || role === "admin"
        ? "Awaiting cleaner response"
        : role === "cleaner"
        ? "Awaiting your response"
        : "";
  }

  if (item?.bookingStatus === "Deposit") {
    if (item?.currentStatus === "Deposit") {
      statusMessage =
        role === "customer"
          ? "Please pay the deposit"
          : role === "cleaner" || role === "admin"
          ? "Awaiting customer deposit"
          : "";
    }

    if (item?.currentStatus === "Admin Review") {
      statusMessage =
        role === "admin"
          ? "Awaiting your payment review"
          : role === "customer" || role === "cleaner"
          ? "Awaiting admin payment review"
          : "";
    }
  }

  if (item?.bookingStatus === "In Progress") {
    if (item?.currentStatus === "In Progress") {
      role === "cleaner"
        ? "Proceed to customer location"
        : role === "customer" || role === "admin"
        ? "Service is in progress"
        : "";
    }

    if (item?.currentStatus === "Admin Review") {
      statusMessage =
        role === "admin"
          ? "Awaiting your payment review"
          : role === "customer" || role === "cleaner"
          ? "Awaiting admin payment review"
          : "";
    }
  }

  if (item?.bookingStatus === "Completed") {
    if (role === "customer" && item?.isRated === false) {
      statusMessage = "Please rate the cleaner and service";
    } else if (role === "cleaner" && item?.isReleased === false) {
      statusMessage = "Awaiting admin release payment";
    } else if (role === "admin" && item?.isReleased === false) {
      statusMessage = "Cleaner awaiting your payment release";
    } else {
      statusMessage = "Service is completed";
    }
  }

  if (item?.bookingStatus === "Cancelled") {
    statusMessage = "Service has been cancelled";
  }

  if (item?.bookingStatus === "Rejected") {
    statusMessage = "Service has been rejected by cleaner";
  }

  return (
    <>
      <Layout headerTitle="Booking Detail" onBack={() => goBack(navigation)}>
        <Content bgColor="default">
          <ScrollView>
            <View style={styles.progressWrapper}>
              <ProgressStep labels={stepLabels} currentStep={currentStep} />
            </View>
            <View style={{ padding: 16 }}>
              <BookingDetailCard
                statusMessage={statusMessage}
                serviceImage={item.cleanerServiceId?.serviceId?.serviceImage}
                serviceName={item.cleanerServiceId?.serviceName}
                serviceCategory={item.cleanerServiceId?.serviceCategory}
                servicePrice={item.cleanerServiceId?.servicePrice}
                address={item?.address}
              />
            </View>
          </ScrollView>
        </Content>
        <Footer>
          <Column
            gap={16}
            style={{ paddingBottom: Platform.OS === "ios" ? 8 : 0 }}
          >
            <BookingSummary
              total={item?.total}
              fee={item?.fee}
              remainingBalance={item.remainingBalance}
              role={role}
            />
            {role === "customer" &&
              item.bookingStatus === "Response" &&
              item.currentStatus === "Response" && (
                <Button
                  variant="primary"
                  size={Platform.OS === "ios" ? "lg" : "md"}
                  label="Cancel Booking"
                  onPress={() =>
                    handleCancel(navigation, item._id, item.cleanerId._id)
                  }
                />
              )}

            {role === "customer" &&
              item.bookingStatus === "Deposit" &&
              item.currentStatus === "Deposit" && (
                <Button
                  variant="primary"
                  size={Platform.OS === "ios" ? "lg" : "md"}
                  label="Pay Deposit"
                  onPress={showDialog}
                />
              )}

            {role === "customer" &&
              item.bookingStatus === "In Progress" &&
              item.currentStatus === "Balance" && (
                <Button
                  variant="primary"
                  size={Platform.OS === "ios" ? "lg" : "md"}
                  label="Pay Balance"
                  onPress={showDialog}
                />
              )}

            {role === "customer" &&
              item.bookingStatus === "Completed" &&
              item.isRated === false && (
                <Button
                  variant="primary"
                  size={Platform.OS === "ios" ? "lg" : "md"}
                  label="Rate Service"
                  onPress={() =>
                    navigateTo(
                      navigation,
                      "My Booking Stack",
                      "Rate Service Screen",
                      {
                        cleanerId: item.cleanerId._id,
                        serviceId: item.cleanerServiceId._id,
                        bookingId: item._id,
                      }
                    )
                  }
                />
              )}

            {role === "cleaner" &&
              item.bookingStatus === "Response" &&
              item.currentStatus === "Response" && (
                <Row gap={16}>
                  <Button
                    variant="secondary"
                    size={Platform.OS === "ios" ? "lg" : "md"}
                    label="Reject Booking"
                    onPress={() =>
                      handleReject(navigation, item._id, item.userId._id)
                    }
                    style={{ flex: 1 }}
                  />
                  <Button
                    variant="primary"
                    size={Platform.OS === "ios" ? "lg" : "md"}
                    label="Accept Booking"
                    onPress={() =>
                      handleAccept(navigation, item._id, item.userId._id)
                    }
                    style={{ flex: 1 }}
                  />
                </Row>
              )}

            {role === "cleaner" &&
              item.bookingStatus === "In Progress" &&
              item.currentStatus === "In Progress" && (
                <Button
                  variant="primary"
                  size={Platform.OS === "ios" ? "lg" : "md"}
                  label="Complete Service"
                  onPress={() =>
                    handleComplete(navigation, item._id, item.userId._id)
                  }
                />
              )}

            {role === "admin" &&
              (item.bookingStatus === "Deposit" ||
                item.bookingStatus === "In Progress") &&
              item.currentStatus === "Admin Review" && (
                <Button
                  variant="primary"
                  size={Platform.OS === "ios" ? "lg" : "md"}
                  label="Complete Review"
                  onPress={() => handleCompleteReview(navigation, item._id)}
                />
              )}

            {role === "admin" &&
              item.bookingStatus === "Completed" &&
              item.isReleased === false && (
                <Button
                  variant="primary"
                  size={Platform.OS === "ios" ? "lg" : "md"}
                  label="Release Payment"
                  onPress={() =>
                    handleReleasePayment(
                      navigation,
                      item._id,
                      item.userId._id,
                      item.cleanerId._id
                    )
                  }
                />
              )}
          </Column>
        </Footer>
      </Layout>

      <Modal transparent animationType="fade" visible={visible}>
        <View style={[styles.overlay, glob.center]}>
          <View style={styles.dialog}>
            <View
              style={{
                padding: 16,
                borderBottomWidth: 1,
                borderColor: "#eee",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ alignSelf: "flex-end" }}
                onPress={showDialog}
              >
                <MaterialIcons name="close" size={34} color="#333333" />
              </TouchableOpacity>
            </View>

            <Column gap={8} style={styles.dialogContent}>
              <Image source={qrCode} style={styles.qrCode} />
              <Row gap={16}>
                <Button
                  variant="secondary"
                  size={Platform.OS === "ios" ? "lg" : "md"}
                  label="Close"
                  onPress={showDialog}
                  style={{ flex: 1 }}
                />
                <Button
                  variant="primary"
                  size={Platform.OS === "ios" ? "lg" : "md"}
                  label="Pay"
                  onPress={() => {
                    handlePay(
                      navigation,
                      item._id,
                      item.cleanerId._id,
                      item.currentStatus
                    );
                    showDialog();
                  }}
                  style={{ flex: 1 }}
                />
              </Row>
            </Column>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default BookingDetailScreen;

const styles = StyleSheet.create({
  progressWrapper: {
    backgroundColor: theme.color.white,
    borderRadius: 8,
    shadowColor: theme.color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dialog: {
    width: wp("90%"),
    backgroundColor: theme.color.white,
    borderRadius: 10,
  },
  dialogContent: {
    padding: 16,
  },
  qrCode: {
    width: "100%",
    height: wp("90%"),
    resizeMode: "contain",
  },
});
