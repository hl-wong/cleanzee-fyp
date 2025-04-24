import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OnboardingScreen } from "../../../screens";

const Intro = createNativeStackNavigator();

const IntroStack = () => {
  return (
    <Intro.Navigator screenOptions={{ headerShown: false }}>
      <Intro.Screen name="Onboarding Screen" component={OnboardingScreen} />
    </Intro.Navigator>
  );
};

export default IntroStack;
