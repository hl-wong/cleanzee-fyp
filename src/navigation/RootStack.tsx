import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "../context";
import { AdminStack, AuthStack, IntroStack } from "./stacks";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { UserTab, CleanerTab } from "./tabs";
import { navigationRef } from "../utils";

const Root = createNativeStackNavigator();

interface RootStackProps {
  initialRoute: string;
}

const RootStack: React.FC<RootStackProps> = ({ initialRoute }) => {
  return (
    <ActionSheetProvider>
      <UserProvider>
        <NavigationContainer ref={navigationRef}>
          <Root.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={initialRoute}
          >
            <Root.Screen name="Intro Stack" component={IntroStack} />
            <Root.Screen name="Auth Stack" component={AuthStack} />
            <Root.Screen name="User Tab" component={UserTab} />
            <Root.Screen name="Cleaner Tab" component={CleanerTab} />
            <Root.Screen name="Admin Stack" component={AdminStack} />
          </Root.Navigator>
        </NavigationContainer>
      </UserProvider>
    </ActionSheetProvider>
  );
};

export default RootStack;
