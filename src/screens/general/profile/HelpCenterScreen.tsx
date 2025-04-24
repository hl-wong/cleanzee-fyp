import { FlatList, Platform, StyleSheet, Text } from "react-native";
import React from "react";
import { theme } from "../../../assets/styles";
import { getFontSize, goBack } from "../../../utils";
import { AccordionItem, Content } from "../../../components";
import { faq } from "../../../constants";
import { HeaderLayout } from "../../../layouts";

interface HelpCenterScreenProps {
  navigation: any;
}

const HelpCenterScreen: React.FC<HelpCenterScreenProps> = ({ navigation }) => {
  return (
    <HeaderLayout headerTitle="Help Center" onBack={() => goBack(navigation)}>
      <Content bgColor="white">
        <FlatList
          data={faq}
          renderItem={({ item }) => {
            return (
              <AccordionItem
                title={item.question}
                content={<Text style={styles.answer}>{item.answer}</Text>}
              />
            );
          }}
        />
      </Content>
    </HeaderLayout>
  );
};

export default HelpCenterScreen;

const styles = StyleSheet.create({
  header: {
    padding: 16,
  },
  title: {
    fontSize: Platform.OS === "ios" ? getFontSize(24) : getFontSize(26),
    color: theme.color.white,
    fontWeight: 700,
  },
  answer: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    lineHeight: 22,
  },
});
