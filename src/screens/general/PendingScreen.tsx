import { Image, Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { getFontSize, resetTo } from "../../utils";
import { pending } from "../../assets/images";
import { glob, theme } from "../../assets/styles";
import { Button, Column, Content } from "../../components";

interface PendingScreenProps {
  navigation: any;
  route: any;
}

const PendingScreen: React.FC<PendingScreenProps> = ({ navigation, route }) => {
  const { title, desc } = route.params;

  return (
    <SafeAreaView style={[glob.layout, { backgroundColor: theme.color.white }]}>
      <StatusBar style="dark" />
      <Content bgColor="white" style={[{ padding: 16 }, glob.center]}>
        <Image source={pending} style={styles.image} />
        <Column gap={32}>
          <Column gap={16}>
            <Text style={[glob.title, glob.textCenter]}>{title}</Text>
            <Text style={[glob.desc, glob.textCenter]}>{desc}</Text>
          </Column>

          <Button
            variant="primary"
            size={Platform.OS === "ios" ? "lg" : "md"}
            label="Back to Profile"
            onPress={() => resetTo(navigation, "Profile Screen")}
          />
        </Column>
      </Content>
    </SafeAreaView>
  );
};

export default PendingScreen;

const styles = StyleSheet.create({
  image: {
    width: responsiveWidth(40),
    height: responsiveHeight(30),
    resizeMode: "contain",
  },
  title: {
    fontSize: getFontSize(24),
    fontWeight: 700,
    textAlign: "center",
  },
});
