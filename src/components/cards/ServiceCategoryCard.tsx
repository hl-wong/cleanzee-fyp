import { Platform, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { IconButton } from "../buttons";
import { glob, theme } from "../../assets/styles";
import Row from "../Row";
import { getFontSize, navigateTo } from "../../utils";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as Animatable from "react-native-animatable";

interface ServiceCategoryCardProps {
  index: number;
  name: string;
  label: string;
  onPress: () => void;
}

const ServiceCategoryCard: React.FC<ServiceCategoryCardProps> = ({
  index,
  name,
  label,
  onPress,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Animatable.View
        style={styles.card}
        animation="fadeInUp"
        delay={index * 100}
      >
        <Row style={[glob.horizontalCenter, glob.spaceBetween]}>
          <Row gap={16} style={glob.horizontalCenter}>
            <IconButton
              variant="rounded"
              size="lg"
              name={name}
              iconColor={theme.color.white}
              disabled
            />
            <Text style={styles.label}>{label}</Text>
          </Row>

          <MaterialIcons name="chevron-right" size={24} />
        </Row>
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default ServiceCategoryCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.color.white,
    borderRadius: 8,
    shadowColor: theme.color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: Platform.OS === "ios" ? 16 : 8,
  },
  label: {
    fontWeight: 500,
    textAlign: "center",
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
  },
});
