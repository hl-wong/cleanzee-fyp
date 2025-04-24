import { StyleSheet, Text, View, Modal as MD, Platform } from "react-native";
import React from "react";
import { glob, theme } from "../../assets/styles";
import { getFontSize } from "../../utils";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Button } from "../buttons";
import Row from "../Row";

interface ModalProps {
  modalTitle: string;
  modalDesc: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  label: string;
  onPress: () => void;
}

const Modal: React.FC<ModalProps> = ({
  visible,
  setVisible,
  modalTitle,
  modalDesc,
  label,
  onPress,
}) => {
  return (
    <MD visible={visible} transparent={true} animationType="fade">
      <View style={[styles.overlay, glob.center]}>
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{modalTitle}</Text>
          </View>
          <View style={styles.modalContent}>
            <Text style={styles.modalDesc}>{modalDesc}</Text>
          </View>
          <View style={styles.modalFooter}>
            <Row gap={16} style={{ justifyContent: "flex-end" }}>
              <Button
                variant="secondary"
                size="md"
                label="Cancel"
                onPress={() => setVisible(false)}
              />
              <Button
                variant="primary"
                size="md"
                label={label}
                onPress={onPress}
              />
            </Row>
          </View>
        </View>
      </View>
    </MD>
  );
};

export default Modal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    backgroundColor: theme.color.white,
    borderRadius: 10,
    width: wp("85%"),
  },
  modalHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#D9D9D9",
  },
  modalTitle: {
    fontSize: Platform.OS === "ios" ? getFontSize(16) : getFontSize(18),
    fontWeight: 700,
  },
  modalContent: {
    padding: 16,
  },
  modalDesc: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    lineHeight: Platform.OS === "ios" ? 24 : 20,
  },
  modalFooter: {
    padding: 16,
  },
});
