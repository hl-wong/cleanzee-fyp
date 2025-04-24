import { Platform, StyleSheet, Text } from "react-native";
import React from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { Column, Content } from "../../../components";
import { getFontSize, goBack } from "../../../utils";
import { ImageLayout } from "../../../layouts";

interface AdvertisementDetailScreenProps {
  navigation: any;
  route: any;
}

const AdvertisementDetailScreen: React.FC<AdvertisementDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const { item } = route.params;

  return (
    <ImageLayout
      onBack={() => goBack(navigation)}
      imageUri={item.adverPopUpImage}
    >
      <SafeAreaView edges={["bottom"]}>
        <Content style={{ padding: Platform.OS === "ios" ? 24 : 16 }}>
          <Column gap={16}>
            <Text style={styles.adverTitle}>{item.adverTitle}</Text>
            <Text style={styles.adverDesc}>{item.adverDesc}</Text>
          </Column>
        </Content>
      </SafeAreaView>
    </ImageLayout>
  );
};

export default AdvertisementDetailScreen;

const styles = StyleSheet.create({
  bgImage: {
    height: wp("90%"),
  },
  adverTitle: {
    fontSize: Platform.OS === "ios" ? getFontSize(22) : getFontSize(24),
    fontWeight: 700,
  },
  adverDesc: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    lineHeight: Platform.OS === "ios" ? 28 : 24,
  },
});
