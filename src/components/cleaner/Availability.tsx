import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import Column from "../Column";
import Row from "../Row";
import { glob } from "../../assets/styles";
import { formatTime, getFontSize } from "../../utils";

interface AvailabilityProps {
  data: {
    day: string;
    startTime: string;
    endTime: string;
    off: boolean;
  }[];
}

const Availability: React.FC<AvailabilityProps> = ({ data }) => {
  return (
    <Column gap={16}>
      <Text style={styles.label}>Availability</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <Row style={[glob.horizontalCenter, glob.spaceBetween]}>
              <Text style={styles.day}>{item.day}</Text>
              <Text style={styles.time}>
                {item.off === true
                  ? "Off"
                  : `${formatTime(item.startTime)} - ${formatTime(
                      item.endTime
                    )}`}
              </Text>
            </Row>
          );
        }}
        keyExtractor={(item) => item.day}
        contentContainerStyle={{ gap: 8 }}
        scrollEnabled={false}
      />
    </Column>
  );
};

export default Availability;

const styles = StyleSheet.create({
  label: {
    fontSize: Platform.OS === "ios" ? getFontSize(16) : getFontSize(18),
    fontWeight: 700,
  },
  day: {
    width: 80,
    fontWeight: 500,
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
  },
  time: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
  },
});
