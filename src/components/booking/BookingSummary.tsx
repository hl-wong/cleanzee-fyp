import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import Column from "../Column";
import Row from "../Row";
import { glob, theme } from "../../assets/styles";
import { getFontSize } from "../../utils";

interface BookingSummaryProps {
  total: number;
  fee: number;
  remainingBalance: number;
  role: string;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  total,
  fee,
  remainingBalance,
  role,
}) => {
  const deposit = (total / 2).toFixed(2);
  const income = (total - fee).toFixed(2);

  return (
    <Column gap={16}>
      <Row style={[glob.spaceBetween, glob.horizontalCenter]}>
        <Text style={styles.label}>Total</Text>
        <Text style={styles.price}>{`RM${total.toFixed(2)}`}</Text>
      </Row>
      {role === "customer" && (
        <>
          <Row style={[glob.spaceBetween, glob.horizontalCenter]}>
            <Text style={styles.label}>Deposit</Text>
            <Text style={styles.price}>{`RM${deposit}`}</Text>
          </Row>

          <Row style={[glob.spaceBetween, glob.horizontalCenter]}>
            <Text style={styles.label}>Balance</Text>
            <Text style={styles.price}>{`RM${remainingBalance.toFixed(
              2
            )}`}</Text>
          </Row>
        </>
      )}
      {role === "cleaner" && (
        <>
          <Row style={[glob.spaceBetween, glob.horizontalCenter]}>
            <Text style={styles.label}>Fee</Text>
            <Text style={styles.price}>{`RM${fee.toFixed(2)}`}</Text>
          </Row>

          <Row style={[glob.spaceBetween, glob.horizontalCenter]}>
            <Text style={styles.label}>Income</Text>
            <Text style={styles.price}>{`RM${income}`}</Text>
          </Row>
        </>
      )}

      {role === "admin" && (
        <Row style={[glob.spaceBetween, glob.horizontalCenter]}>
          <Text style={styles.label}>Fee</Text>
          <Text style={styles.price}>{`RM${fee.toFixed(2)}`}</Text>
        </Row>
      )}
    </Column>
  );
};

export default BookingSummary;

const styles = StyleSheet.create({
  label: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 500,
  },
  price: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 500,
  },
});
