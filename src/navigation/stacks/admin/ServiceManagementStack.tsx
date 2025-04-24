import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  EditServiceScreen,
  NewServiceScreen,
  ServiceManagementScreen,
} from "../../../screens";

const ServiceManagement = createNativeStackNavigator();

const ServiceManagementStack = () => {
  return (
    <ServiceManagement.Navigator screenOptions={{ headerShown: false }}>
      <ServiceManagement.Screen
        name="Service Management Screen"
        component={ServiceManagementScreen}
      />
      <ServiceManagement.Screen
        name="New Service Screen"
        component={NewServiceScreen}
      />
      <ServiceManagement.Screen
        name="Edit Service Screen"
        component={EditServiceScreen}
      />
    </ServiceManagement.Navigator>
  );
};

export default ServiceManagementStack;
