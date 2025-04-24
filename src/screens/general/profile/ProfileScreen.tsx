import { ScrollView, StyleSheet } from "react-native";
import React, { useCallback, useContext, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { glob } from "../../../assets/styles";
import { StatusBar } from "expo-status-bar";
import { Column, MenuList, Modal, ProfileHeader } from "../../../components";
import { UserContext } from "../../../context";
import { logout, navigateTo, resetTo } from "../../../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { cleanerMenu, profileMenu } from "../../../constants";
import { deleteAccount } from "../../../services";
import { useFocusEffect } from "@react-navigation/native";

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const route = useRoute();
  const { role } = route.params as { role: string };

  const { user, cleaner, setUser, setCleaner, refreshUserData } =
    useContext(UserContext);

  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState<"logout" | "delete" | null>(null);

  useFocusEffect(
    useCallback(() => {
      refreshUserData();
    }, [])
  );

  return (
    <>
      <SafeAreaView edges={["top"]} style={glob.layout}>
        <StatusBar style="dark" />
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <Column gap={16}>
            <ProfileHeader
              userProfilePicture={user?.profilePicture}
              userName={`${user?.firstName} ${user?.lastName}`}
              userRole={role === "customer" ? "Customer" : "Cleaner"}
              btn={{
                label:
                  role === "customer"
                    ? cleaner?.approved
                      ? "Switch to Cleaner"
                      : "Become Cleaner"
                    : "Switch to Customer",
                onPress: async () => {
                  if (role === "customer") {
                    if (cleaner) {
                      if (!cleaner?.approved) {
                        navigateTo(
                          navigation,
                          "Become Cleaner Stack",
                          "Pending Screen",
                          {
                            title: "Pending Approval",
                            desc: "Your cleaner application is under review. You will be notified once the verification process is complete.",
                          }
                        );
                      } else {
                        resetTo(navigation, "Cleaner Tab");
                        await AsyncStorage.setItem("role", "Cleaner");
                      }
                    } else {
                      navigateTo(
                        navigation,
                        "Become Cleaner Stack",
                        "Become Cleaner Screen"
                      );
                    }
                  }

                  if (role === "cleaner") {
                    await AsyncStorage.setItem("role", "User");
                    resetTo(navigation, "User Tab");
                  }
                },
              }}
            />
            <MenuList
              sections={role === "customer" ? profileMenu : cleanerMenu}
              navigation={navigation}
              onLogout={() => {
                setVisible(true);
                setModalType("logout");
              }}
              onDelete={() => {
                setVisible(true);
                setModalType("delete");
              }}
            />
          </Column>
        </ScrollView>
      </SafeAreaView>

      <Modal
        visible={visible}
        setVisible={setVisible}
        modalTitle={
          modalType === "delete"
            ? "Delete Account"
            : modalType === "logout"
            ? "Logout"
            : ""
        }
        modalDesc={
          modalType === "delete"
            ? "Are you sure you want to delete account? This action cannot be undone. All your data will be permanently removed."
            : modalType === "logout"
            ? "Are you sure you want to log out?"
            : ""
        }
        label={
          modalType === "delete"
            ? "Delete"
            : modalType === "logout"
            ? "Log Out"
            : ""
        }
        onPress={async () => {
          if (modalType === "logout") {
            logout(navigation, setUser, setCleaner);
          }

          if (modalType === "delete") {
            const response = await deleteAccount(user._id);
            if (response.status === 200) {
              logout(navigation, setUser, setCleaner);
            }
          }
        }}
      />
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
