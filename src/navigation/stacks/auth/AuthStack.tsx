import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ForgotPasswordScreen,
  LoginScreen,
  OTPVerificationScreen,
  RegisterScreen,
  ResetPasswordScreen,
  SuccessScreen,
} from "../../../screens";

const Auth = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Auth.Navigator screenOptions={{ headerShown: false }}>
      <Auth.Screen name="Login Screen" component={LoginScreen} />
      <Auth.Screen name="Register Screen" component={RegisterScreen} />
      <Auth.Screen
        name="Forgot Password Screen"
        component={ForgotPasswordScreen}
      />
      <Auth.Screen
        name="Reset Password Screen"
        component={ResetPasswordScreen}
      />
      <Auth.Screen
        name="OTP Verification Screen"
        component={OTPVerificationScreen}
      />
      <Auth.Screen name="Success Screen" component={SuccessScreen} />
    </Auth.Navigator>
  );
};

export default AuthStack;
