import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { theme } from "../../assets/styles";
import { StatusBar } from "expo-status-bar";

interface AnimatedHeaderProps {
  onBack: () => void;
  scrollOffsetY: Animated.Value;
}

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
  onBack,
  scrollOffsetY,
}) => {
  const headerBg = scrollOffsetY.interpolate({
    inputRange: [0, 50],
    outputRange: ["transparent", "#007BFF"],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[
        styles.header,
        {
          padding: 16,
          backgroundColor: headerBg,
        },
      ]}
    >
      <SafeAreaView edges={["top"]}>
        <StatusBar style="light" />
        <TouchableOpacity activeOpacity={0.8} onPress={onBack}>
          <MaterialIcons
            name="arrow-back"
            size={24}
            color={theme.color.white}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </Animated.View>
  );
};

export default AnimatedHeader;

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
});
