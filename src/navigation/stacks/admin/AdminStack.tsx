import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AdminDashboardScreen, CleanerApprovalScreen } from "../../../screens";
import ServiceManagementStack from "./ServiceManagementStack";
import AdvertisementStack from "./AdvertisementStack";
import BookingManagementStack from "./BookingManagementStack";

const Admin = createNativeStackNavigator();

const AdminStack = () => {
  return (
    <Admin.Navigator screenOptions={{ headerShown: false }}>
      <Admin.Screen
        name="Admin Dashboard Screen"
        component={AdminDashboardScreen}
      />
      <Admin.Screen
        name="Cleaner Approval Screen"
        component={CleanerApprovalScreen}
      />
      <Admin.Screen
        name="Service Management Stack"
        component={ServiceManagementStack}
      />
      <Admin.Screen
        name="Booking Management Stack"
        component={BookingManagementStack}
      />
      <Admin.Screen name="Advertisement Stack" component={AdvertisementStack} />
    </Admin.Navigator>
  );
};

export default AdminStack;
