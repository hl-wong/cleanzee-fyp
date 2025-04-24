import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { glob, theme } from "../../assets/styles";
import Row from "../Row";
import { ImagePreview } from "../images";
import Column from "../Column";
import { getFontSize } from "../../utils";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

interface ServiceManagementCardProps {
  serviceImage: string;
  serviceName: string;
  serviceCategory: string;
  onEdit: () => void;
  onDelete: () => void;
}

const ServiceManagementCard: React.FC<ServiceManagementCardProps> = ({
  serviceImage,
  serviceName,
  serviceCategory,
  onEdit,
  onDelete,
}) => {
  return (
    <View style={styles.card}>
      <Row gap={16} style={glob.horizontalCenter}>
        <ImagePreview imageUri={serviceImage} />
        <Column gap={6} style={{ flexShrink: 1 }}>
          <Column gap={4}>
            <Text numberOfLines={1} style={styles.serviceName}>
              {serviceName}
            </Text>
            <Text style={styles.serviceCategory}>{serviceCategory}</Text>
          </Column>
          <Row gap={16}>
            <TouchableOpacity activeOpacity={0.7} onPress={onEdit}>
              <MaterialIcons
                name="edit"
                size={24}
                color={theme.color.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={onDelete}>
              <MaterialIcons
                name="delete"
                size={24}
                color={theme.color.error}
              />
            </TouchableOpacity>
          </Row>
        </Column>
      </Row>
    </View>
  );
};

export default ServiceManagementCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.color.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: theme.color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceName: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: "bold",
    color: "#333",
  },
  serviceCategory: {
    fontSize: Platform.OS === "ios" ? getFontSize(12) : getFontSize(14),
    color: "#666",
  },
});
