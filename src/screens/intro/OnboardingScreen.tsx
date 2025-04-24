import { Image, Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import AppIntroSlider from "react-native-app-intro-slider";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { slides } from "../../constants";
import { getFontSize, navigateTo } from "../../utils";
import { glob, theme } from "../../assets/styles";

interface OnboardingScreenProps {
  navigation: any;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView
      style={[glob.layout, { backgroundColor: theme.color.primary }]}
    >
      <StatusBar style="light" />
      <View style={glob.container}>
        <AppIntroSlider
          data={slides}
          renderItem={({ item }) => {
            return (
              <View key={item.key} style={[glob.container, { padding: 16 }]}>
                <View style={glob.horizontalCenter}>
                  <Image source={item.image} style={styles.slideImage} />
                </View>
                <Text style={styles.slideTitle}>{item.title}</Text>
                <Text style={styles.slideDesc}>{item.description}</Text>
              </View>
            );
          }}
          activeDotStyle={styles.activeDot}
          showSkipButton
          onSkip={() => navigateTo(navigation, "Auth Stack", "Login Screen")}
          onDone={() => navigateTo(navigation, "Auth Stack", "Login Screen")}
        />
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  slideImage: {
    height: responsiveHeight(50),
    width: responsiveWidth(90),
    resizeMode: "contain",
  },
  slideTitle: {
    fontSize: getFontSize(24),
    fontWeight: 700,
    textAlign: "center",
    color: theme.color.white,
  },
  slideDesc: {
    fontSize: getFontSize(16),
    textAlign: "center",
    marginTop: 24,
    lineHeight: Platform.OS === "ios" ? 28 : 24,
    color: theme.color.white,
  },
  activeDot: {
    width: 24,
    backgroundColor: theme.color.white,
  },
});
