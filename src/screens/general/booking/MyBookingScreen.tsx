import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React, { useCallback, useContext, useState } from "react";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { UserContext } from "../../../context";
import { Route, TabBar, TabView } from "react-native-tab-view";
import OngoingScreen from "./OngoingScreen";
import CompletedScreen from "./CompletedScreen";
import CancelledScreen from "./CancelledScreen";
import { Layout } from "../../../layouts";
import { goBack } from "../../../utils";
import { Content } from "../../../components";
import { theme } from "../../../assets/styles";
import { getBookings } from "../../../services";

interface MyBookingScreenProps {
  navigation: any;
}

const MyBookingScreen: React.FC<MyBookingScreenProps> = ({ navigation }) => {
  const route = useRoute();
  const { role } = route.params as { role: string };
  const { user, cleaner } = useContext(UserContext);
  const id = role === "customer" ? user?._id : cleaner?._id;

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "ongoing", title: "Ongoing" },
    { key: "completed", title: "Completed" },
    { key: "cancelled", title: "Cancelled" },
  ]);

  const renderScene = ({ route }: { route: Route }) => {
    switch (route.key) {
      case "ongoing":
        return (
          <OngoingScreen
            navigation={navigation}
            bookings={ongoingBookings}
            role={role}
          />
        );
      case "completed":
        return (
          <CompletedScreen
            navigation={navigation}
            bookings={completedBookings}
            role={role}
          />
        );
      case "cancelled":
        return (
          <CancelledScreen
            navigation={navigation}
            bookings={cancelledBookings}
            role={role}
          />
        );
    }
  };

  const layout = useWindowDimensions();

  const [bookings, setBookings] = useState<
    | {
        _id: string;
        userId: {
          firstName: string;
          lastName: string;
          profilePicture: string;
        };
        cleanerId: {
          userId: {
            firstName: string;
            lastName: string;
            profilePicture: string;
          };
        };
        cleanerServiceId: {
          serviceName: string;
          servicePrice: string;
          serviceId: {
            serviceImage: string;
            serviceCategory: string;
          };
        };
        bookingStatus: string;
        currentStatus: string;
      }[]
    | null
  >([]);
  useFocusEffect(
    useCallback(() => {
      const fetchBookings = async () => {
        const response = await getBookings(id, role);
        if (response.status === 200) {
          setBookings(response.data);
        }
      };

      fetchBookings();
    }, [id, role])
  );

  const ongoingBookings = (bookings ?? []).filter((b) =>
    ["Response", "Deposit", "In Progress"].includes(b.bookingStatus)
  );
  const completedBookings = (bookings ?? []).filter((b) =>
    ["Completed", "Rate"].includes(b.bookingStatus)
  );
  const cancelledBookings = (bookings ?? []).filter((b) =>
    ["Rejected", "Cancelled"].includes(b.bookingStatus)
  );

  return (
    <Layout headerTitle="My Bookings" onBack={() => goBack(navigation)}>
      <Content bgColor="default">
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              scrollEnabled={true}
              style={{ backgroundColor: theme.color.primary }}
              indicatorStyle={styles.indicator}
            />
          )}
          initialLayout={{ width: layout.width }}
        />
      </Content>
    </Layout>
  );
};

export default MyBookingScreen;

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: theme.color.secondary,
    height: 3,
  },
});
