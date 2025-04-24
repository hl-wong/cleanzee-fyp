import {
  Image,
  Platform,
  StyleSheet,
  Text,
  useWindowDimensions,
} from "react-native";
import React, { useContext, useState } from "react";
import { UserContext } from "../../../context";
import { Route } from "react-native-tab-view";
import DescriptionScreen from "./DescriptionScreen";
import ReviewScreen from "./ReviewScreen";
import { glob, theme } from "../../../assets/styles";
import { ImageLayout } from "../../../layouts";
import { getFontSize, goBack, navigateTo } from "../../../utils";
import {
  Button,
  Column,
  Content,
  Footer,
  Row,
  TabBar,
} from "../../../components";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

interface ViewServiceScreenProps {
  navigation: any;
  route: any;
}

const ViewServiceScreen: React.FC<ViewServiceScreenProps> = ({
  navigation,
  route,
}) => {
  const { item } = route.params;
  const userName = `${item.cleanerId?.userId?.firstName} ${item.cleanerId?.userId?.lastName}`;

  const { user } = useContext(UserContext);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "description", title: "Description" },
    { key: "review", title: "Review" },
  ]);

  const renderScene = ({ route }: { route: Route }) => {
    switch (route.key) {
      case "description":
        return <DescriptionScreen desc={item.serviceId?.serviceDesc} />;
      case "review":
        return <ReviewScreen reviews={item.reviews} />;
      default:
        return null;
    }
  };

  console.log(item.reviews);

  const layout = useWindowDimensions();
  const currentScene = renderScene({ route: routes[index] });

  return (
    <ImageLayout
      onBack={() => goBack(navigation)}
      imageUri={item.serviceId?.serviceImage}
      footer={
        <Footer>
          <Row gap={16}>
            <Button
              variant="primary"
              size={Platform.OS === "ios" ? "lg" : "md"}
              label="Chat"
              hasIcon={{ name: "chat" }}
              onPress={() =>
                navigateTo(navigation, "Home Stack", "Chat Room Screen", {
                  id: user._id,
                  receiverId: item.cleanerId,
                })
              }
              style={{ flex: 1 }}
            />

            <Button
              variant="primary"
              size={Platform.OS === "ios" ? "lg" : "md"}
              label="Book"
              hasIcon={{ name: "calendar-month" }}
              onPress={() =>
                navigateTo(navigation, "Home Stack", "Booking Request Screen", {
                  item,
                })
              }
              style={{ flex: 1 }}
            />
          </Row>
        </Footer>
      }
    >
      <Content bgColor="white">
        <Column
          gap={12}
          style={{
            paddingHorizontal: Platform.OS === "ios" ? 24 : 16,
            paddingVertical: 16,
          }}
        >
          <Column gap={Platform.OS === "ios" ? 12 : 8}>
            <Column gap={Platform.OS === "ios" ? 8 : 4}>
              <Text style={styles.serviceName}>{item.serviceName}</Text>
              <Text style={styles.serviceCategory}>
                {item.serviceId.serviceCategory}
              </Text>
            </Column>
            {item.serviceId.servicePricingType === "Fixed" && (
              <Text
                style={styles.servicePrice}
              >{`RM${item.servicePrice}`}</Text>
            )}

            {(item.serviceId.servicePricingType === "Hour" ||
              item.serviceId.servicePricingType === "Sqft") && (
              <Text>
                <Text
                  style={styles.servicePrice}
                >{`RM${item.servicePrice}`}</Text>
                /{item.serviceId.servicePricingType}
              </Text>
            )}
          </Column>

          <Row gap={8} style={glob.horizontalCenter}>
            <Image
              source={{ uri: item.cleanerId?.userId?.profilePicture }}
              style={styles.userProfilePicture}
            />
            <Text style={styles.userName}>{userName}</Text>
          </Row>
        </Column>

        <TabBar
          index={index}
          setIndex={setIndex}
          routes={routes}
          layoutWidth={layout.width}
        />
        {currentScene}
      </Content>
    </ImageLayout>
  );
};

export default ViewServiceScreen;

const styles = StyleSheet.create({
  serviceName: {
    fontSize: Platform.OS === "ios" ? getFontSize(22) : getFontSize(24),
    fontWeight: 700,
  },
  serviceCategory: {
    color: "#666",
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
  },
  servicePrice: {
    fontSize: Platform.OS === "ios" ? getFontSize(22) : getFontSize(24),
    fontWeight: 700,
    color: theme.color.primary,
  },
  userProfilePicture: {
    width: wp("9%"),
    height: wp("9%"),
    borderRadius: 100,
  },
  userName: {
    fontSize: Platform.OS === "ios" ? getFontSize(12) : getFontSize(14),
    fontWeight: 500,
  },
});
