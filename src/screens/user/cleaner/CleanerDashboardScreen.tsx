import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AvailabilityCard,
  BookingStatusCard,
  Column,
  Content,
} from "../../../components";
import { StatusBar } from "expo-status-bar";
import { glob, theme } from "../../../assets/styles";
import { UserContext } from "../../../context";
import { navigateTo } from "../../../utils";
import { getBookingStatus } from "../../../services";

interface CleanerDashboardScreenProps {
  navigation: any;
}

const CleanerDashboardScreen: React.FC<CleanerDashboardScreenProps> = ({
  navigation,
}) => {
  const { cleaner } = useContext(UserContext);

  const [bookingStatus, setBookingStatus] = useState({
    requested: [],
    ongoing: [],
    completed: [],
  });
  useEffect(() => {
    const fetchBookingStatus = async () => {
      const response = await getBookingStatus(cleaner._id);
      if (response.status === 200) {
        setBookingStatus(response.data);
      }
    };

    fetchBookingStatus();
  }, [cleaner]);

  return (
    <SafeAreaView edges={["top"]} style={glob.layout}>
      <StatusBar style="dark" />
      <Content bgColor="default">
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <Column gap={16}>
            <BookingStatusCard
              status={[
                { label: "Requested", count: bookingStatus.requested.length },
                { label: "Ongoing", count: bookingStatus.ongoing.length },
                { label: "Completed", count: bookingStatus.completed.length },
              ]}
            />
            <AvailabilityCard
              onEdit={() =>
                navigateTo(
                  navigation,
                  "Cleaner Dashboard Stack",
                  "Set Availability Screen"
                )
              }
            />
          </Column>
        </ScrollView>
      </Content>
    </SafeAreaView>
  );
};

export default CleanerDashboardScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.color.white,
    padding: 16,
    borderRadius: 12,
    shadowColor: theme.color.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
});
