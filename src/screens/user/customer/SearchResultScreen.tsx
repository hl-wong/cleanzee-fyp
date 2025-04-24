import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Layout } from "../../../layouts";
import { getAverageRating, goBack, navigateTo } from "../../../utils";
import { Column, Content, ServiceCard } from "../../../components";
import { glob } from "../../../assets/styles";

interface SearchResultScreenProps {
  navigation: any;
  route: any;
}

const SearchResultScreen: React.FC<SearchResultScreenProps> = ({
  navigation,
  route,
}) => {
  const { search, result } = route.params;

  return (
    <Layout headerTitle={search} onBack={() => goBack(navigation)}>
      <Content bgColor="white">
        <FlatList
          numColumns={2}
          contentContainerStyle={{ padding: 16, gap: 16 }}
          data={
            (result ?? 0).length % 2 !== 0
              ? ([...(result ?? []), { isPlaceholder: true }] as any)
              : result ?? []
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
        />
      </Content>
    </Layout>
  );
};

export default SearchResultScreen;

const styles = StyleSheet.create({});
