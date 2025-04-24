import { Image, Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import Column from "../Column";
import Row from "../Row";
import { Button } from "../buttons";
import { glob, theme } from "../../assets/styles";
import { getFontSize } from "../../utils";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ImagePreview } from "../images";

interface CleanerApprovalCardProps {
  data: {
    _id: string;
    fullName: string;
    icNumber: string;
    image: string;
    userId: {
      firstName: string;
      lastName: string;
      profilePicture: string;
      email: string;
    };
  };
  onApprove: () => void;
  onReject: () => void;
}

const CleanerApprovalCard: React.FC<CleanerApprovalCardProps> = ({
  data,
  onApprove,
  onReject,
}) => {
  return (
    <View style={styles.card}>
      <Row
        gap={16}
        style={[
          glob.horizontalCenter,
          {
            borderBottomWidth: 1,
            borderColor: "#D9D9D9",
            paddingHorizontal: 16,
            paddingVertical: 8,
          },
        ]}
      >
        {data.userId.profilePicture ? (
          <Image
            source={{ uri: data.userId.profilePicture }}
            style={styles.userProfilePicture}
          />
        ) : (
          <MaterialIcons name="account-circle" size={35} />
        )}
        <Text
          style={styles.userName}
        >{`${data.userId.firstName} ${data.userId.lastName}`}</Text>
      </Row>

      <Column gap={16} style={{ padding: 16 }}>
        <Row gap={16} style={glob.horizontalCenter}>
          <ImagePreview imageUri={data.image} />
          <Column gap={4}>
            <Text style={styles.fullName}>{data.fullName}</Text>
            <Text style={styles.icNumber}>{data.icNumber}</Text>
            <Text style={styles.userEmail}>{data.userId.email}</Text>
          </Column>
        </Row>

        <Row gap={16}>
          <Button
            variant="secondary"
            size={Platform.OS === "ios" ? "lg" : "md"}
            label="Reject"
            onPress={onReject}
            style={{ flex: 1 }}
          />
          <Button
            variant="primary"
            size={Platform.OS === "ios" ? "lg" : "md"}
            label="Approve"
            onPress={onApprove}
            style={{ flex: 1 }}
          />
        </Row>
      </Column>
    </View>
  );
};

export default CleanerApprovalCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.color.white,
    borderRadius: 10,
    shadowColor: theme.color.black,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userProfilePicture: {
    height: 35,
    width: 35,
    borderRadius: 100,
  },
  userName: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 700,
  },
  selfiePhoto: {
    height: 100,
    width: 100,
    resizeMode: "contain",
    borderRadius: 8,
  },
  fullName: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 700,
    color: "#333",
  },
  icNumber: {
    fontSize: Platform.OS === "ios" ? getFontSize(12) : getFontSize(14),
    fontWeight: 500,
    color: "#333",
  },
  userEmail: {
    fontSize: Platform.OS === "ios" ? getFontSize(12) : getFontSize(14),
    fontWeight: 500,
    color: "#333",
  },
});
