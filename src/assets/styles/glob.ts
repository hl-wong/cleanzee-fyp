import { Platform, StyleSheet } from "react-native";
import { getFontSize } from "../../utils";

const glob = StyleSheet.create({
  layout: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  horizontalCenter: {
    alignItems: "center",
  },
  verticalCenter: {
    justifyContent: "center",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  title: {
    fontSize: getFontSize(24),
    fontWeight: 700,
  },
  desc: {
    fontSize: getFontSize(16),
    lineHeight: Platform.OS === "ios" ? 28 : 24,
  },
  textCenter: {
    textAlign: "center",
  },
  noData: {
    textAlign: "center",
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    color: "#888",
    marginTop: 20,
  },
});

export default glob;
