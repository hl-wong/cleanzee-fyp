import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  EditAddressScreen,
  MyAddressScreen,
  NewAddressScreen,
} from "../../../screens";

const MyAddress = createNativeStackNavigator();

const MyAddressStack = () => {
  return (
    <MyAddress.Navigator screenOptions={{ headerShown: false }}>
      <MyAddress.Screen name="My Address Screen" component={MyAddressScreen} />
      <MyAddress.Screen
        name="New Address Screen"
        component={NewAddressScreen}
      />
      <MyAddress.Screen
        name="Edit Address Screen"
        component={EditAddressScreen}
      />
    </MyAddress.Navigator>
  );
};

export default MyAddressStack;
