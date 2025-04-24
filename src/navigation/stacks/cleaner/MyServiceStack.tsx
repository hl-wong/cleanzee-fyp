import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyServiceScreen, PricingAndTimeSlotScreen } from "../../../screens";

const MyService = createNativeStackNavigator();

const MyServiceStack = () => {
  return (
    <MyService.Navigator screenOptions={{ headerShown: false }}>
      <MyService.Screen name="My Service Screen" component={MyServiceScreen} />
      <MyService.Screen
        name="Pricing And Time Slot Screen"
        component={PricingAndTimeSlotScreen}
      />
    </MyService.Navigator>
  );
};

export default MyServiceStack;
