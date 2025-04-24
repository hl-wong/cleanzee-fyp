import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MyBookingCard } from "../../../components";
import { navigateTo } from "../../../utils";

interface CompletedScreenProps {
  navigation: any;
  bookings: {
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
  }[];
  role: string;
}

const CompletedScreen: React.FC<CompletedScreenProps> = ({
  navigation,
  bookings,
  role,
}) => {
  return (
    <View>
      <FlatList
        data={bookings}
        contentContainerStyle={{ padding: 16, gap: 16 }}
        renderItem={({ item }) => {
          const userProfilePicture =
            role === "customer"
              ? item.cleanerId?.userId?.profilePicture
              : item.userId?.profilePicture;
          // const userName =
          //   role === "customer"
          //     ? `${item.cleanerId?.userId?.firstName} ${item.cleanerId?.userId?.lastName}`
          //     : `${item.userId?.firstName} ${item.userId?.lastName}`;
          const userName =
            role === "customer"
              ? item.cleanerId?.userId?.firstName &&
                item.cleanerId?.userId?.lastName
                ? `${item.cleanerId.userId.firstName} ${item.cleanerId.userId.lastName}`
                : "Anonymous"
              : role === "cleaner"
              ? item.userId?.firstName && item.userId?.lastName
                ? `${item.userId.firstName} ${item.userId.lastName}`
                : "Anonymous"
              : "Anonymous";

          return (
            <MyBookingCard
              userProfilePicture={userProfilePicture}
              userName={userName}
              bookingStatus={item.bookingStatus}
              serviceImage={item.cleanerServiceId?.serviceId?.serviceImage}
              serviceName={item.cleanerServiceId?.serviceName}
              serviceCategory={
                item.cleanerServiceId?.serviceId?.serviceCategory
              }
              onPress={() =>
                navigateTo(
                  navigation,
                  "My Booking Stack",
                  "Booking Detail Screen",
                  { item, role }
                )
              }
            />
          );
        }}
      />
    </View>
  );
};

export default CompletedScreen;

const styles = StyleSheet.create({});
