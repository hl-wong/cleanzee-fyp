import AsyncStorage from "@react-native-async-storage/async-storage";
import { resetTo } from "./navigationHelper";

export const logout = async (navigation, setUser, setCleaner) => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("user");
  await AsyncStorage.removeItem("role");

  setUser(null);
  setCleaner(null);

  resetTo(navigation, [{ name: "Intro Stack" }, { name: "Auth Stack" }]);
};
