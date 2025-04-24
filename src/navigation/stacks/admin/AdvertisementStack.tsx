import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  AdvertisementScreen,
  EditAdvertisementScreen,
  NewAdvertisementScreen,
} from "../../../screens";

const Advertisement = createNativeStackNavigator();

const AdvertisementStack = () => {
  return (
    <Advertisement.Navigator screenOptions={{ headerShown: false }}>
      <Advertisement.Screen
        name="Advertisement Screen"
        component={AdvertisementScreen}
      />
      <Advertisement.Screen
        name="New Advertisement Screen"
        component={NewAdvertisementScreen}
      />
      <Advertisement.Screen
        name="Edit Advertisement Screen"
        component={EditAdvertisementScreen}
      />
    </Advertisement.Navigator>
  );
};

export default AdvertisementStack;
