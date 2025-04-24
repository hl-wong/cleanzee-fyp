import { FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { deleteAdvertisement, getAdvertisements } from "../../../services";
import { Layout } from "../../../layouts";
import { goBack, navigateTo } from "../../../utils";
import { AdvertisementCard, Content, Modal } from "../../../components";

interface AdvertisementScreenProps {
  navigation: any;
}

const AdvertisementScreen: React.FC<AdvertisementScreenProps> = ({
  navigation,
}) => {
  const [advertisements, setAdvertisements] = useState<
    | {
        _id: string;
        adverPopUpImage: string;
        adverTitle: string;
        promoCode: string;
      }[]
    | null
  >([]);

  const fetchAdvertisements = async () => {
    const response = await getAdvertisements();
    if (response.status === 200) {
      setAdvertisements(response.data);
    }
  };

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const [visible, setVisible] = useState(false);
  const [selectedAdverId, setSelectedAdverId] = useState<string>("");
  const handleDelete = async (adverId: string) => {
    const response = await deleteAdvertisement(adverId);
    if (response.status === 200) {
      fetchAdvertisements();
    }
    setVisible(false);
  };

  return (
    <>
      <Layout
        headerTitle="Advertisement"
        onBack={() => goBack(navigation)}
        rightIcon={{
          name: "add",
          onPress: () => navigateTo(navigation, "New Advertisement Screen"),
        }}
      >
        <Content bgColor="default">
          <FlatList
            data={advertisements}
            contentContainerStyle={{ padding: 16, gap: 16 }}
            renderItem={({ item }) => {
              return (
                <AdvertisementCard
                  imageUri={item.adverPopUpImage}
                  title={item.adverTitle}
                  promoCode={item.promoCode}
                  onEdit={() =>
                    navigateTo(
                      navigation,
                      "Advertisement Stack",
                      "Edit Advertisement Screen",
                      { item }
                    )
                  }
                  onDelete={() => {
                    setVisible(true);
                    setSelectedAdverId(item._id);
                  }}
                />
              );
            }}
          />
        </Content>
      </Layout>

      <Modal
        visible={visible}
        setVisible={setVisible}
        modalTitle="Delete Advertisement"
        modalDesc="Are you sure you want to delete this advertisement?"
        label="Delete"
        onPress={() => handleDelete(selectedAdverId)}
      />
    </>
  );
};

export default AdvertisementScreen;

const styles = StyleSheet.create({});
