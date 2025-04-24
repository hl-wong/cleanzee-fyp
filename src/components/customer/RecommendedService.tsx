import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import Column from "../Column";
import Row from "../Row";
import { glob } from "../../assets/styles";
import { Button } from "../buttons";
import { getAverageRating, getFontSize, navigateTo } from "../../utils";
import { ServiceCard } from "../cards";

interface RecommendedServiceProps {
  services: {
    _id: string;
    serviceName: string;
    servicePrice: string;
    serviceId: {
      serviceImage: string;
      serviceCategory: string;
    };
  }[];
  navigation: any;
}

const RecommendedService: React.FC<RecommendedServiceProps> = ({
  services,
  navigation,
}) => {
  const shuffledServices = useMemo(() => {
    return [...services].sort(() => Math.random() - 0.5);
  }, [services]);

  const serviceToDisplay = shuffledServices.slice(0, 6);

  return (
    <Column gap={16}>
      <Row
        style={[
          glob.spaceBetween,
          glob.horizontalCenter,
          { paddingHorizontal: 16 },
        ]}
      >
        <Text style={styles.title}>Recommended Services</Text>
        <Button
          variant="link"
          label="View All"
          onPress={() =>
            navigateTo(navigation, "Home Stack", "View All Screen", {
              view: "recommended",
            })
          }
        />
      </Row>
      <FlatList
        data={
          (serviceToDisplay ?? 0).length % 2 !== 0
            ? ([...(serviceToDisplay ?? []), { isPlaceholder: true }] as any)
            : serviceToDisplay ?? []
        }
        renderItem={({ item, index }) => {
          if (item.isPlaceholder) {
            return <View style={{ flex: 1, marginLeft: 8 }} />;
          }

          return (
            <Column
              style={[
                glob.horizontalCenter,
                { flex: 1 },
                index % 2 === 0 ? { marginRight: 8 } : { marginLeft: 8 },
              ]}
            >
              <ServiceCard
                serviceImage={item.serviceId.serviceImage}
                serviceName={item.serviceName}
                serviceCategory={item.serviceId.serviceCategory}
                servicePrice={item.servicePrice}
                rating={getAverageRating(item.reviews)}
                onPress={() =>
                  navigateTo(navigation, "Home Stack", "View Service Screen", {
                    item,
                  })
                }
                index={index}
              />
            </Column>
          );
        }}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 32,
          gap: 16,
        }}
        scrollEnabled={false}
      />
    </Column>
  );
};

export default RecommendedService;

const styles = StyleSheet.create({
  title: {
    fontSize: Platform.OS === "ios" ? getFontSize(16) : getFontSize(18),
    fontWeight: 700,
  },
});
