import {
  FlatList,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { glob, theme } from "../../assets/styles";
import { getFontSize } from "../../utils";
import Column from "../Column";
import { FormErrorMessage } from "../errors";

interface TimeSlotPickerProps {
  timeSlots: string[];
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  style?: StyleProp<ViewStyle>;
  errors?: string;
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  timeSlots,
  selectedTime,
  onSelectTime,
  style,
  errors,
}) => {
  return (
    <View style={style}>
      <Text style={styles.label}>Available Slots</Text>
      <Column gap={8}>
        <FlatList
          data={timeSlots}
          numColumns={3}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.timeSlot,
                glob.center,
                selectedTime === item && styles.selected,
              ]}
              onPress={() => onSelectTime(item)}
            >
              <Text
                style={[
                  selectedTime === item ? styles.selectedText : styles.time,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          style={{ marginTop: 8 }}
        />

        {errors && <FormErrorMessage errors={errors} />}
      </Column>
    </View>
  );
};

export default TimeSlotPicker;

const styles = StyleSheet.create({
  label: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 600,
  },
  timeSlot: {
    padding: 10,
    margin: 5,
    flex: 1,
    borderRadius: 5,
    backgroundColor: "#eee",
  },
  selected: {
    backgroundColor: theme.color.primary,
  },
  time: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 500,
  },
  selectedText: {
    color: theme.color.white,
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 700,
  },
});
