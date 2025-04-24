import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../../../context";
import { ImageLayout } from "../../../layouts";
import {
  getAverageRating,
  getFontSize,
  goBack,
  navigateTo,
} from "../../../utils";
import {
  Availability,
  Button,
  CleanerOverview,
  Column,
  Content,
  IconButton,
  Row,
  ServiceCard,
} from "../../../components";
import { glob, theme } from "../../../assets/styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { getAssignServices } from "../../../services";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

interface CleanerProfileScreenProps {
  navigation: any;
  route: any;
}

const CleanerProfileScreen: React.FC<CleanerProfileScreenProps> = ({
  navigation,
  route,
}) => {
  const { user } = useContext(UserContext);
  const { cleaner } = route.params;
  const cleanerName = `${cleaner.userId?.firstName} ${cleaner.userId?.lastName}`;

  const [services, setServices] = useState<
    | {
        serviceName: string;
        servicePrice: string;
        serviceId: {
          serviceImage: string;
          serviceCategory: string;
        };
      }[]
    | null
  >([]);
  useEffect(() => {
    const fetchServices = async () => {
      const response = await getAssignServices(cleaner._id);
      if (response.status === 200) {
        setServices(response.data);
      }
    };

    fetchServices();
  }, []);

  const shuffledServices = useMemo(() => {
    return [...(services ?? [])].sort(() => Math.random() - 0.5);
  }, [services]);

  const serviceToDisplay = shuffledServices.slice(0, 4);

  return (
    <ImageLayout
      onBack={() => goBack(navigation)}
      imageUri={cleaner.userId.profilePicture}
    >
      <Content
        bgColor="white"
        style={{ padding: Platform.OS === "ios" ? 24 : 16 }}
      >
        <Column gap={24}>
          <Row style={glob.spaceBetween}>
            <Column gap={8}>
              <Text style={styles.cleanerName}>{cleanerName}</Text>
              <Row gap={8} style={glob.horizontalCenter}>
                <MaterialIcons
                  name="location-pin"
                  size={24}
                  color={theme.color.info}
                />
                <Text style={styles.cleanerLocation}>Klang, Selangor</Text>
              </Row>
            </Column>
            <IconButton
              variant="circle"
              size="md"
              name="chat"
              iconSize={20}
              iconColor={theme.color.white}
              onPress={() =>
                navigateTo(
                  navigation,
                  "Nearby Cleaner Stack",
                  "Chat Room Screen",
                  { id: user._id, receiverId: cleaner }
                )
              }
            />
          </Row>

          <CleanerOverview
            reviews={cleaner?.reviews}
            joinedAt={cleaner?.joinedAt}
            onRating={() =>
              navigateTo(
                navigation,
                "Nearby Cleaner Stack",
                "Cleaner Rating Screen",
                { reviews: cleaner?.reviews }
              )
            }
          />

          {cleaner.availability.length > 0 && (
            <Availability data={cleaner.availability} />
          )}
          {services && services.length > 0 && (
            <Column gap={16}>
              <Row style={[glob.horizontalCenter, glob.spaceBetween]}>
                <Text style={styles.label}>Services</Text>
                <Button
                  variant="link"
                  label="View All"
                  onPress={() =>
                    navigateTo(
                      navigation,
                      "Nearby Cleaner Stack",
                      "View All Screen",
                      { view: "cleaner", cleaner }
                    )
                  }
                />
              </Row>
              <FlatList
                data={
                  (serviceToDisplay ?? []).length % 2 !== 0
                    ? ([
                        ...(serviceToDisplay ?? []),
                        { isPlaceholder: true },
                      ] as any)
                    : serviceToDisplay ?? []
                }
                scrollEnabled={false}
                numColumns={2}
                contentContainerStyle={{ gap: 16 }}
                renderItem={({ item, index }) => {
                  if (item.isPlaceholder) {
                    return <View style={{ flex: 1, marginLeft: 8 }} />;
                  }

                  return (
                    <Column
                      style={[
                        glob.horizontalCenter,
                        { flex: 1 },
                        index % 2 === 0
                          ? { marginRight: 8 }
                          : { marginLeft: 8 },
                      ]}
                    >
                      <ServiceCard
                        serviceImage={item.serviceId?.serviceImage}
                        serviceName={item.serviceName}
                        serviceCategory={item.serviceId?.serviceCategory}
                        servicePrice={item.servicePrice}
                        rating={getAverageRating(item.reviews)}
                        index={index}
                        onPress={() =>
                          navigateTo(
                            navigation,
                            "Nearby Cleaner Stack",
                            "View Service Screen",
                            { item }
                          )
                        }
                        style={{ width: wp("43%") }}
                      />
                    </Column>
                  );
                }}
              />
            </Column>
          )}
        </Column>
      </Content>
    </ImageLayout>
  );
};

export default CleanerProfileScreen;

const styles = StyleSheet.create({
  cleanerName: {
    fontSize: Platform.OS === "ios" ? getFontSize(22) : getFontSize(24),
    fontWeight: 700,
    color: theme.color.primary,
  },
  cleanerLocation: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 500,
  },
  label: {
    fontSize: Platform.OS === "ios" ? getFontSize(16) : getFontSize(18),
    fontWeight: 700,
  },
});
