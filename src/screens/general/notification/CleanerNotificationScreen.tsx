import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { NotificationItem } from "../../../components";

interface CleanerNotificationScreenProps {
  notifications: {
    id: string;
    title: string;
    desc: string;
    isRead: boolean;
    createdAt: string;
  }[];
}

const CleanerNotificationScreen: React.FC<CleanerNotificationScreenProps> = ({
  notifications,
}) => {
  return (
    <FlatList
      data={notifications}
      keyExtractor={(item, index) => `cleaner-${index}`}
      renderItem={({ item }) => (
        <NotificationItem
          title={item.title}
          desc={item.desc}
          createdAt={item.createdAt}
        />
      )}
    />
  );
};

export default CleanerNotificationScreen;

const styles = StyleSheet.create({});
