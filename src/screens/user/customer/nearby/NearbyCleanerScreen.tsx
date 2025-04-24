import { Image, Platform, StyleSheet, Text, View } from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import * as Location from "expo-location";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import { UserContext } from "../../../../context";
import { getNearbyCleaners } from "../../../../services";
import { Layout } from "../../../../layouts";
import {
  BottomSheetModal,
  Button,
  Column,
  Content,
  IconButton,
  ModalContent,
  Row,
} from "../../../../components";
import { glob, theme } from "../../../../assets/styles";
import {
  getAverageRating,
  getFontSize,
  getStarIcon,
  navigateTo,
} from "../../../../utils";
import MapView, { Circle, Marker, PROVIDER_DEFAULT } from "react-native-maps";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

interface NearbyCleanerScreenProps {
  navigation: any;
}

const NearbyCleanerScreen: React.FC<NearbyCleanerScreenProps> = ({
  navigation,
}) => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLocationAndMoveCamera = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      const { latitude, longitude } = userLocation.coords;
      setLocation({ latitude, longitude });

      if (mapRef.current) {
        mapRef.current.animateCamera({
          center: { latitude, longitude },
          zoom: 15,
        });
      }
      setLoading(false);
    };

    getLocationAndMoveCamera();
  }, []);

  const initialRegion = {
    latitude: location?.latitude ?? 4.2105,
    longitude: location?.longitude ?? 101.9758,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const mapRef = useRef<MapView | null>(null);
  const goToUserLocation = useCallback(() => {
    if (location && mapRef.current) {
      mapRef.current.animateCamera({
        center: { latitude: location.latitude, longitude: location.longitude },
        zoom: 15,
      });
    }
  }, [location]);

  const { user } = useContext(UserContext);
  const [nearbyCleaners, setNearbyCleaners] = useState<
    | {
        _id: string;
        userId: {
          firstName: string;
          lastName: string;
          profilePicture: string;
        };
        latitude: number;
        longitude: number;
      }[]
    | null
  >([]);
  const [circleVisible, setCircleVisible] = useState(false);
  const fetchNearbyCleaners = async () => {
    const response = await getNearbyCleaners(
      user._id,
      location?.latitude,
      location?.longitude
    );
    if (response.status === 200) {
      setNearbyCleaners(response.data);
      setCircleVisible(true);
    }
  };

  const [visible, setVisible] = useState(false);
  const [selectedCleaner, setSelectedCleaner] = useState<{
    _id: string;
    userId: {
      firstName: string;
      lastName: string;
      profilePicture: string;
    };
    reviews?: { userRating: number }[];
  } | null>(null);

  return (
    <>
      <Layout headerTitle="Nearby Cleaners">
        <Content bgColor="white">
          <MapView
            provider={PROVIDER_DEFAULT}
            style={glob.container}
            initialRegion={initialRegion}
            ref={(ref) => (mapRef.current = ref)}
          >
            {location && (
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                title="You are here"
                pinColor="blue"
              />
            )}

            {nearbyCleaners?.map((cleaner) => (
              <Marker
                key={cleaner._id}
                coordinate={{
                  latitude: cleaner.latitude,
                  longitude: cleaner.longitude,
                }}
                onPress={() => {
                  setVisible(true);
                  setSelectedCleaner(cleaner);
                }}
              />
            ))}

            {location && circleVisible && (
              <Circle
                center={{
                  latitude: location?.latitude ?? 4.2105,
                  longitude: location?.longitude ?? 101.9758,
                }}
                radius={5000}
                strokeWidth={2}
                strokeColor={theme.color.primary}
                fillColor="rgba(0,122,255,0.2)"
              />
            )}
          </MapView>

          <Column
            gap={16}
            style={{ position: "absolute", bottom: 20, right: 20 }}
          >
            <IconButton
              variant="circle"
              size="lg"
              name="people"
              iconColor={theme.color.white}
              onPress={fetchNearbyCleaners}
            />

            <IconButton
              variant="circle"
              size="lg"
              name="my-location"
              iconColor={theme.color.white}
              onPress={goToUserLocation}
            />
          </Column>
        </Content>
      </Layout>

      {visible && selectedCleaner && (
        <BottomSheetModal setStatus={setVisible}>
          <ModalContent style={{ padding: 16 }}>
            <Column gap={16}>
              <Row gap={16} style={glob.horizontalCenter}>
                {selectedCleaner.userId?.profilePicture ? (
                  <Image
                    source={{ uri: selectedCleaner.userId.profilePicture }}
                    style={styles.userImage}
                  />
                ) : (
                  <MaterialIcons name="account-circle" size={60} />
                )}

                <Column gap={Platform.OS === "ios" ? 6 : 4}>
                  <Text style={styles.userName}>
                    {`${selectedCleaner.userId.firstName} ${selectedCleaner.userId.lastName}`}
                  </Text>
                  <Row gap={6} style={glob.horizontalCenter}>
                    <FontAwesomeIcons
                      name={getStarIcon(
                        getAverageRating(selectedCleaner.reviews)
                      )}
                      size={16}
                      color={
                        getAverageRating(selectedCleaner.reviews) === "N/A"
                          ? "#D3D3D3"
                          : "#FFD700"
                      }
                    />
                    <Text>{`${getAverageRating(
                      selectedCleaner.reviews
                    )}`}</Text>
                  </Row>
                </Column>
              </Row>
              <Row gap={16}>
                <Button
                  variant="primary"
                  size={Platform.OS === "ios" ? "lg" : "md"}
                  label="Chat"
                  style={{ flex: 1 }}
                  hasIcon={{ name: "chat" }}
                  onPress={() =>
                    navigateTo(
                      navigation,
                      "Nearby Cleaner Stack",
                      "Chat Room Screen",
                      { id: user._id, receiverId: selectedCleaner }
                    )
                  }
                />
                <Button
                  variant="primary"
                  size={Platform.OS === "ios" ? "lg" : "md"}
                  label="Profile"
                  style={{ flex: 1 }}
                  hasIcon={{ name: "person" }}
                  onPress={() =>
                    navigateTo(
                      navigation,
                      "Nearby Cleaner Stack",
                      "Cleaner Profile Screen",
                      { cleaner: selectedCleaner }
                    )
                  }
                />
              </Row>
            </Column>
          </ModalContent>
        </BottomSheetModal>
      )}
    </>
  );
};

export default NearbyCleanerScreen;

const styles = StyleSheet.create({
  userImage: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  userName: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 700,
  },
});
