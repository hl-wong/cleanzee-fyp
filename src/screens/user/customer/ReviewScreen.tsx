import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { glob } from "../../../assets/styles";
import { RRItem } from "../../../components";

interface ReviewScreenProps {
  reviews: {
    userId: {
      firstName: string;
      lastName: string;
      profilePicture: string;
    };
    userRating: number;
    userReview: string;
    createdAt: string;
  }[];
}

const ReviewScreen: React.FC<ReviewScreenProps> = ({ reviews }) => {
  return (
    <View style={glob.container}>
      <FlatList
        data={reviews}
        scrollEnabled={false}
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
    </View>
  );
};

export default ReviewScreen;

const styles = StyleSheet.create({});
