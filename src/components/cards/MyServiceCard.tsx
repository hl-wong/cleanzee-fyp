import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Row from "../Row";
import Column from "../Column";
import { glob, theme } from "../../assets/styles";
import { getFontSize } from "../../utils";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

interface MyServiceCardProps {
  serviceImage: string;
  serviceName: string;
  serviceCategory: string;
  onEdit: () => void;
  onDelete: () => void;
}

const MyServiceCard: React.FC<MyServiceCardProps> = ({
  serviceImage,
  serviceName,
  serviceCategory,
  onEdit,
  onDelete,
}) => {
  return (
    <Row gap={16} style={styles.card}>
      <Image source={{ uri: serviceImage }} style={styles.serviceImage} />
      <Column gap={6} style={[{ flexShrink: 1 }, glob.spaceBetween]}>
        <Column gap={Platform.OS === "ios" ? 4 : 2}>
          <Text numberOfLines={1} style={styles.serviceName}>
            {serviceName}
          </Text>
          <Text style={styles.serviceCategory}>{serviceCategory}</Text>
        </Column>
        <Row gap={16}>
          <TouchableOpacity activeOpacity={0.7} onPress={onEdit}>
            <MaterialIcons name="edit" size={24} color={theme.color.primary} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={onDelete}>
            <MaterialIcons name="delete" size={24} color={theme.color.error} />
          </TouchableOpacity>
        </Row>
      </Column>
    </Row>
  );
};

export default MyServiceCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.color.white,
    borderRadius: 8,
    shadowColor: theme.color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 8,
  },
  serviceImage: {
    height: 80,
    width: 80,
    borderRadius: 10,
  },
  serviceName: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 700,
  },
  serviceCategory: {
    fontSize: Platform.OS === "ios" ? getFontSize(12) : getFontSize(14),
    color: "#666",
  },
});
