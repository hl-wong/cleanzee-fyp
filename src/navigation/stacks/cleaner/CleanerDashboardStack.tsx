import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  CleanerDashboardScreen,
  SetAvailabilityScreen,
} from "../../../screens";

const CleanerDashboard = createNativeStackNavigator();

const CleanerDashboardStack = () => {
  return (
    <CleanerDashboard.Navigator screenOptions={{ headerShown: false }}>
      <CleanerDashboard.Screen
        name="Cleaner Dashboard Screen"
        component={CleanerDashboardScreen}
      />
      <CleanerDashboard.Screen
        name="Set Availability Screen"
        component={SetAvailabilityScreen}
      />
    </CleanerDashboard.Navigator>
  );
};

export default CleanerDashboardStack;
