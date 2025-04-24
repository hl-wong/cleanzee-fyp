import { Image, Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { glob, theme } from "../../assets/styles";
import { StatusBar } from "expo-status-bar";
import { success } from "../../assets/images";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { getFontSize, resetTo } from "../../utils";
import { Button, Column, Content } from "../../components";

interface SuccessScreenProps {
  navigation: any;
  route: any;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ navigation, route }) => {
  const { title, desc } = route.params;

  return (
    <SafeAreaView style={[glob.layout, { backgroundColor: theme.color.white }]}>
      <StatusBar style="dark" />
      <Content bgColor="white" style={[{ padding: 16 }, glob.center]}>
        <Image source={success} style={styles.image} />
        <Column gap={32}>
          <Column gap={16}>
            <Text style={[glob.title, glob.textCenter]}>{title}</Text>
            <Text style={[glob.desc, glob.textCenter]}>{desc}</Text>
          </Column>

          <Button
            variant="primary"
            size={Platform.OS === "ios" ? "lg" : "md"}
            label="Back to Login"
            onPress={() => resetTo(navigation, "Login Screen")}
          />
        </Column>
      </Content>
    </SafeAreaView>
  );
};

export default SuccessScreen;

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
