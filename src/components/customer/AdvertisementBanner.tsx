import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Column from "../Column";
import Row from "../Row";
import { glob, theme } from "../../assets/styles";
import { navigateTo } from "../../utils";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const screenWidth = Dimensions.get("window").width;

interface AdvertisementBannerProps {
  advertisements: {
    _id: string;
    adverBannerImage: string;
  }[];
  navigation: any;
}

const AdvertisementBanner: React.FC<AdvertisementBannerProps> = ({
  advertisements,
  navigation,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setActiveIndex(index);
  };

  const flatlistRef = useRef<FlatList>(null);

  useEffect(() => {
    if (advertisements.length === 0) return;

    let interval = setInterval(() => {
      if (activeIndex === advertisements.length - 1) {
        flatlistRef.current?.scrollToIndex({
          index: 0,
          animated: true,
        });
      } else {
        flatlistRef.current?.scrollToIndex({
          index: activeIndex + 1,
          animated: true,
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [advertisements.length, activeIndex]);

  const getItemLayout = (_: any, index: number) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index: index,
  });

  return (
    <Column gap={16}>
      <FlatList
        data={advertisements}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={[glob.horizontalCenter, { width: screenWidth }]}
              activeOpacity={0.8}
              onPress={() =>
                navigateTo(
                  navigation,
                  "Home Stack",
                  "Advertisement Detail Screen",
                  { item }
                )
              }
            >
              <Image
                source={{ uri: item.adverBannerImage }}
                style={styles.adverBanner}
              />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => item.id || index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        getItemLayout={getItemLayout}
        ref={flatlistRef}
      />

      <Row gap={6} style={glob.center}>
        {advertisements.map((dot, index) => {
          if (activeIndex === index) {
            return <View key={index} style={[styles.dot, styles.active]} />;
          }

          return <View key={index} style={styles.dot} />;
        })}
      </Row>
    </Column>
  );
};

export default AdvertisementBanner;

const styles = StyleSheet.create({
  adverBanner: {
    width: wp("90%"),
    height: wp("35%"),
    resizeMode: "contain",
  },
  dot: {
    backgroundColor: "#D9D9D9",
    height: 10,
    width: 10,
    borderRadius: 100,
  },
  active: {
    backgroundColor: theme.color.primary,
  },
});
