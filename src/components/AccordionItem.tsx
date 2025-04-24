import { Platform, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { ReactNode, useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Column from "./Column";
import Row from "./Row";
import { glob } from "../assets/styles";
import { getFontSize } from "../utils";

interface AccordionItemProps {
  title: string;
  content: ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Column gap={16} style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setExpanded(!expanded)}
      >
        <Row style={[glob.spaceBetween, glob.horizontalCenter]}>
          <Text style={styles.title}>{title}</Text>
          <MaterialIcons
            name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={24}
          />
        </Row>
      </TouchableOpacity>

      {expanded && content}
    </Column>
  );
};

export default AccordionItem;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#D9D9D9",
  },
  title: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 500,
  },
});
