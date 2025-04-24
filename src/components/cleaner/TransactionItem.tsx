import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import Row from "../Row";
import { glob, theme } from "../../assets/styles";
import moment from "moment";
import Column from "../Column";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { getFontSize } from "../../utils";

interface TransactionItemProps {
  userName: string;
  transactionDate: Date;
  finalAmount: number;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  userName,
  transactionDate,
  finalAmount,
}) => {
  return (
    <Row style={[glob.spaceBetween, glob.horizontalCenter, styles.transaction]}>
      <Row gap={16}>
        <View style={[styles.icon, glob.center]}>
          <MaterialIcons
            name="attach-money"
            size={20}
            color={theme.color.white}
          />
        </View>
        <Column gap={4}>
          <Text style={styles.userName}>{userName}</Text>
          <Text>{moment(transactionDate).format("YYYY-MM-DD")}</Text>
        </Column>
      </Row>

      <Text style={styles.price}>{`+ RM${finalAmount.toFixed(2)}`}</Text>
    </Row>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  transaction: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#D9D9D9",
  },
  icon: {
    height: 40,
    width: 40,
    backgroundColor: theme.color.primary,
    borderRadius: 50,
  },
  userName: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 700,
  },
  price: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 700,
    color: theme.color.primary,
  },
});
