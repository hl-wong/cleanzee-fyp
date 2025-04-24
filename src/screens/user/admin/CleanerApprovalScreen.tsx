import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  approveCleaner,
  getPendingCleaners,
  rejectCleaner,
} from "../../../services";
import { goBack } from "../../../utils";
import { Layout } from "../../../layouts";
import { CleanerApprovalCard, Content } from "../../../components";

interface CleanerApprovalScreenProps {
  navigation: any;
}

const CleanerApprovalScreen: React.FC<CleanerApprovalScreenProps> = ({
  navigation,
}) => {
  const [cleaners, setCleaners] = useState<
    {
      _id: string;
      fullName: string;
      icNumber: string;
      image: string;
      userId: {
        firstName: string;
        lastName: string;
        profilePicture: string;
        email: string;
      };
    }[]
  >([]);

  const fetchCleaners = async () => {
    const response = await getPendingCleaners();
    if (response.status === 200) {
      setCleaners(response.data);
    }
  };

  useEffect(() => {
    fetchCleaners();
  }, []);

  return (
    <Layout headerTitle="Cleaner Approval" onBack={() => goBack(navigation)}>
      <Content bgColor="default">
        <FlatList
          data={cleaners}
          renderItem={({ item }) => {
            return (
              <CleanerApprovalCard
                data={item}
                onApprove={async () => {
                  const response = await approveCleaner(item._id);
                  if (response.status === 200) {
                    fetchCleaners();
                  }
                }}
                onReject={async () => {
                  const response = await rejectCleaner(item._id);
                  if (response.status === 200) {
                    fetchCleaners();
                  }
                }}
              />
            );
          }}
          contentContainerStyle={{ padding: 16, gap: 16 }}
        />
      </Content>
    </Layout>
  );
};

export default CleanerApprovalScreen;

const styles = StyleSheet.create({});
