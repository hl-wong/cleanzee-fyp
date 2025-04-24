import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Layout } from "../../../layouts";
import { Column, Content, SearchInput, ServiceCard } from "../../../components";
import { glob } from "../../../assets/styles";
import { goBack, navigateTo } from "../../../utils";
import { getAdminServices } from "../../../services";

interface BrowseServiceScreenProps {
  navigation: any;
}

const BrowseServiceScreen: React.FC<BrowseServiceScreenProps> = ({
  navigation,
}) => {
  const [allServices, setAllServices] = useState<
    | {
        _id: string;
        serviceImage: string;
        serviceName: string;
        serviceCategory: string;
        servicePricingType: string;
        servicePrice: {
          _id: string;
          label: string;
          duration: string;
          sqftRange: string;
          price: string;
        }[];
      }[]
    | null
  >([]);
  const [services, setServices] = useState<typeof allServices>([]);
  const fetchServices = async () => {
    const response = await getAdminServices();
    if (response.status === 200) {
      setAllServices(response.data);
      setServices(response.data);
    }
  };
  useEffect(() => {
    fetchServices();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.trim() === "") setServices(allServices ?? []);
    else {
      const filtered = (allServices ?? []).filter((service) =>
        service.serviceName.toLowerCase().includes(query.toLowerCase())
      );
      setServices(filtered);
    }
  };

  return (
    <Layout
      headerTitle="Browse Service"
      onBack={() => goBack(navigation)}
      rightIcon={{
        name: "refresh",
        onPress: async () => await fetchServices(),
      }}
    >
      <Content bgColor="white">
        <ScrollView>
          <Column gap={16}>
            <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
              <SearchInput
                value={searchQuery}
                placeholder="Search services..."
                onChangeText={handleSearch}
              />
            </View>
            <FlatList
              data={
                (services ?? []).length % 2 !== 0
                  ? ([...(services ?? []), { isPlaceholder: true }] as any)
                  : services ?? []
              }
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 16,
                gap: 16,
              }}
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
                      serviceImage={item.serviceImage}
                      serviceName={item.serviceName}
                      serviceCategory={item.serviceCategory}
                      onPress={() =>
                        navigateTo(
                          navigation,
                          "Browse Service Stack",
                          "Service Detail Screen",
                          { item }
                        )
                      }
                      index={index}
                    />
                  </Column>
                );
              }}
              numColumns={2}
              scrollEnabled={false}
            />
          </Column>
        </ScrollView>
      </Content>
    </Layout>
  );
};

export default BrowseServiceScreen;

const styles = StyleSheet.create({});
