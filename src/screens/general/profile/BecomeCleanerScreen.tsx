import { Image, Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Layout } from "../../../layouts";
import { getFontSize, goBack, navigateTo } from "../../../utils";
import { Button, Content, Footer } from "../../../components";
import { cleaningTeam } from "../../../assets/images";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { glob } from "../../../assets/styles";

interface BecomeCleanerScreenProps {
  navigation: any;
}

const BecomeCleanerScreen: React.FC<BecomeCleanerScreenProps> = ({
  navigation,
}) => {
  return (
    <Layout headerTitle="Become Cleaner" onBack={() => goBack(navigation)}>
      <Content bgColor="white" style={{ padding: 16 }}>
        <View style={glob.horizontalCenter}>
          <Image source={cleaningTeam} style={styles.image} />
        </View>
        <Text style={styles.desc}>
          To get started, register as a cleaner by providing the necessary
          information.
        </Text>
      </Content>
      <Footer>
        <Button
          variant="primary"
          size={Platform.OS === "ios" ? "lg" : "md"}
          label="Start Registration"
          onPress={() =>
            navigateTo(
              navigation,
              "Become Cleaner Stack",
              "Cleaner Registration Form Screen"
            )
          }
        />
      </Footer>
    </Layout>
  );
};

export default BecomeCleanerScreen;

const styles = StyleSheet.create({
  image: {
    height: responsiveHeight(40),
    width: responsiveWidth(90),
    resizeMode: "contain",
  },
  desc: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    textAlign: "center",
    lineHeight: Platform.OS === "ios" ? 28 : 24,
  },
});
