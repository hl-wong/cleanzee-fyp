import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  AdvertisementDetailScreen,
  ChatRoomScreen,
  HomeScreen,
  NotificationScreen,
  SearchResultScreen,
  ViewAllScreen,
  ServiceCategoryScreen,
  ViewServiceScreen,
  BookingRequestScreen,
  BookingRequestSuccessScreen,
} from "../../../screens";
import MyAddressStack from "./MyAddressStack";

const Home = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Home.Navigator screenOptions={{ headerShown: false }}>
      <Home.Screen name="Home Screen" component={HomeScreen} />
      <Home.Screen name="Search Result Screen" component={SearchResultScreen} />
      <Home.Screen name="Notification Screen" component={NotificationScreen} />
      <Home.Screen
        name="Advertisement Detail Screen"
        component={AdvertisementDetailScreen}
      />
      <Home.Screen name="View All Screen" component={ViewAllScreen} />
      <Home.Screen
        name="Service Category Screen"
        component={ServiceCategoryScreen}
      />
      <Home.Screen name="View Service Screen" component={ViewServiceScreen} />
      <Home.Screen name="Chat Room Screen" component={ChatRoomScreen} />
      <Home.Screen
        name="Booking Request Screen"
        component={BookingRequestScreen}
      />
      <Home.Screen name="My Address Stack" component={MyAddressStack} />
      <Home.Screen
        name="Booking Request Success Screen"
        component={BookingRequestSuccessScreen}
      />
    </Home.Navigator>
  );
};

export default HomeStack;
