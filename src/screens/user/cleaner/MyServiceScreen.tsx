import { FlatList, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context";
import { Layout } from "../../../layouts";
import { goBack, navigateTo } from "../../../utils";
import { Content, Modal, MyServiceCard } from "../../../components";
import { deleteAssignService, getAssignServices } from "../../../services";

interface MyServiceScreenProps {
  navigation: any;
}

const MyServiceScreen: React.FC<MyServiceScreenProps> = ({ navigation }) => {
  const { cleaner } = useContext(UserContext);

  const [assignServices, setAssignServices] = useState<
    | {
        _id: string;
        serviceName: string;
        servicePrice: string;
        serviceId: {
          _id: string;
          serviceImage: string;
          serviceCategory: string;
          servicePricingType: string;
          servicePrice: {
            _id: string;
            label: string;
          }[];
        };
        optionId: string;
      }[]
    | null
  >([]);
  const fetchServices = async () => {
    const response = await getAssignServices(cleaner._id);
    if (response.status === 200) {
      setAssignServices(response.data);
    }
  };
  useEffect(() => {
    fetchServices();
  }, []);

  const [visible, setVisible] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");
  const handleDelete = async (serviceId: string) => {
    const response = await deleteAssignService(cleaner._id, serviceId);
    if (response.status === 200) {
      fetchServices();
    }
    setVisible(false);
  };

  return (
    <>
      <Layout headerTitle="My Services" onBack={() => goBack(navigation)}>
        <Content bgColor="default">
          <FlatList
            data={assignServices}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ padding: 16, gap: 16 }}
            renderItem={({ item }) => {
              const matchingOption = item.serviceId?.servicePrice.find(
                (option: { _id: string }) => option._id === item.optionId
              );

              return (
                <MyServiceCard
                  serviceImage={item.serviceId?.serviceImage}
                  serviceName={item.serviceName}
                  serviceCategory={item.serviceId?.serviceCategory}
                  onEdit={() => {
                    if (item.optionId) {
                      navigateTo(
                        navigation,
                        "My Service Stack",
                        "Pricing And Time Slot Screen",
                        {
                          selectedService: item.serviceId,
                          selectedOption: matchingOption,
                          existingData: item,
                        }
                      );
                    } else {
                      navigateTo(
                        navigation,
                        "My Service Stack",
                        "Pricing And Time Slot Screen",
                        { selectedService: item.serviceId, existingData: item }
                      );
                    }
                  }}
                  onDelete={() => {
                    setVisible(true);
                    setSelectedServiceId(item._id);
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
        modalTitle="Delete Service"
        modalDesc="Are you sure you want to delete this service?"
        label="Delete"
        onPress={() => handleDelete(selectedServiceId)}
      />
    </>
  );
};

export default MyServiceScreen;

const styles = StyleSheet.create({});
