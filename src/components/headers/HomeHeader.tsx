import { Platform, StyleSheet, Text } from "react-native";
import React, { useContext } from "react";
import Row from "../Row";
import Column from "../Column";
import { getFontSize, navigateTo } from "../../utils";
import { glob, theme } from "../../assets/styles";
import { Input } from "../inputs";
import { Formik } from "formik";
import { searchServices } from "../../services";
import { UserContext } from "../../context";
import { IconButton } from "../buttons";

interface HomeHeaderProps {
  userName: string;
  onPress: () => void;
  navigation: any;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
  userName,
  onPress,
  navigation,
}) => {
  const { user } = useContext(UserContext);

  return (
    <Column gap={24} style={glob.header}>
      <Row gap={16} style={[glob.horizontalCenter, glob.spaceBetween]}>
        <Column>
          <Text
            style={{
              fontSize:
                Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
            }}
          >
            Welcome,
          </Text>
          <Text style={styles.userName}>{userName}</Text>
        </Column>
        <IconButton
          variant="circle"
          size="md"
          name="notifications"
          onPress={onPress}
          iconColor={theme.color.white}
        />
      </Row>
      <Formik
        initialValues={{ search: "" }}
        onSubmit={async (values) => {
          console.log(values);

          const response = await searchServices(values.search, user._id);
          if (response.status === 200) {
            navigateTo(navigation, "Home Stack", "Search Result Screen", {
              search: values.search,
              result: response.data,
            });
          }
        }}
      >
        {({ handleChange, values, handleSubmit }) => (
          <Row gap={16}>
            <Input
              variant="text"
              placeholder="Search service..."
              onChangeText={handleChange("search")}
              value={values.search}
              style={{ flex: 1 }}
            />
            <IconButton
              variant="rounded"
              size="md"
              name="search"
              onPress={handleSubmit}
              style={{ height: 48, width: 48 }}
              iconColor={theme.color.white}
            />
          </Row>
        )}
      </Formik>
    </Column>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  userName: {
    fontSize: Platform.OS === "ios" ? getFontSize(18) : getFontSize(20),
    fontWeight: 700,
    color: "#333",
  },
});
