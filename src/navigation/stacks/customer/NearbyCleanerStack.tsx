import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ChatRoomScreen,
  NearbyCleanerScreen,
  CleanerProfileScreen,
  ViewAllScreen,
  ViewServiceScreen,
  CleanerRatingScreen,
} from "../../../screens";

const NearbyCleaner = createNativeStackNavigator();

const NearbyCleanerStack = () => {
  return (
    <NearbyCleaner.Navigator screenOptions={{ headerShown: false }}>
      <NearbyCleaner.Screen
        name="Nearby Cleaner Screen"
        component={NearbyCleanerScreen}
      />
      <NearbyCleaner.Screen
        name="Chat Room Screen"
        component={ChatRoomScreen}
      />
      <NearbyCleaner.Screen
        name="Cleaner Profile Screen"
        component={CleanerProfileScreen}
      />
      <NearbyCleaner.Screen
        name="Cleaner Rating Screen"
        component={CleanerRatingScreen}
      />
      <NearbyCleaner.Screen name="View All Screen" component={ViewAllScreen} />
      <NearbyCleaner.Screen
        name="View Service Screen"
        component={ViewServiceScreen}
      />
    </NearbyCleaner.Navigator>
  );
};

export default NearbyCleanerStack;
