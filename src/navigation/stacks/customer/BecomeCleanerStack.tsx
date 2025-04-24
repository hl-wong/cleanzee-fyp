import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  BecomeCleanerScreen,
  CleanerRegistrationFormScreen,
  PendingScreen,
} from "../../../screens";
import MyAddressStack from "./MyAddressStack";

const BecomeCleaner = createNativeStackNavigator();

const BecomeCleanerStack = () => {
  return (
    <BecomeCleaner.Navigator screenOptions={{ headerShown: false }}>
      <BecomeCleaner.Screen
        name="Become Cleaner Screen"
        component={BecomeCleanerScreen}
      />
      <BecomeCleaner.Screen
        name="Cleaner Registration Form Screen"
        component={CleanerRegistrationFormScreen}
      />
      <BecomeCleaner.Screen
        name="My Address Stack"
        component={MyAddressStack}
      />
      <BecomeCleaner.Screen name="Pending Screen" component={PendingScreen} />
    </BecomeCleaner.Navigator>
  );
};

export default BecomeCleanerStack;
