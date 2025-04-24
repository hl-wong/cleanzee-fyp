import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { deleteService, getServices } from "../../../services";
import { Layout } from "../../../layouts";
import { goBack, navigateTo } from "../../../utils";
import { Content, Modal, ServiceManagementCard } from "../../../components";

interface ServiceManagementScreenProps {
  navigation: any;
}

const ServiceManagementScreen: React.FC<ServiceManagementScreenProps> = ({
  navigation,
}) => {
  const [services, setServices] = useState<
    | {
        _id: string;
        serviceImage: string;
        serviceName: string;
        serviceCategory: string;
      }[]
    | null
  >([]);

  const fetchServices = async () => {
    const response = await getServices();
    if (response.status === 200) {
      setServices(response.data);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const [visible, setVisible] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");
  const handleDelete = async (serviceId: string) => {
    const response = await deleteService(serviceId);
    if (response.status === 200) {
      fetchServices();
    }
    setVisible(false);
  };

  return (
    <>
      <Layout
        headerTitle="Service Management"
        onBack={() => goBack(navigation)}
        rightIcon={{
          name: "add",
          onPress: () =>
            navigateTo(
              navigation,
              "Service Management Stack",
              "New Service Screen"
            ),
        }}
      >
        <Content bgColor="default">
          <FlatList
            data={services}
            contentContainerStyle={{ padding: 16, gap: 16 }}
            renderItem={({ item }) => {
              return (
                <ServiceManagementCard
                  serviceImage={item.serviceImage}
                  serviceName={item.serviceName}
                  serviceCategory={item.serviceCategory}
                  onEdit={() => {
                    navigateTo(
                      navigation,
                      "Service Management Stack",
                      "Edit Service Screen",
                      { item }
                    );
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

export default ServiceManagementScreen;

const styles = StyleSheet.create({});
