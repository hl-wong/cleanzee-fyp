import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../../../context";
import { HeaderLayout } from "../../../layouts";
import { getFontSize, goBack } from "../../../utils";
import { Content, RRItem } from "../../../components";
import moment from "moment";
import { glob } from "../../../assets/styles";

interface RatingAndReviewScreenProps {
  navigation: any;
}

const RatingAndReviewScreen: React.FC<RatingAndReviewScreenProps> = ({
  navigation,
}) => {
  const { cleaner } = useContext(UserContext);

  const reviews = cleaner?.reviews || [];
  const reviewCount = reviews.length;
  const averageRating =
    reviewCount > 0
      ? reviews.reduce(
          (sum: number, review: { userRating: number }) =>
            sum + review.userRating,
          0
        ) / reviewCount
      : 0;

  return (
    <HeaderLayout
      type="rating"
      headerTitle={reviewCount > 0 ? averageRating.toFixed(1) : "N/A"}
      headerSubtitle={`Based on ${reviewCount} reviews`}
      onBack={() => goBack(navigation)}
      averageRating={averageRating}
    >
      <Content bgColor="white">
        <FlatList
          data={cleaner?.reviews}
          renderItem={({ item }) => {
            const getTimeAgo = (dateString: string) => {
              return moment(dateString).fromNow();
            };

            const userName =
              item.userId?.firstName && item.userId?.lastName
                ? `${item.userId?.firstName} ${item.userId?.lastName}`
                : "Anonymous";

            return (
              <RRItem
                userProfilePicture={item.userId?.profilePicture}
                userName={userName}
                date={item.createdAt}
                userRating={item.userRating}
                userReview={item.userReview}
              />
            );
          }}
          ListEmptyComponent={
            <View style={[glob.container, glob.center]}>
              <Text style={styles.noReview}>No rating and review yet</Text>
            </View>
          }
          contentContainerStyle={{ flexGrow: 1 }}
        />
      </Content>
    </HeaderLayout>
  );
};

export default RatingAndReviewScreen;

const styles = StyleSheet.create({
  noReview: {
    textAlign: "center",
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    color: "#888",
    marginTop: 20,
  },
});
