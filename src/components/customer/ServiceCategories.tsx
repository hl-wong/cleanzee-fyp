import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useMemo } from "react";
import Column from "../Column";
import Row from "../Row";
import { glob, theme } from "../../assets/styles";
import { Button, IconButton } from "../buttons";
import { getFontSize, navigateTo } from "../../utils";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import * as Animatable from "react-native-animatable";

interface ServiceCategoriesProps {
  category: {
    name: string;
    label: string;
  }[];
  navigation: any;
}

const ServiceCategories: React.FC<ServiceCategoriesProps> = ({
  category,
  navigation,
}) => {
  const shuffledCategories = useMemo(() => {
    return [...category].sort(() => Math.random() - 0.5);
  }, [category]);

  return (
    <Column gap={16} style={{ paddingHorizontal: 16 }}>
      <Row style={[glob.spaceBetween, glob.horizontalCenter]}>
        <Text style={styles.title}>Service Categories</Text>
        <Button
          variant="link"
          label="View All"
          onPress={() =>
            navigateTo(navigation, "Home Stack", "View All Screen", {
              view: "category",
            })
          }
        />
      </Row>
      <FlatList
        data={shuffledCategories.slice(0, 6)}
        contentContainerStyle={{ gap: 8 }}
        renderItem={({ item }) => {
          return (
            <Animatable.View animation="slideInRight" duration={1500}>
              <TouchableOpacity
                style={styles.category}
                activeOpacity={0.8}
                onPress={() => {
                  console.log(item.label);
                  navigateTo(
                    navigation,
                    "Home Stack",
                    "Service Category Screen",
                    { category: item.label }
                  );
                }}
              >
                <Column gap={8} style={glob.horizontalCenter}>
                  <IconButton
                    variant="circle"
                    size="md"
                    name={item.name}
                    iconColor={theme.color.white}
                    disabled={true}
                  />
                  <Text style={styles.label}>{item.label}</Text>
                </Column>
              </TouchableOpacity>
            </Animatable.View>
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </Column>
  );
};

export default ServiceCategories;

const styles = StyleSheet.create({
  title: {
    fontSize: Platform.OS === "ios" ? getFontSize(16) : getFontSize(18),
    fontWeight: 700,
  },
  category: {
    width: wp("20%"),
  },
  label: {
    fontWeight: 500,
    textAlign: "center",
    fontSize: Platform.OS === "ios" ? getFontSize(12) : getFontSize(14),
  },
});
