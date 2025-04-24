import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import * as ImagePicker from "expo-image-picker";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { updateProfilePicture, uploadImageToCloudinary } from "../../services";

const ProfilePictureUploader = () => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const { user, refreshUserData } = useContext(UserContext);

  // refresh if user have profile picture in the database
  useEffect(() => {
    if (user?.profilePicture) {
      setProfilePicture(user.profilePicture);
    }
  }, [user?.profilePicture]);

  const handleLaunchImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access media library is required");
    }

    const selectImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!selectImage.canceled) {
      const selectedImage = selectImage.assets[0].uri;
      // upload to cloudinary
      const imageUri = await uploadImageToCloudinary(
        "profile_pictures",
        "profile_images",
        selectedImage,
        user._id
      );

      if (imageUri) {
        // update profile picture to database
        const response = await updateProfilePicture(user._id, imageUri);
        if (response.status === 200) {
          // set profile picture
          setProfilePicture(imageUri);
          // update recent data from database
          await refreshUserData();
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleLaunchImageLibrary}
        style={{ alignSelf: "center" }}
      >
        {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.image} />
        ) : (
          <MaterialIcons name="account-circle" size={150} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ProfilePictureUploader;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 100,
  },
});
