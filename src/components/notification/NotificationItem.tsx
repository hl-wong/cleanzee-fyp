import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Row from "../Row";
import { IconButton } from "../buttons";
import { glob, theme } from "../../assets/styles";
import Column from "../Column";
import { getFontSize } from "../../utils";
import moment from "moment";

interface NotificationItemProps {
  title: string;
  desc: string;
  createdAt: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  title,
  desc,
  createdAt,
}) => {
  return (
    <Row gap={16} style={{ padding: 16 }}>
      <IconButton
        variant="circle"
        name="notifications"
        size="md"
        iconColor={theme.color.white}
        disabled
      />
      <Column gap={8} style={{ flexShrink: 1 }}>
        <Column gap={Platform.OS === "ios" ? 4 : 2}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.desc}>{desc}</Text>
        </Column>
        <Row gap={8} style={glob.horizontalCenter}>
          <MaterialIcons
            name="query-builder"
            size={Platform.OS === "ios" ? 18 : 16}
            color="#A6A6A6"
          />
          <Text style={styles.createdAt}>
            {moment(createdAt).format("DD MMM YYYY HH:mm")}
          </Text>
        </Row>
      </Column>
    </Row>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  title: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 700,
  },
  desc: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    lineHeight: Platform.OS === "ios" ? 22 : 20,
  },
  createdAt: {
    fontSize: Platform.OS === "ios" ? getFontSize(12) : getFontSize(14),
    color: "#A6A6A6",
  },
});
