import { Image, Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { glob, theme } from "../../assets/styles";
import Column from "../Column";
import { Button } from "../buttons";
import { getFontSize } from "../../utils";

interface ProfileHeaderProps {
  userProfilePicture?: string;
  userName: string;
  userRole: string;
  btn: {
    label: string;
    onPress: () => void;
  };
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userProfilePicture,
  userName,
  userRole,
  btn,
}) => {
  return (
    <Column gap={16} style={[styles.header, glob.horizontalCenter]}>
      {userProfilePicture ? (
        <Image
          source={{ uri: userProfilePicture }}
          style={styles.userProfilePicture}
        />
      ) : (
        <MaterialIcons
          name="account-circle"
          size={100}
          color={theme.color.white}
        />
      )}

      <Column gap={4} style={glob.horizontalCenter}>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.userRole}>{userRole}</Text>
      </Column>
      <Button
        variant="primary"
        size="md"
        label={btn.label}
        onPress={btn.onPress}
        labelColor={theme.color.secondary}
        style={{
          backgroundColor: theme.color.white,
          shadowColor: theme.color.black,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
        }}
      />
    </Column>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  header: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: theme.color.primary,
    shadowColor: theme.color.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  userProfilePicture: {
    height: 100,
    width: 100,
    borderRadius: 100,
    backgroundColor: theme.color.white,
    shadowColor: theme.color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 2,
    borderColor: theme.color.white,
  },
  userName: {
    fontSize: Platform.OS === "ios" ? getFontSize(18) : getFontSize(20),
    fontWeight: 600,
    color: theme.color.white,
  },
  userRole: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 500,
    color: theme.color.white,
  },
});
