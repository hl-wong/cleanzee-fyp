import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Layout } from "../../../layouts";
import { goBack, navigateTo } from "../../../utils";
import { AdminBookingCard, Content } from "../../../components";
import { getBookingsByAdmin } from "../../../services";

interface BookingManagementScreenProps {
  navigation: any;
}

const BookingManagementScreen: React.FC<BookingManagementScreenProps> = ({
  navigation,
}) => {
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
        createdAt: string;
      }[]
    | null
  >([]);
  useEffect(() => {
    const fetchBookings = async () => {
      const response = await getBookingsByAdmin();
      if (response.status === 200) {
        setBookings(response.data);
      }
    };
    fetchBookings();
  }, []);

  return (
    <Layout headerTitle="Booking Management" onBack={() => goBack(navigation)}>
      <Content bgColor="default">
        <FlatList
          data={bookings}
          contentContainerStyle={{ padding: 16, gap: 16 }}
          renderItem={({ item }) => {
            const userName =
              item.userId?.firstName && item.userId?.lastName
                ? `${item.userId?.firstName} ${item.userId?.lastName}`
                : "Anonymous";
            const cleanerName = `${item.cleanerId?.userId?.firstName} ${item.cleanerId?.userId?.lastName}`;

            return (
              <AdminBookingCard
                bookingStatus={item.bookingStatus}
                serviceImage={item.cleanerServiceId?.serviceId?.serviceImage}
                serviceName={item.cleanerServiceId?.serviceName}
                serviceCategory={
                  item.cleanerServiceId?.serviceId?.serviceCategory
                }
                userName={userName}
                cleanerName={cleanerName}
                createdAt={item.createdAt}
                onPress={() =>
                  navigateTo(
                    navigation,
                    "Booking Management Stack",
                    "Booking Detail Screen",
                    { item, role: "admin" }
                  )
                }
              />
            );
          }}
        />
      </Content>
    </Layout>
  );
};

export default BookingManagementScreen;

const styles = StyleSheet.create({});
