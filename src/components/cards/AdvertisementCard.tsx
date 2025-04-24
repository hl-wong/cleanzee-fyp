import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Row from "../Row";
import { ImagePreview } from "../images";
import Column from "../Column";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { glob, theme } from "../../assets/styles";
import { getFontSize } from "../../utils";

interface AdvertisementCardProps {
  title: string;
  promoCode: string;
  imageUri: string;
  onEdit: () => void;
  onDelete: () => void;
}

const AdvertisementCard: React.FC<AdvertisementCardProps> = ({
  title,
  promoCode,
  imageUri,
  onEdit,
  onDelete,
}) => {
  return (
    <View style={styles.card}>
      <Row gap={16} style={glob.horizontalCenter}>
        <ImagePreview imageUri={imageUri} />
        <Column gap={6} style={[{ flexShrink: 1 }, glob.spaceBetween]}>
          <Column gap={4}>
            <Text style={styles.adverTitle} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.promoCode}>{promoCode}</Text>
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

export default AdvertisementCard;

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
  adverTitle: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: "bold",
    color: "#333",
  },
  promoCode: {
    color: "#666",
    fontSize: Platform.OS === "ios" ? getFontSize(12) : getFontSize(14),
  },
});
