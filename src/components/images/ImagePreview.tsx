import {
  Image,
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import React, { useState } from "react";
import { glob } from "../../assets/styles";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

interface ImagePreviewProps {
  imageUri: string;
  style?: StyleProp<ViewStyle>;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUri, style }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.imagePreview, style]}
        onPress={() => setModalVisible(true)}
      >
        <Image source={{ uri: imageUri }} style={styles.image} />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true}>
        <Pressable
          style={[styles.overlay, glob.center]}
          onPress={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback>
            <Image source={{ uri: imageUri }} style={styles.enlargeImage} />
          </TouchableWithoutFeedback>
        </Pressable>
      </Modal>
    </View>
  );
};

export default ImagePreview;

const styles = StyleSheet.create({
  imagePreview: {
    height: 80,
    width: 80,
    borderRadius: 10,
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  enlargeImage: {
    height: wp("85%"),
    width: wp("85%"),
  },
});
