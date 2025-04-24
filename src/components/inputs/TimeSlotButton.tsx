import { Platform, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "react-native-modal-datetime-picker";
import Column from "../Column";
import Row from "../Row";
import { glob, theme } from "../../assets/styles";
import { IconButton } from "../buttons";
import { getFontSize } from "../../utils";

interface TimeSlotButtonProps {
  value?: string[];
  onChange: (timeSlots: string[]) => void;
  onRemove: (timeSlots: string[]) => void;
}

const TimeSlotButton: React.FC<TimeSlotButtonProps> = ({
  value = [],
  onChange,
  onRemove,
}) => {
  const [timeSlots, setTimeSlots] = useState<string[]>(value);
  const [isPickerVisible, setPickerVisible] = useState<boolean>(false);

  const handleAddTimeSlot = () => {
    setPickerVisible(true);
  };

  const handleConfirm = (date: Date) => {
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (!timeSlots.includes(formattedTime)) {
      const updatedTimeSlots = [...timeSlots, formattedTime];
      setTimeSlots(updatedTimeSlots);
      onChange(updatedTimeSlots);
    }
    setPickerVisible(false);
  };

  const handleRemoveTimeSlot = (index: number) => {
    const updatedTimeSlots = timeSlots.filter((_, i) => i !== index);
    setTimeSlots(updatedTimeSlots);
    onRemove(updatedTimeSlots);
  };

  return (
    <Column gap={Platform.OS === "ios" ? 12 : 8}>
      <Text style={styles.label}>Time Slots</Text>
      <Row style={{ flexWrap: "wrap" }}>
        {timeSlots.map((slot, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.timeSlot, glob.center, { alignSelf: "flex-start" }]}
            onLongPress={() => handleRemoveTimeSlot(index)}
          >
            <Text style={styles.time}>{slot}</Text>
          </TouchableOpacity>
        ))}

        <IconButton
          variant="rounded"
          size="md"
          name="add"
          onPress={handleAddTimeSlot}
          style={{ backgroundColor: "#eee" }}
          iconColor={theme.color.black}
        />

        <DateTimePicker
          isVisible={isPickerVisible}
          mode="time"
          date={new Date()}
          display="spinner"
          onConfirm={handleConfirm}
          onCancel={() => setPickerVisible(false)}
        />
      </Row>
    </Column>
  );
};

export default TimeSlotButton;

const styles = StyleSheet.create({
  label: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 600,
  },
  timeSlot: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: theme.color.primary,
  },
  time: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 500,
    color: theme.color.white,
  },
});
