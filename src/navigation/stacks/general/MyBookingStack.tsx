import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  MyBookingScreen,
  BookingDetailScreen,
  RateServiceScreen,
} from "../../../screens";

interface MyBookingStackProps {
  route: any;
}

const MyBooking = createNativeStackNavigator();

const MyBookingStack: React.FC<MyBookingStackProps> = ({ route }) => {
  const { role } = route.params;

  return (
    <MyBooking.Navigator screenOptions={{ headerShown: false }}>
      <MyBooking.Screen
        name="My Booking Screen"
        component={MyBookingScreen}
        initialParams={{ role: role }}
      />
      <MyBooking.Screen
        name="Booking Detail Screen"
        component={BookingDetailScreen}
      />
      <MyBooking.Screen
        name="Rate Service Screen"
        component={RateServiceScreen}
      />
    </MyBooking.Navigator>
  );
};

export default MyBookingStack;
