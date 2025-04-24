import {
  Platform,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { getFontSize, navigateTo } from "../utils";
import Row from "./Row";
import { glob, theme } from "../assets/styles";
import Column from "./Column";

interface MenuListProps {
  sections: {
    title: string;
    data: {
      icon: string;
      label: string;
      desc: string;
      navigate?: {
        stack?: string;
        screen?: string;
        params?: { role: string };
      };
    }[];
  }[];
  onDelete?: () => void;
  onLogout?: () => void;
  navigation: any;
}

const MenuList: React.FC<MenuListProps> = ({
  sections,
  onDelete,
  onLogout,
  navigation,
}) => {
  return (
    <SectionList
      sections={sections}
      renderSectionHeader={({ section: { title } }) => (
        <View
          style={[
            styles.sectionHeader,
            title !== sections[0].title && { marginTop: 12 },
          ]}
        >
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
      )}
      renderItem={({ item, index, section }) => {
        const isLastItem = index === section.data.length - 1;

        return (
          <View style={[styles.menuItem, isLastItem && styles.isLastItem]}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                if (item.navigate?.stack && item.navigate?.screen) {
                  navigateTo(
                    navigation,
                    item.navigate?.stack,
                    item.navigate?.screen
                  );
                } else if (item.label === "Log Out" && onLogout) {
                  onLogout();
                } else if (item.label === "Delete Account" && onDelete) {
                  onDelete();
                }
              }}
            >
              <Row gap={16} style={[glob.spaceBetween, glob.horizontalCenter]}>
                <Row
                  gap={16}
                  style={[
                    !item?.desc && glob.horizontalCenter,
                    { flexShrink: 1 },
                  ]}
                >
                  <MaterialIcons name={item.icon} size={20} />
                  <Column style={{ flexShrink: 1 }}>
                    <Text style={styles.label}>{item.label}</Text>
                    {item?.desc && (
                      <Text style={styles.desc}>{item?.desc}</Text>
                    )}
                  </Column>
                </Row>

                <MaterialIcons
                  name="chevron-right"
                  size={Platform.OS === "ios" ? 24 : 20}
                  color="#A6A6A6"
                />
              </Row>
            </TouchableOpacity>
          </View>
        );
      }}
      scrollEnabled={false}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

export default MenuList;

const styles = StyleSheet.create({
  sectionHeader: {
    backgroundColor: theme.color.white,
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  sectionTitle: {
    fontSize: Platform.OS === "ios" ? getFontSize(10) : getFontSize(12),
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  menuItem: {
    padding: 16,
    backgroundColor: theme.color.white,
  },
  isLastItem: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  label: {
    fontSize: Platform.OS === "ios" ? getFontSize(12) : getFontSize(14),
  },
  desc: {
    fontSize: getFontSize(12),
    color: "#666",
    marginTop: 2,
    flexShrink: 1,
  },
  separator: {
    height: 1,
    backgroundColor: "#D9D9D9",
  },
});
