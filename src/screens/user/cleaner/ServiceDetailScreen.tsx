import { FlatList, Platform, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { ImageLayout } from "../../../layouts";
import { getFontSize, goBack, navigateTo } from "../../../utils";
import {
  BottomSheetModal,
  Button,
  Column,
  Content,
  Footer,
  ModalContent,
  ReadMoreText,
  ServiceOptionItem,
} from "../../../components";
import { theme } from "../../../assets/styles";

interface ServiceDetailScreenProps {
  navigation: any;
  route: any;
}

const ServiceDetailScreen: React.FC<ServiceDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const { item } = route.params;

  const prices = item.servicePrice.map((p: { price: string }) =>
    Number(p.price)
  );

  const renderPrice = (prices: number[]) => {
    if (prices.length > 1) {
      const uniquePrices = [...new Set(prices)];

      if (uniquePrices.length === 1) {
        return uniquePrices[0];
      } else {
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        return `RM${minPrice} - RM${maxPrice}`;
      }
    }

    return prices.join(", ");
  };

  const [visible, setVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<{
    servicePricingType: string;
    servicePrice: {
      _id: string;
      label: string;
      duration: string;
      sqftRange: string;
      price: string;
    }[];
  } | null>(null);

  return (
    <>
      <ImageLayout
        onBack={() => goBack(navigation)}
        imageUri={item.serviceImage}
        footer={
          <Footer>
            <Button
              variant="primary"
              size={Platform.OS === "ios" ? "lg" : "md"}
              label="Offer Service"
              onPress={() => {
                if (item.servicePrice.length > 1) {
                  setVisible(true);
                  setSelectedService(item);
                } else {
                  navigateTo(
                    navigation,
                    "Browse Service Stack",
                    "Pricing And Time Slot Screen",
                    { selectedService: item }
                  );
                }
              }}
            />
          </Footer>
        }
      >
        <Content
          bgColor="white"
          style={{ padding: Platform.OS === "ios" ? 24 : 16 }}
        >
          <Column gap={Platform.OS === "ios" ? 24 : 16}>
            <Column gap={Platform.OS === "ios" ? 12 : 8}>
              <Column gap={Platform.OS === "ios" ? 8 : 4}>
                <Text style={styles.serviceName}>{item.serviceName}</Text>
                <Text style={styles.serviceCategory}>
                  {item.serviceCategory}
                </Text>
              </Column>

              {item.servicePricingType === "Fixed" && prices.length === 1 && (
                <Text style={styles.servicePrice}>{`RM${prices[0]}`}</Text>
              )}

              {(item.servicePricingType === "Hour" ||
                item.servicePricingType === "Sqft") &&
                prices.length === 1 && (
                  <Text>
                    <Text style={styles.servicePrice}>{`RM${prices[0]}`}</Text>/
                    {item.servicePricingType}
                  </Text>
                )}

              {(item.servicePricingType === "Hour" ||
                item.servicePricingType === "Sqft") &&
                prices.length > 1 && (
                  <Text>
                    <Text style={styles.servicePrice}>
                      {renderPrice(prices)}
                    </Text>
                    /{item.servicePricingType}
                  </Text>
                )}
            </Column>

            <ReadMoreText text={item.serviceDesc} />
          </Column>
        </Content>
      </ImageLayout>

      {visible && (
        <BottomSheetModal setStatus={setVisible}>
          <ModalContent>
            <FlatList
              data={selectedService?.servicePrice}
              contentContainerStyle={{ padding: 8 }}
              renderItem={({ item, index }) => {
                const isLastItem =
                  index === (selectedService?.servicePrice.length ?? 0) - 1;
                return (
                  <ServiceOptionItem
                    label={item.label}
                    price={item.price}
                    detail={
                      selectedService?.servicePricingType === "Sqft"
                        ? `${item.sqftRange} sqft`
                        : selectedService?.servicePricingType === "Hour"
                        ? `${item.duration} hour`
                        : ""
                    }
                    style={
                      isLastItem
                        ? { borderBottomWidth: 0 }
                        : { borderBottomWidth: 1, borderColor: "#D9D9D9" }
                    }
                    iconName="add"
                    onPress={() =>
                      navigateTo(
                        navigation,
                        "Browse Service Stack",
                        "Pricing And Time Slot Screen",
                        {
                          selectedService: selectedService,
                          selectedOption: item,
                        }
                      )
                    }
                  />
                );
              }}
            />
          </ModalContent>
        </BottomSheetModal>
      )}
    </>
  );
};

export default ServiceDetailScreen;

const styles = StyleSheet.create({
  serviceName: {
    fontSize: Platform.OS === "ios" ? getFontSize(22) : getFontSize(24),
    fontWeight: 700,
  },
  serviceCategory: {
    color: "#666",
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
  },
  servicePrice: {
    fontSize: Platform.OS === "ios" ? getFontSize(22) : getFontSize(24),
    fontWeight: 700,
    color: theme.color.primary,
  },
});
