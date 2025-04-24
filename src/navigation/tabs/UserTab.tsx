import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  ChatStack,
  HomeStack,
  NearbyCleanerStack,
  ProfileStack,
} from "../stacks";

const User = createBottomTabNavigator();

const UserTab = () => {
  const HIDE_TAB = [
    "Become Cleaner Stack",
    "My Booking Stack",
    "Notification Screen",
    "My Address Stack",
    "Edit Profile Screen",
    "Change Password Screen",
    "Help Center Screen",
    "Chat Room Screen",
    "Advertisement Detail Screen",
    "View All Screen",
    "Cleaner Profile Screen",
    "Service Category Screen",
    "View Service Screen",
    "Booking Request Screen",
    "Booking Request Success Screen",
    "Search Result Screen",
    "Cleaner Rating Screen",
  ];

  return (
    <User.Navigator
      screenOptions={({ route }) => {
        const currentRoute = getFocusedRouteNameFromRoute(route) ?? "";

        return {
          headerShown: false,
          tabBarStyle: HIDE_TAB.includes(currentRoute)
            ? { display: "none" }
            : {},
          tabBarShowLabel: false,
          tabBarItemStyle: { flexDirection: "row", alignItems: "center" },
        };
      }}
    >
      <User.Screen
        name="Home Stack"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <User.Screen
        name="Nearby Cleaner Stack"
        component={NearbyCleanerStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map" size={size} color={color} />
          ),
        }}
      />
      <User.Screen
        name="Chat Stack"
        component={ChatStack}
        initialParams={{ role: "customer" }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="chat" size={size} color={color} />
          ),
        }}
      />
      <User.Screen
        name="Profile Stack"
        component={ProfileStack}
        initialParams={{ role: "customer" }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="account-circle" size={size} color={color} />
          ),
        }}
      />
    </User.Navigator>
  );
};

export default UserTab;
