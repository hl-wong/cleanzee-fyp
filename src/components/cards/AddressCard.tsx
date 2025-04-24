import { Platform, StyleSheet, Text } from "react-native";
import React from "react";
import Column from "../Column";
import Row from "../Row";
import { glob, theme } from "../../assets/styles";
import { IconButton } from "../buttons";
import { getFontSize } from "../../utils";
import Tag from "../Tag";

interface AddressCardProps {
  data: any;
  onEdit: () => void;
  onDelete: () => void;
}

const AddressCard: React.FC<AddressCardProps> = ({
  data,
  onEdit,
  onDelete,
}) => {
  return (
    <Column gap={8} style={styles.card}>
      <Row style={[glob.spaceBetween, glob.horizontalCenter]}>
        <Text style={styles.label}>{data.label}</Text>
        <Row gap={8}>
          <IconButton
            variant="circle"
            size="sm"
            name="edit"
            onPress={onEdit}
            iconSize={16}
            iconColor={theme.color.white}
          />

          <IconButton
            variant="circle"
            size="sm"
            name="delete"
            onPress={onDelete}
            iconSize={16}
            iconColor={theme.color.white}
          />
        </Row>
      </Row>

      <Column gap={12}>
        <Column gap={4}>
          <Text style={styles.name}>{data.fullName}</Text>
          <Column gap={2}>
            <Text style={styles.address}>{data.street}</Text>
            <Text
              style={styles.location}
            >{`${data.postcode} ${data.city} ${data.state}`}</Text>
            <Text style={styles.phoneNo}>{data.phoneNo}</Text>
          </Column>
        </Column>
        {data.isDefault && <Tag size="md" label="Default" />}
      </Column>
    </Column>
  );
};

export default AddressCard;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: theme.color.white,
    borderRadius: 10,
    shadowColor: theme.color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  label: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 700,
    color: theme.color.primary,
  },
  iconBtn: {
    height: 30,
    width: 30,
    borderRadius: 100,
    backgroundColor: theme.color.primary,
  },
  name: {
    fontSize: Platform.OS === "ios" ? getFontSize(12) : getFontSize(14),
    fontWeight: 700,
    color: "#333",
  },
  address: {
    fontSize: Platform.OS === "ios" ? getFontSize(12) : getFontSize(14),
    color: "#666",
  },
  location: {
    fontSize: Platform.OS === "ios" ? getFontSize(12) : getFontSize(14),
    color: "#666",
  },
  phoneNo: {
    fontSize: Platform.OS === "ios" ? getFontSize(12) : getFontSize(14),
    color: "#666",
  },
});
