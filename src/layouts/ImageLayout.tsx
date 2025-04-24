import {
  Animated,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { ReactNode, useRef } from "react";
import { glob, theme } from "../assets/styles";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { AnimatedHeader } from "../components";

interface ImageLayoutProps {
  children: ReactNode;
  onBack: () => void;
  imageUri: string;
  footer?: ReactNode;
}

const ImageLayout: React.FC<ImageLayoutProps> = ({
  children,
  onBack,
  imageUri,
  footer,
}) => {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  return (
    <View style={[glob.layout, { backgroundColor: theme.color.white }]}>
      <AnimatedHeader onBack={onBack} scrollOffsetY={scrollOffsetY} />
      <ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <ImageBackground
          source={{ uri: imageUri }}
          style={styles.bgImage}
          resizeMode="cover"
        />
        {children}
      </ScrollView>
      {footer}
    </View>
  );
};

export default ImageLayout;

const styles = StyleSheet.create({
  bgImage: {
    height: wp("90%"),
  },
});
