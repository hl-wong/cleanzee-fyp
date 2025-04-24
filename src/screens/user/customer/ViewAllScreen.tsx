import { FlatList, StyleSheet, View } from "react-native";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Layout } from "../../../layouts";
import { getAverageRating, goBack, navigateTo } from "../../../utils";
import {
  Column,
  Content,
  ServiceCard,
  ServiceCategoryCard,
} from "../../../components";
import { glob } from "../../../assets/styles";
import { categoryMenu } from "../../../constants";
import { UserContext } from "../../../context";
import { getAssignServices, getRandomServices } from "../../../services";

interface ViewAllScreenProps {
  navigation: any;
  route: any;
}

const ViewAllScreen: React.FC<ViewAllScreenProps> = ({ navigation, route }) => {
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
      if (view === "recommended") {
        const response = await getRandomServices(user._id);
        if (response.status === 200) {
          setServices(response.data);
        }
      }

      if (view === "cleaner") {
        const response = await getAssignServices(cleaner._id);
        if (response.status === 200) {
          setServices(response.data);
        }
      }
    };

    fetchServices();
  }, []);

  const shuffledServices = useMemo(() => {
    if (services) {
      return [...services].sort(() => Math.random() - 0.5);
    }
  }, [services]);

  const { view, cleaner } = route.params;

  return (
    <Layout headerTitle="View All" onBack={() => goBack(navigation)}>
      <Content
        bgColor={
          view === "recommended" || view === "cleaner" ? "white" : "default"
        }
      >
        {view === "recommended" && (
          <FlatList
            data={
              shuffledServices && shuffledServices?.length % 2 !== 0
                ? ([...shuffledServices, { isPlaceholder: true }] as any)
                : shuffledServices
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
            numColumns={2}
            contentContainerStyle={{ padding: 16, gap: 16 }}
          />
        )}
        {view === "category" && (
          <FlatList
            data={categoryMenu}
            renderItem={({ item, index }) => {
              return (
                <ServiceCategoryCard
                  index={index}
                  name={item.name}
                  label={item.label}
                  onPress={() =>
                    navigateTo(
                      navigation,
                      "Home Stack",
                      "Service Category Screen",
                      { category: item.label }
                    )
                  }
                />
              );
            }}
            contentContainerStyle={{ padding: 16, gap: 16 }}
          />
        )}
        {view === "cleaner" && (
          <FlatList
            data={
              shuffledServices && shuffledServices?.length % 2 !== 0
                ? ([...shuffledServices, { isPlaceholder: true }] as any)
                : shuffledServices
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
                    serviceImage={item.serviceId?.serviceImage}
                    serviceName={item.serviceName}
                    serviceCategory={item.serviceId?.serviceCategory}
                    servicePrice={item.servicePrice}
                    index={index}
                    onPress={() =>
                      navigateTo(
                        navigation,
                        "Nearby Cleaner Stack",
                        "View Service Screen",
                        { item }
                      )
                    }
                  />
                </Column>
              );
            }}
            numColumns={2}
            contentContainerStyle={{ padding: 16, gap: 16 }}
          />
        )}
      </Content>
    </Layout>
  );
};

export default ViewAllScreen;

const styles = StyleSheet.create({});
