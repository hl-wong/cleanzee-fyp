import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { getCleanerData, getUserData } from "../services";
import { resetTo } from "../utils";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    loadUser();
  }, []);

  const refreshUserData = async () => {
    if (!user?._id) return;

    try {
      const response = await getUserData(user._id);
      if (response.status === 200) {
        setUser(response.data.user);
        await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (e) {
      // console.error("Failed to reload user data:", e);
      throw e;
    }
  };

  const [cleaner, setCleaner] = useState(null);
  useEffect(() => {
    if (user?._id) {
      refreshCleanerData();
    }
  }, [user]);

  const refreshCleanerData = async () => {
    const response = await getCleanerData(user._id);
    if (response.status === 200) {
      setCleaner(response.data.cleaner);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        refreshUserData,
        cleaner,
        setCleaner,
        refreshCleanerData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
