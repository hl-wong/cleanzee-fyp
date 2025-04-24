import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  BrowseServiceScreen,
  PricingAndTimeSlotScreen,
  ServiceDetailScreen,
} from "../../../screens";

const BrowseService = createNativeStackNavigator();

const BrowseServiceStack = () => {
  return (
    <BrowseService.Navigator screenOptions={{ headerShown: false }}>
      <BrowseService.Screen
        name="Browse Service Screen"
        component={BrowseServiceScreen}
      />
      <BrowseService.Screen
        name="Service Detail Screen"
        component={ServiceDetailScreen}
      />
      <BrowseService.Screen
        name="Pricing And Time Slot Screen"
        component={PricingAndTimeSlotScreen}
      />
    </BrowseService.Navigator>
  );
};

export default BrowseServiceStack;
