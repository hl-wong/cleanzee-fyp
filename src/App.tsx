import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import RootStack from "./navigation/RootStack";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { glob } from "./assets/styles";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState("Intro Stack");

  useEffect(() => {
    const checkAuthAndRole = async () => {
      const token = await AsyncStorage.getItem("token");
      const role = await AsyncStorage.getItem("role");

      if (token) {
        if (role === "User") setInitialRoute("User Tab");
        else if (role === "Cleaner") setInitialRoute("Cleaner Tab");
        else if (role === "Admin") setInitialRoute("Admin Stack");
        else setInitialRoute("Intro Stack");
      }

      setLoading(false);
    };

    checkAuthAndRole();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={[glob.container, glob.center]}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return <RootStack initialRoute={initialRoute} />;
}

const styles = StyleSheet.create({});
