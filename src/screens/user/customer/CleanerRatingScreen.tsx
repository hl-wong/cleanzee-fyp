import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Layout } from "../../../layouts";
import { Content, RRItem } from "../../../components";
import { goBack } from "../../../utils";

interface CleanerRatingScreenProps {
  navigation: any;
  route: any;
}

const CleanerRatingScreen: React.FC<CleanerRatingScreenProps> = ({
  navigation,
  route,
}) => {
  const { reviews } = route.params;

  return (
    <Layout headerTitle="Ratings and Reviews" onBack={() => goBack(navigation)}>
      <Content bgColor="white">
        <FlatList
          data={reviews}
          renderItem={({ item }) => {
            const userName = `${item.userId?.firstName} ${item.userId?.lastName}`;
            return (
              <RRItem
                userProfilePicture={item.userId?.profilePicture}
                userName={userName}
                userRating={item.userRating}
                userReview={item.userReview}
                date={item.createdAt}
              />
            );
          }}
        />
      </Content>
    </Layout>
  );
};

export default CleanerRatingScreen;

const styles = StyleSheet.create({});
