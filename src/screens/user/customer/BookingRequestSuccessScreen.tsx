import { Image, Platform, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { glob, theme } from "../../../assets/styles";
import { Button, Column, Content } from "../../../components";
import { success } from "../../../assets/images";
import { generateBookingInvoice, getFontSize, resetTo } from "../../../utils";
import { UserContext } from "../../../context";
import * as Sharing from "expo-sharing";

interface BookingRequestSuccessScreenProps {
  navigation: any;
  route: any;
}

const BookingRequestSuccessScreen: React.FC<
  BookingRequestSuccessScreenProps
> = ({ navigation, route }) => {
  const { item, bookingData } = route.params;

  const { user } = useContext(UserContext);
  const userName = `${user.firstName} ${user.lastName}`;
  const cleanerName = `${item.cleanerId?.userId?.firstName} ${item.cleanerId?.userId?.lastName}`;

  const handleDownloadInvoice = async () => {
    const bookingDetails = {
      service: item.serviceName,
      cleaner: cleanerName,
      customer: userName,
      price: bookingData.total,
      date: new Date().toLocaleDateString(),
      bookingStatus: item.bookingStatus,
    };

    try {
      const uri = await generateBookingInvoice(bookingDetails);

      if (!uri) {
        alert("Failed to generate invoice.");
        return;
      }

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        alert("Sharing is not available on this device.");
      }
    } catch (error) {
      console.error("Error downloading invoice:", error);
    }
  };

  return (
    <SafeAreaView style={[glob.layout, { backgroundColor: theme.color.white }]}>
      <StatusBar style="dark" />
      <Content bgColor="white" style={[{ padding: 16 }, glob.center]}>
        <Image source={success} style={styles.image} />
        <Column gap={32}>
          <Column gap={16}>
            <Text style={[glob.title, glob.textCenter]}>Request Submitted</Text>
            <Text style={[glob.desc, glob.textCenter]}>
              Your booking request has been sent. Please wait for the cleaner to
              accept or decline.
            </Text>
          </Column>

          <Column gap={8}>
            <Button
              variant="primary"
              size={Platform.OS === "ios" ? "lg" : "md"}
              label="Back to Home"
              onPress={() => resetTo(navigation, "Home Screen")}
            />
            <Button
              variant="tertiary"
              size={Platform.OS === "ios" ? "lg" : "md"}
              label="Download Invoice"
              onPress={handleDownloadInvoice}
            />
          </Column>
        </Column>
      </Content>
    </SafeAreaView>
  );
};

export default BookingRequestSuccessScreen;

const styles = StyleSheet.create({
  image: {
    width: responsiveWidth(40),
    height: responsiveHeight(30),
    resizeMode: "contain",
  },
  title: {
    fontSize: getFontSize(24),
    fontWeight: 700,
    textAlign: "center",
  },
});
