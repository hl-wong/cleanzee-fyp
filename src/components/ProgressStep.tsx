import { StyleSheet, Text, View } from "react-native";
import React from "react";
import StepIndicator from "react-native-step-indicator";
import { theme } from "../assets/styles";

interface ProgressStepProps {
  labels: string[];
  currentStep: number;
}

const ProgressStep: React.FC<ProgressStepProps> = ({ labels, currentStep }) => {
  return (
    <View style={styles.container}>
      <StepIndicator
        labels={labels}
        currentPosition={currentStep}
        stepCount={labels.length}
        customStyles={{
          stepStrokeCurrentColor: theme.color.primary,
          stepIndicatorFinishedColor: theme.color.primary,
          stepIndicatorUnFinishedColor: "#D9D9D9",
          separatorFinishedColor: theme.color.primary,
          separatorUnFinishedColor: "#D9D9D9",
          currentStepLabelColor: theme.color.primary,
          labelColor: "#666666",
          separatorStrokeWidth: 4,
        }}
      />
    </View>
  );
};

export default ProgressStep;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
});
