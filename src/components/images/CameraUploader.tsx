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
import Column from "../Column";
import * as ImagePicker from "expo-image-picker";
import { getFontSize } from "../../utils";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { glob } from "../../assets/styles";
import { FormErrorMessage } from "../errors";

interface CameraUploaderProps {
  label?: string;
  desc?: string;
  onImageSelected: (imageUri: string | null) => void;
  initialValues?: string;
  errors?: string;
}

const CameraUploader: React.FC<CameraUploaderProps> = ({
  label,
  desc,
  onImageSelected,
  initialValues,
  errors,
}) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const handlePress = () => {
    const options = imageUri
      ? ["View Photo", "Take Photo", "Cancel"]
      : ["Take Photo", "Cancel"];
    const cancelButtonIndex = options.length - 1;

    showActionSheetWithOptions(
      { options, cancelButtonIndex },
      (selectedIndex) => {
        if (selectedIndex === undefined) return;

        if (options[selectedIndex] === "View Photo") {
          handleViewPhoto();
        } else if (options[selectedIndex] === "Take Photo") {
          handleLaunchCamera();
        }
      }
    );
  };

  const [imageUri, setImageUri] = useState<string | null>(
    initialValues || null
  );
  const handleLaunchCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to camera access is required");
    }

    const takePhoto = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
      cameraType: ImagePicker.CameraType.front,
    });

    if (!takePhoto.canceled) {
      const photoTaken = takePhoto.assets[0].uri;

      setImageUri(photoTaken);
      // pass the image uri to onImageSelected
      onImageSelected(photoTaken);
    } else {
      console.log("User canceled the photo-taking process.");
      return;
    }
  };

  const [modalVisible, setModalVisible] = useState(false);
  const handleViewPhoto = () => {
    setModalVisible(true);
  };

  return (
    <>
      <Column gap={16}>
        {label && desc && (
          <Column gap={4}>
            {label && <Text style={styles.label}>{label}</Text>}
            {desc && <Text style={styles.desc}>{desc}</Text>}
          </Column>
        )}

        <Column gap={8}>
          <TouchableOpacity
            style={[styles.cameraUploader, !imageUri && styles.placeholder]}
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

export default CameraUploader;

const styles = StyleSheet.create({
  label: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 600,
  },
  desc: {
    color: "#A6A6A6",
    fontSize: Platform.OS === "ios" ? getFontSize(12) : getFontSize(14),
  },
  cameraUploader: {
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
  },
});
