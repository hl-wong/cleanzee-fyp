import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef } from "react";
import Row from "../Row";
import { glob, theme } from "../../assets/styles";
import { getFontSize } from "../../utils";

interface TabBarProps {
  index: number;
  setIndex: (index: number) => void;
  routes: { key: string; title: string }[];
  layoutWidth: number;
}

const TabBar: React.FC<TabBarProps> = ({
  index,
  setIndex,
  routes,
  layoutWidth,
}) => {
  const tabWidth = layoutWidth / routes.length;
  const translateX = useRef(new Animated.Value(0)).current;

  const prevIndexRef = useRef(index);

  useEffect(() => {
    if (prevIndexRef.current === 1 && index === 2) {
      translateX.setValue(index * tabWidth);
    } else {
      Animated.spring(translateX, {
        toValue: index * tabWidth,
        useNativeDriver: true,
      }).start();
    }

    prevIndexRef.current = index;
  }, [index, tabWidth, translateX]);

  return (
    <Row style={{ backgroundColor: theme.color.white }}>
      {routes.map((route, i) => {
        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => setIndex(i)}
            style={{
              flex: 1,
              paddingVertical: 16,
              borderBottomWidth: 1,
              borderColor: "#D9D9D9",
            }}
          >
            <Text
              style={[
                glob.textCenter,
                {
                  color: index === i ? "#007BFF" : "#888",
                  fontSize:
                    Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
                  fontWeight: 700,
                },
              ]}
            >
              {route.title}
            </Text>
          </TouchableOpacity>
        );
      })}
      <Animated.View
        style={[
          styles.indicator,
          { width: tabWidth, transform: [{ translateX }] },
        ]}
      />
    </Row>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  indicator: {
    position: "absolute",
    bottom: 0,
    height: 3,
    backgroundColor: theme.color.primary,
  },
});
