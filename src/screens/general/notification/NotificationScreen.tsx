import { FlatList, StyleSheet, useWindowDimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import GeneralNotificationScreen from "./GeneralNotificationScreen";
import CleanerNotificationScreen from "./CleanerNotificationScreen";
import { Layout } from "../../../layouts";
import { goBack } from "../../../utils";
import { theme } from "../../../assets/styles";
import { UserContext } from "../../../context";
import {
  getCleanerNotifications,
  getUserNotifications,
} from "../../../services";
import { Content, NotificationItem } from "../../../components";
import { Route, TabBar, TabView } from "react-native-tab-view";

interface Notification {
  id: string;
  title: string;
  desc: string;
  isRead: boolean;
  createdAt: string;
}

interface NotificationScreenProps {
  navigation: any;
}

const NotificationScreen: React.FC<NotificationScreenProps> = ({
  navigation,
}) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "general", title: "General" },
    { key: "cleaner", title: "Cleaner" },
  ]);

  const renderScene = ({ route }: { route: Route }) => {
    switch (route.key) {
      case "general":
        return <GeneralNotificationScreen notifications={userNot} />;
      case "cleaner":
        return <CleanerNotificationScreen notifications={cleanerNot} />;
      default:
        return null;
    }
  };

  const { user, cleaner } = useContext(UserContext);

  const [userNot, setUserNot] = useState<Notification[]>([]);
  const [cleanerNot, setCleanerNot] = useState<Notification[]>([]);

  const getNotifications = async () => {
    const response = await getUserNotifications(user._id);
    if (response.status === 200) {
      setUserNot(response.data);
    }

    if (cleaner?.approved) {
      const response = await getCleanerNotifications(cleaner._id);
      if (response.status === 200) {
        setCleanerNot(response.data);
      }
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const layout = useWindowDimensions();

  return (
    <Layout headerTitle="Notifications" onBack={() => goBack(navigation)}>
      <Content bgColor="white">
        {cleaner?.approved ? (
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={(props) => (
              <TabBar
                {...props}
                style={{ backgroundColor: theme.color.primary }}
                indicatorStyle={styles.indicator}
              />
            )}
            initialLayout={{ width: layout.width }}
          />
        ) : (
          <FlatList
            data={userNot}
            keyExtractor={(item, index) => `user-${index}`}
            renderItem={({ item }) => {
              return (
                <NotificationItem
                  title={item.title}
                  desc={item.desc}
                  createdAt={item.createdAt}
                />
              );
            }}
          />
        )}
      </Content>
    </Layout>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: theme.color.secondary,
    height: 3,
  },
});
