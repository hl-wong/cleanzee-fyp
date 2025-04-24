import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Layout } from "../../../layouts";
import { getAverageRating, goBack, navigateTo } from "../../../utils";
import { Column, Content, ServiceCard } from "../../../components";
import { UserContext } from "../../../context";
import { getServiceCategory } from "../../../services";
import { glob } from "../../../assets/styles";

interface ServiceCategoryScreenProps {
  navigation: any;
  route: any;
}

const ServiceCategoryScreen: React.FC<ServiceCategoryScreenProps> = ({
  navigation,
  route,
}) => {
  const { category } = route.params;
  const { user } = useContext(UserContext);

  const [services, setServices] = useState<
    | {
        _id: string;
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
      const response = await getServiceCategory(user._id, category);
      if (response.status === 200) {
        setServices(response.data);
      }
    };
    fetchServices();
  }, []);

  const shuffledServices = useMemo(() => {
    if (services) {
      return [...services].sort(() => Math.random() - 0.5);
    }
  }, [services]);

  return (
    <Layout headerTitle={category} onBack={() => goBack(navigation)}>
      <Content bgColor="white">
        <FlatList
          data={
            shuffledServices && shuffledServices?.length % 2 !== 0
              ? ([...shuffledServices, { isPlaceholder: true }] as any)
              : shuffledServices
          }
          numColumns={2}
          contentContainerStyle={{ padding: 16, gap: 16 }}
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
                  serviceImage={item.serviceId?.serviceImage}
                  serviceName={item.serviceName}
                  serviceCategory={item.serviceId?.serviceCategory}
                  servicePrice={item.servicePrice}
                  rating={getAverageRating(item.reviews)}
                  onPress={() =>
                    navigateTo(
                      navigation,
                      "Home Stack",
                      "View Service Screen",
                      { item }
                    )
                  }
                  index={index}
                />
              </Column>
            );
          }}
        />
      </Content>
    </Layout>
  );
};

export default ServiceCategoryScreen;

const styles = StyleSheet.create({});
