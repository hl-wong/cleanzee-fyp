import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { NotificationItem } from "../../../components";

interface GeneralNotificationScreenProps {
  notifications: {
    id: string;
    title: string;
    desc: string;
    isRead: boolean;
    createdAt: string;
  }[];
}

const GeneralNotificationScreen: React.FC<GeneralNotificationScreenProps> = ({
  notifications,
}) => {
  return (
    <FlatList
      data={notifications}
      keyExtractor={(item, index) => `general-${index}`}
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

export default GeneralNotificationScreen;

const styles = StyleSheet.create({});
