import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  NotificationScreen,
  ProfileScreen,
  HelpCenterScreen,
  ChangePasswordScreen,
  EditProfileScreen,
  MyBalanceScreen,
  RatingAndReviewScreen,
  SetAvailabilityScreen,
} from "../../../screens";
import { BecomeCleanerStack, MyAddressStack } from "../customer";
import { BrowseServiceStack, MyServiceStack } from "../cleaner";
import MyBookingStack from "./MyBookingStack";
// import MyBookingStack from "./MyBookingStack";

interface ProfileStackProps {
  route: any;
}

const Profile = createNativeStackNavigator();

const ProfileStack: React.FC<ProfileStackProps> = ({ route }) => {
  const { role } = route.params;

  return (
    <Profile.Navigator screenOptions={{ headerShown: false }}>
      <Profile.Screen
        name="Profile Screen"
        component={ProfileScreen}
        initialParams={{ role: role }}
      />
      <Profile.Screen
        name="My Booking Stack"
        component={MyBookingStack}
        initialParams={{ role: role }}
      />
      <Profile.Screen
        name="Notification Screen"
        component={NotificationScreen}
      />
      {role === "customer" && (
        <>
          <Profile.Screen
            name="Become Cleaner Stack"
            component={BecomeCleanerStack}
          />
          <Profile.Screen name="My Address Stack" component={MyAddressStack} />
        </>
      )}
      {role === "cleaner" && (
        <>
          <Profile.Screen name="My Service Stack" component={MyServiceStack} />
          <Profile.Screen
            name="Browse Service Stack"
            component={BrowseServiceStack}
          />
          <Profile.Screen
            name="Set Availability Screen"
            component={SetAvailabilityScreen}
          />
          <Profile.Screen
            name="My Balance Screen"
            component={MyBalanceScreen}
          />
          <Profile.Screen
            name="Rating And Review Screen"
            component={RatingAndReviewScreen}
          />
        </>
      )}
      <Profile.Screen
        name="Edit Profile Screen"
        component={EditProfileScreen}
      />
      <Profile.Screen
        name="Change Password Screen"
        component={ChangePasswordScreen}
      />
      <Profile.Screen name="Help Center Screen" component={HelpCenterScreen} />
    </Profile.Navigator>
  );
};

export default ProfileStack;
