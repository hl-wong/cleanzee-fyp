import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { glob, theme } from "../../../assets/styles";
import { UserContext } from "../../../context";
import { navigateTo, resetTo } from "../../../utils";
import { getActiveAdvertisements, getRandomServices } from "../../../services";
import { categoryMenu } from "../../../constants";
import {
  AdvertisementBanner,
  Column,
  Content,
  HomeHeader,
  RecommendedService,
  ServiceCategories,
} from "../../../components";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { user, refreshUserData, setUser, setCleaner } =
    useContext(UserContext);

  const [advertisements, setAdvertisements] = useState<
    {
      _id: string;
      adverPopUpImage: string;
      adverBannerImage: string;
    }[]
  >([]);
  useEffect(() => {
    const fetchAdvertisements = async () => {
      const response = await getActiveAdvertisements();
      if (response.status === 200) {
        setAdvertisements(response.data);
        setModalVisible(true);
      }
    };

    fetchAdvertisements();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (!modalVisible || advertisements.length <= 1) return;

    let interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 < advertisements.length ? prevIndex + 1 : 0
      );
    }, 8000);

    return () => clearInterval(interval);
  }, [modalVisible, advertisements.length]);

  const [services, setServices] = useState([]);

  useEffect(() => {
    if (!user?._id) return;

    const fetchServices = async () => {
      const response = await getRandomServices(user._id);
      if (response.status === 200) {
        setServices(response.data);
      }
    };

    fetchServices();
  }, [user?._id]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await refreshUserData();
      } catch (e: any) {
        if (e.error === "Account no longer exists") {
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("user");
          await AsyncStorage.removeItem("role");

          setUser(null);
          setCleaner(null);

          resetTo(navigation, [
            { name: "Intro Stack" },
            { name: "Auth Stack" },
          ]);
        }
      }
    };

    fetchUser();
  }, [user?._id]);

  return (
    <>
      <SafeAreaView
        edges={["top"]}
        style={[glob.layout, { backgroundColor: theme.color.white }]}
      >
        <StatusBar style="dark" />
        <HomeHeader
          userName={`${user?.firstName} ${user?.lastName}`}
          onPress={() =>
            navigateTo(navigation, "Home Stack", "Notification Screen")
          }
          navigation={navigation}
        />
        <Content bgColor="white">
          <ScrollView
            style={styles.scroll}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            <Column gap={24}>
              {advertisements.length > 0 && (
                <AdvertisementBanner
                  advertisements={advertisements}
                  navigation={navigation}
                />
              )}
              <ServiceCategories
                category={categoryMenu}
                navigation={navigation}
              />
              <RecommendedService services={services} navigation={navigation} />
            </Column>
          </ScrollView>
        </Content>
      </SafeAreaView>

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={[glob.container, glob.center, styles.overlay]}>
          {advertisements.length > 0 && (
            <View style={styles.imageWrapper}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.close}
                onPress={() => setModalVisible(false)}
              >
                <MaterialIcons
                  name="close"
                  size={24}
                  color={theme.color.white}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setModalVisible(false);
                  navigateTo(
                    navigation,
                    "Home Stack",
                    "Advertisement Detail Screen",
                    { item: advertisements[currentIndex] }
                  );
                }}
              >
                <Image
                  source={{
                    uri: advertisements[currentIndex]?.adverPopUpImage,
                  }}
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  scroll: {
    paddingVertical: 16,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    height: wp("90%"),
    width: wp("90%"),
  },
  close: {
    position: "absolute",
    top: -15,
    right: -15,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 100,
    padding: 6,
    zIndex: 10,
  },
});
