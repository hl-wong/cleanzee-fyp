import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BookingManagementScreen } from "../../../screens";

const BookingManagement = createNativeStackNavigator();

const BookingManagementStack = () => {
  return (
    <BookingManagement.Navigator screenOptions={{ headerShown: false }}>
      <BookingManagement.Screen
        name="Booking Management Screen"
        component={BookingManagementScreen}
      />
      {/* <BookingManagement.Screen
        name="Booking Detail Screen"
        component={BookingDetailScreen}
      /> */}
    </BookingManagement.Navigator>
  );
};

export default BookingManagementStack;
