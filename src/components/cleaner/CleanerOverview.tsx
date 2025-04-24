import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useMemo } from "react";
import Row from "../Row";
import Column from "../Column";
import moment from "moment";
import { glob, theme } from "../../assets/styles";
import { getFontSize } from "../../utils";

interface CleanerOverviewProps {
  reviews: {
    userId: string;
    userRating: string;
    userReview: string;
  }[];
  joinedAt: string;
  onRating: () => void;
}

const CleanerOverview: React.FC<CleanerOverviewProps> = ({
  reviews,
  joinedAt,
  onRating,
}) => {
  const averageRating = useMemo(() => {
    if (!reviews || reviews.length === 0) return "N/A";
    const total = reviews.reduce(
      (sum, review) => sum + parseFloat(review.userRating),
      0
    );
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  return (
    <Row gap={16}>
      <TouchableOpacity
        style={[glob.container, styles.card]}
        activeOpacity={0.8}
        onPress={onRating}
      >
        <Column
          gap={Platform.OS === "ios" ? 4 : 2}
          style={glob.horizontalCenter}
        >
          <Text style={styles.label}>Rating</Text>
          <Text style={styles.value}>{averageRating}</Text>
        </Column>
      </TouchableOpacity>

      <Column
        gap={Platform.OS === "ios" ? 4 : 2}
        style={[glob.horizontalCenter, glob.container, styles.card]}
      >
        <Text style={styles.label}>Joined</Text>
        <Text style={styles.value}>{moment(joinedAt).format("MMM YYYY")}</Text>
      </Column>
    </Row>
  );
};

export default CleanerOverview;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: "#F2F2F2",
  },
  value: {
    fontSize: Platform.OS === "ios" ? getFontSize(16) : getFontSize(18),
    fontWeight: 700,
    color: theme.color.primary,
  },
  label: {
    fontSize: Platform.OS === "ios" ? getFontSize(10) : getFontSize(12),
    color: "#666",
    fontWeight: 500,
  },
});
