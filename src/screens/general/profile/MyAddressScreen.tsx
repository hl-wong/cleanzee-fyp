import { FlatList, Platform, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import { UserContext } from "../../../context";
import { Layout } from "../../../layouts";
import { goBack, navigateTo } from "../../../utils";
import Dialog from "react-native-dialog";
import { deleteAddress } from "../../../services";
import { AddressCard, Button, Content } from "../../../components";
import { View } from "react-native";

interface MyAddressScreenProps {
  navigation: any;
}

const MyAddressScreen: React.FC<MyAddressScreenProps> = ({ navigation }) => {
  const { user, refreshUserData } = useContext(UserContext);

  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState<{
    title: string;
    description: string;
  } | null>(null);

  return (
    <>
      <Layout
        headerTitle="My Addresses"
        onBack={() => goBack(navigation)}
        rightIcon={{
          name: "add",
          onPress: () =>
            navigateTo(navigation, "My Address Stack", "New Address Screen"),
        }}
      >
        <Content bgColor="default">
          <FlatList
            data={user?.address}
            renderItem={({ item }) => (
              <AddressCard
                data={item}
                onEdit={() =>
                  navigateTo(
                    navigation,
                    "My Address Stack",
                    "Edit Address Screen",
                    { item }
                  )
                }
                onDelete={async () => {
                  try {
                    const response = await deleteAddress(user._id, item._id);
                    if (response.status === 200) {
                      await refreshUserData();
                    }
                  } catch (e: any) {
                    console.log(e.message);
                    setErrors({
                      title: "Delete Failed",
                      description: e.message,
                    });
                    setVisible(true);
                  }
                }}
              />
            )}
            contentContainerStyle={{ padding: 16, gap: 16 }}
            ListFooterComponent={() => (
              <View style={{ marginTop: 8 }}>
                <Button
                  variant="primary"
                  size={Platform.OS === "ios" ? "lg" : "md"}
                  label="New Address"
                  onPress={() =>
                    navigateTo(
                      navigation,
                      "My Address Stack",
                      "New Address Screen"
                    )
                  }
                />
              </View>
            )}
          />
        </Content>
      </Layout>

      <Dialog.Container visible={visible}>
        <Dialog.Title>{errors?.title}</Dialog.Title>
        <Dialog.Description>{errors?.description}</Dialog.Description>
        <Dialog.Button label="OK" onPress={() => setVisible(false)} />
      </Dialog.Container>
    </>
  );
};

export default MyAddressScreen;

const styles = StyleSheet.create({});
