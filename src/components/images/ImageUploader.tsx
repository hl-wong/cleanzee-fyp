import {
  Alert,
  Image,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { getFontSize } from "../../utils";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { glob } from "../../assets/styles";
import Column from "../Column";
import * as FileSystem from "expo-file-system";
import { FormErrorMessage } from "../errors";

interface ImageUploaderProps {
  onImageSelected: (imageUri: string | null) => void;
  initialValues?: string;
  size?: {
    width: number;
    height: number;
  };
  errors?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelected,
  initialValues,
  size,
  errors,
}) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const handlePress = () => {
    const options = imageUri
      ? ["View Image", "Upload Image", "Cancel"]
      : ["Upload Image", "Cancel"];
    const cancelButtonIndex = options.length - 1;

    showActionSheetWithOptions(
      { options, cancelButtonIndex },
      (selectedIndex) => {
        if (selectedIndex === undefined) return;

        if (options[selectedIndex] === "View Image") {
          handleViewImage();
        } else if (options[selectedIndex] === "Upload Image") {
          handleLaunchImageLibrary();
        }
      }
    );
  };

  const [imageUri, setImageUri] = useState<string | null>(
    initialValues || null
  );
  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  const handleLaunchImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access media library is required");
    }

    const selectImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: size ? [size.width, size.height] : [1, 1],
      quality: 1,
    });

    if (!selectImage.canceled) {
      const selectedImage = selectImage.assets[0];
      const { uri, width, height } = selectedImage;

      if (size && (width != size.width || height != size.height)) {
        Alert.alert(
          "Invalid Image Size",
          `Please upload an image of size ${size.width}x${size.height}`
        );
        return;
      }

      const fileSize = await getFileSize(uri);
      if (fileSize > MAX_FILE_SIZE) {
        Alert.alert(
          "File size too large",
          `Please upload a file smaller than ${MAX_FILE_SIZE / (1024 * 1024)}MB`
        );
        return;
      }

      setImageUri(uri);
      onImageSelected(uri);
    }
  };

  const getFileSize = async (uri: string) => {
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (fileInfo.exists) {
      return fileInfo.size;
    } else {
      throw new Error("File not found");
    }
  };

  const [modalVisible, setModalVisible] = useState(false);
  const handleViewImage = () => {
    setModalVisible(true);
  };

  return (
    <>
      <Column gap={8}>
        <TouchableOpacity
          style={[styles.imageUploader, !imageUri && styles.placeholder]}
          activeOpacity={0.8}
          onPress={handlePress}
        >
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <>
              <MaterialIcons name="add" size={24} color="#A6A6A6" />
              <Text style={styles.upload}>Upload</Text>
            </>
          )}
        </TouchableOpacity>

        {errors && <FormErrorMessage errors={errors} />}
      </Column>

      <Modal visible={modalVisible} transparent={true}>
        <Pressable
          style={[styles.overlay, glob.center]}
          onPress={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback>
            <Image
              source={imageUri ? { uri: imageUri } : undefined}
              style={styles.enlargeImage}
            />
          </TouchableWithoutFeedback>
        </Pressable>
      </Modal>
    </>
  );
};

export default ImageUploader;

const styles = StyleSheet.create({
  imageUploader: {
    height: wp("28%"),
    width: wp("28%"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  placeholder: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#A6A6A6",
  },
  upload: {
    color: "#A6A6A6",
    fontSize: Platform.OS === "ios" ? getFontSize(12) : getFontSize(14),
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 4,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  enlargeImage: {
    height: wp("85%"),
    width: wp("85%"),
    resizeMode: "contain",
  },
});
