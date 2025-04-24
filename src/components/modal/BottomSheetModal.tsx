import {
  StyleSheet,
  View,
  Animated,
  Pressable,
  StyleProp,
  ViewStyle,
  Platform,
} from "react-native";
import React, { ReactNode, useEffect } from "react";
import { glob, theme } from "../../assets/styles";

interface BottomSheetModalProps {
  setStatus: (status: boolean) => void;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const BottomSheetModal: React.FC<BottomSheetModalProps> = ({
  setStatus,
  children,
  style,
}) => {
  const slide = React.useRef(new Animated.Value(300)).current;

  const slideUp = () => {
    Animated.timing(slide, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  const slideDown = () => {
    Animated.timing(slide, {
      toValue: 300,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    slideUp();
  }, []);

  const closeModal = () => {
    slideDown();

    setTimeout(() => {
      setStatus(false);
    }, 800);
  };

  return (
    <Pressable style={styles.backdrop} onPress={closeModal}>
      <Pressable style={{ width: "100%" }}>
        <Animated.View
          style={[styles.bottomSheet, { transform: [{ translateY: slide }] }]}
        >
          <View style={[{ height: 24 }, glob.center]}>
            <View style={styles.handle} />
          </View>
          {children}
          {Platform.OS === "ios" && <View style={{ height: 8 }} />}
        </Animated.View>
      </Pressable>
    </Pressable>
  );
};

export default BottomSheetModal;

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    flex: 1,
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    width: "100%",
    backgroundColor: theme.color.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  handle: {
    width: 36,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#ccc",
  },
});
