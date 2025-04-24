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
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import moment, { Moment } from "moment";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Row from "../Row";
import { glob, theme } from "../../assets/styles";
import Column from "../Column";
import { getFontSize } from "../../utils";
import { FormErrorMessage } from "../errors";

interface MonthSelectorProps {
  selectedMonth: Moment;
  setSelectedMonth: (month: Moment) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  style?: StyleProp<ViewStyle>;
  errors?: string;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({
  selectedMonth,
  setSelectedMonth,
  selectedDate,
  setSelectedDate,
  style,
  errors,
}) => {
  const currentMonth = moment();
  const currentDate = moment();

  const getMonthDays = (month: Moment) => {
    let days: Moment[] = [];
    let start = moment(month).startOf("month");
    let end = moment(month).endOf("month");
    while (start <= end) {
      if (start.isSameOrAfter(currentDate, "day")) {
        days.push(start.clone());
      }
      start.add(1, "day");
    }
    return days;
  };

  const monthDays = getMonthDays(selectedMonth);

  return (
    <View style={style}>
      <Row style={[glob.spaceBetween, glob.horizontalCenter]}>
        <TouchableOpacity
          onPress={() =>
            setSelectedMonth(moment(selectedMonth).subtract(1, "month"))
          }
          disabled={selectedMonth.isSame(currentMonth, "month")}
          style={{
            opacity: selectedMonth.isSame(currentMonth, "month") ? 0.3 : 1,
          }}
        >
          <MaterialIcons name="chevron-left" size={24} />
        </TouchableOpacity>

        <Text style={styles.month}>{selectedMonth.format("MMMM YYYY")}</Text>

        <TouchableOpacity
          onPress={() =>
            setSelectedMonth(moment(selectedMonth).add(1, "month"))
          }
        >
          <MaterialIcons name="chevron-right" size={24} />
        </TouchableOpacity>
      </Row>

      <Column gap={8}>
        <FlatList
          data={monthDays}
          horizontal
          keyExtractor={(item) => item.format("YYYY-MM-DD")}
          renderItem={({ item }) => {
            const isSelected = selectedDate === item.format("YYYY-MM-DD");

            return (
              <TouchableOpacity
                style={[
                  styles.button,
                  glob.center,
                  isSelected && styles.selectedDate,
                ]}
                onPress={() => setSelectedDate(item.format("YYYY-MM-DD"))}
              >
                <Text style={[styles.day, isSelected && styles.selectedText]}>
                  {item.format("ddd")}
                </Text>
                <Text style={[styles.date, isSelected && styles.selectedText]}>
                  {item.format("DD")}
                </Text>
              </TouchableOpacity>
            );
          }}
          style={{ marginTop: 16 }}
          showsHorizontalScrollIndicator={false}
        />
        {errors && <FormErrorMessage errors={errors} />}
      </Column>
    </View>
  );
};

export default MonthSelector;

const styles = StyleSheet.create({
  month: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 700,
  },
  button: {
    padding: 10,
    margin: 5,
    backgroundColor: "#eee",
    borderRadius: 10,
    width: wp("16%"),
    height: wp("18%"),
  },
  selectedDate: {
    backgroundColor: theme.color.primary,
  },
  day: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 700,
  },
  date: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 500,
  },
  selectedText: {
    color: theme.color.white,
  },
});
