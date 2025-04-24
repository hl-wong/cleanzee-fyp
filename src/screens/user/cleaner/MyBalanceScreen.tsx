import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../../../context";
import { HeaderLayout } from "../../../layouts";
import { Content, TransactionItem } from "../../../components";
import { glob } from "../../../assets/styles";
import { getFontSize, goBack } from "../../../utils";

interface MyBalanceScreenProps {
  navigation: any;
}

const MyBalanceScreen: React.FC<MyBalanceScreenProps> = ({ navigation }) => {
  const { cleaner } = useContext(UserContext);

  return (
    <HeaderLayout
      type="balance"
      headerTitle={`RM ${cleaner?.balance ?? 0}`}
      headerSubtitle="My Balance"
      onBack={() => goBack(navigation)}
    >
      <Content bgColor="white">
        <FlatList
          data={cleaner?.transactions}
          renderItem={({ item }) => {
            return (
              <TransactionItem
                userName={`${item.userId?.firstName} ${item.userId?.lastName}`}
                transactionDate={item.date}
                finalAmount={item.finalAmount}
              />
            );
          }}
          ListEmptyComponent={
            <View style={[glob.container, glob.center]}>
              <Text style={styles.noTransaction}>
                No transaction history yet
              </Text>
            </View>
          }
          contentContainerStyle={{ flexGrow: 1 }}
        />
      </Content>
    </HeaderLayout>
  );
};

export default MyBalanceScreen;

const styles = StyleSheet.create({
  noTransaction: {
    textAlign: "center",
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    color: "#888",
    marginTop: 20,
  },
});
