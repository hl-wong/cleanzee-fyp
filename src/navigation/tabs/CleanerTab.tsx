import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ChatStack, CleanerDashboardStack, ProfileStack } from "../stacks";

const Cleaner = createBottomTabNavigator();

const CleanerTab = () => {
  const HIDE_TAB = [
    "My Booking Stack",
    "Chat Stack",
    "Notification Screen",
    "Set Availability Screen",
    "My Balance Screen",
    "Rating And Review Screen",
    "Edit Profile Screen",
    "Change Password Screen",
    "Help Center Screen",
    "Service Detail Screen",
    "My Service Stack",
    "Chat Room Screen",
    "Pricing And Time Slot Screen",
    "Browse Service Stack",
  ];

  return (
    <Cleaner.Navigator
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
      <Cleaner.Screen
        name="Cleaner Dashboard Stack"
        component={CleanerDashboardStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" size={size} color={color} />
          ),
        }}
      />
      <Cleaner.Screen
        name="Chat Stack"
        component={ChatStack}
        initialParams={{ role: "cleaner" }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="chat" size={size} color={color} />
          ),
        }}
      />
      <Cleaner.Screen
        name="Profile Stack"
        component={ProfileStack}
        initialParams={{ role: "cleaner" }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="account-circle" size={size} color={color} />
          ),
        }}
      />
    </Cleaner.Navigator>
  );
};

export default CleanerTab;
