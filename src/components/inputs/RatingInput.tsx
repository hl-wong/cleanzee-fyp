import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { getFontSize } from "../../utils";
import StarRating from "react-native-star-rating-widget";
import Column from "../Column";
import { FormErrorMessage } from "../errors";

interface RatingInputProps {
  label: string;
  value: number;
  onChange: (rating: number) => void;
  style?: StyleProp<ViewStyle>;
  starStyle?: StyleProp<ViewStyle>;
  errors?: string;
}

const RatingInput: React.FC<RatingInputProps> = ({
  label,
  value,
  onChange,
  style,
  starStyle,
  errors,
}) => {
  return (
    <View style={style}>
      <Text style={styles.label}>{label}</Text>
      <Column gap={8} style={[label && { marginTop: 8 }]}>
        <StarRating
          rating={value}
          onChange={onChange}
          maxStars={5}
          starStyle={starStyle}
        />

        {errors && <FormErrorMessage errors={errors} />}
      </Column>
    </View>
  );
};

export default RatingInput;

const styles = StyleSheet.create({
  label: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 600,
  },
});
