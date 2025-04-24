import { ScrollView, StyleSheet } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { resetTo } from "../../../utils";
import { adminMenu } from "../../../constants";
import { glob } from "../../../assets/styles";
import {
  AdminOverviewCard,
  AdminProfileCard,
  Content,
  MenuList,
  Modal,
} from "../../../components";
import { getAdminOverview } from "../../../services";

interface AdminDashboardScreenProps {
  navigation: any;
}

const AdminDashboardScreen: React.FC<AdminDashboardScreenProps> = ({
  navigation,
}) => {
  const [overview, setOverview] = useState<
    {
      label: string;
      value: number;
    }[]
  >([]);

  useFocusEffect(
    useCallback(() => {
      const fetchOverview = async () => {
        const response = await getAdminOverview();
        if (response.status === 200) {
          setOverview(response.data);
        }
      };

      fetchOverview();
    }, [])
  );

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("role");
    resetTo(navigation, [{ name: "Intro Stack" }, { name: "Auth Stack" }]);
  };

  const [visible, setVisible] = useState(false);

  return (
    <>
      <SafeAreaView edges={["top"]} style={glob.layout}>
        <StatusBar style="dark" />
        <Content>
          <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
            <AdminProfileCard />
            <AdminOverviewCard data={overview} />
            <MenuList
              sections={adminMenu}
              navigation={navigation}
              onLogout={() => setVisible(true)}
            />
          </ScrollView>
        </Content>
      </SafeAreaView>

      <Modal
        visible={visible}
        setVisible={setVisible}
        modalTitle="Logout"
        modalDesc="Are you sure you want to log out?"
        label="Log Out"
        onPress={handleLogout}
      />
    </>
  );
};

export default AdminDashboardScreen;

const styles = StyleSheet.create({});
