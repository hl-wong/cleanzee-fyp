import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import Column from "../Column";
import Row from "../Row";
import { UserContext } from "../../context/UserContext";
import moment from "moment";
import { glob, theme } from "../../assets/styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { getFontSize } from "../../utils";

interface AvailabilityCardProps {
  onEdit: () => void;
}

const AvailabilityCard: React.FC<AvailabilityCardProps> = ({ onEdit }) => {
  const { cleaner } = useContext(UserContext);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
  const mergedAvailability = daysOfWeek.map((day) => {
    const found = cleaner?.availability?.find(
      (a: { day: string; off: boolean; startTIme: string; endTime: string }) =>
        a.day === day
    );
    return (
      found || {
        day,
        off: false,
        startTime: "",
        endTime: "",
      }
    );
  });

  return (
    <Column gap={Platform.OS === "ios" ? 24 : 16} style={styles.card}>
      <Row style={[glob.spaceBetween, glob.horizontalCenter]}>
        <Text style={styles.title}>Availability</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={onEdit}>
          <MaterialIcons name="edit" size={Platform.OS === "ios" ? 22 : 20} />
        </TouchableOpacity>
      </Row>
      <Column gap={Platform.OS === "ios" ? 12 : 8}>
        {mergedAvailability?.map(
          (
            item: {
              day: string;
              off: boolean;
              startTime: string;
              endTime: string;
            },
            index: number
          ) => {
            return (
              <Row
                key={index}
                style={[glob.horizontalCenter, glob.spaceBetween]}
              >
                <Text style={styles.day}>{item.day}</Text>
                {item.off ? (
                  <Text style={styles.off}>Off</Text>
                ) : item.startTime && item.endTime ? (
                  <Text style={styles.available}>{`${moment(
                    item.startTime
                  ).format("h:mm A")} - ${moment(item.endTime).format(
                    "h:mm A"
                  )}`}</Text>
                ) : (
                  <Text style={{ color: "#999" }}>Not set yet</Text>
                )}
              </Row>
            );
          }
        )}
      </Column>
    </Column>
  );
};

export default AvailabilityCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.color.white,
    padding: 16,
    borderRadius: 12,
    shadowColor: theme.color.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 700,
  },
  day: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 500,
  },
  off: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    color: theme.color.error,
    fontWeight: 700,
  },
  available: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    color: theme.color.primary,
    fontWeight: 700,
  },
});
