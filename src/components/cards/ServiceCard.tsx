import {
  Image,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Column from "../Column";
import { getFontSize, getStarIcon } from "../../utils";
import { glob, theme } from "../../assets/styles";
import Row from "../Row";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";

interface ServiceCardProps {
  serviceImage: string;
  serviceName: string;
  serviceCategory: string;
  servicePrice?: string;
  rating?: string;
  onPress?: () => void;
  index: number;
  style?: StyleProp<ViewStyle>;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  serviceImage,
  serviceName,
  serviceCategory,
  servicePrice,
  rating,
  onPress,
  index,
  style,
}) => {
  return (
    <Animatable.View animation="fadeInUp" delay={index * 200}>
      <TouchableOpacity
        style={[styles.serviceCard, style]}
        activeOpacity={0.8}
        onPress={onPress}
      >
        <Column gap={8}>
          <Image source={{ uri: serviceImage }} style={styles.serviceImage} />
          <Column gap={2}>
            <Text numberOfLines={1} style={styles.serviceName}>
              {serviceName}
            </Text>
            <Text style={styles.serviceCategory}>{serviceCategory}</Text>
            {rating && (
              <Row gap={4} style={glob.horizontalCenter}>
                <FontAwesomeIcons name={getStarIcon(rating)} />
                <Text style={styles.serviceRating}>({rating})</Text>
              </Row>
            )}
            {servicePrice && (
              <Text>
                <Text style={styles.servicePrice}>{`RM${servicePrice}`}</Text>
                /hour
              </Text>
            )}
          </Column>
        </Column>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  serviceCard: {
    width: wp("45%"),
  },
  serviceImage: {
    height: hp("18%"),
    width: "100%",
    resizeMode: "cover",
    borderRadius: 8,
  },
  serviceName: {
    fontWeight: 500,
  },
  serviceCategory: {
    color: "#666",
    fontSize: Platform.OS === "ios" ? getFontSize(12) : getFontSize(14),
    width: "100%",
  },
  serviceRating: {
    fontSize: getFontSize(12),
  },
  servicePrice: {
    color: theme.color.primary,
    fontSize: Platform.OS === "ios" ? getFontSize(16) : getFontSize(18),
    fontWeight: 700,
  },
});
