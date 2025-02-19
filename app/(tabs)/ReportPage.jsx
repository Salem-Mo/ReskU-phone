import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const Colors = {
  background: "#f0f0f0",
  text: "#333333",
  primary: "#007AFF",
  white: "#FFFFFF",
  lightGray: "#D3D3D3",
  danger: "#FF3B30",
};

const AnimatedButton = ({ icon, text, colors, onPress, isSelected }) => {
  const animatedValue = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(animatedValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.animatedButtonContainer}
    >
      <Animated.View
        style={[
          styles.animatedButton,
          { transform: [{ scale: animatedValue }] },
          isSelected && styles.selectedButton,
        ]}
      >
        <LinearGradient colors={colors} style={styles.gradientButton}>
          <Ionicons name={icon} size={24} color={Colors.white} />
          <Text style={styles.animatedButtonText}>{text}</Text>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
};
const PinForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dangerRate, setDangerRate] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null); // Add this line

  const handleAddPin = () => {
    // Implement the logic to add the pin
    console.log("Adding pin:", { title, description, dangerRate });
  };

  return (
    <LinearGradient colors={["#006400", "#004d00"]} style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity style={styles.closeButton}>
          <Ionicons name="close" size={24} color={Colors.text} />
        </TouchableOpacity>

        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter a title"
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Say something about this place."
          multiline
        />

        <View style={styles.buttonRow}>
          <AnimatedButton
            icon="information-circle-outline"
            text="Report"
            colors={["#4c669f", "#3b5998", "#192f6a"]}
            onPress={() => setSelectedOption("report")}
            isSelected={selectedOption === "report"}
          />
          <AnimatedButton
            icon="warning-outline"
            text="Help"
            colors={["#ff9500", "#ff6f00", "#ff3b30"]}
            onPress={() => setSelectedOption("help")}
            isSelected={selectedOption === "help"}
          />
        </View>

        <Text style={styles.label}>Danger rate</Text>
      <View style={styles.dangerRate}>
        {[1, 2, 3, 4, 5].map((rate) => (
          <TouchableOpacity
            key={rate}
            onPress={() => setDangerRate(rate)}
            style={styles.dangerItem}
          >
            <Ionicons
              name="alert"
              size={24}
              color={rate <= dangerRate ? Colors.danger : Colors.lightGray}
            />
          </TouchableOpacity>
        ))}
      </View>

        <TouchableOpacity style={styles.addButton} onPress={handleAddPin}>
          <Text style={styles.addButtonText}>Add Pin</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: Colors.background,
    borderRadius: 10,
    padding: 20,
    width: "90%",
    maxWidth: 400,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 5,
  },
  input: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    marginLeft: 5,
    color: Colors.text,
  },
  dangerRate: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    backgroundColor: Colors.white,
    borderRadius: 5,
    padding: 10,
  },
  dangerItem: {
    padding: 5,
  },
  addButton: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: Colors.white,
    fontWeight: "bold",
  },
  selectedButton: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  animatedButtonContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  animatedButton: {
    borderRadius: 5,
    overflow: "hidden",
  },
  gradientButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  animatedButtonText: {
    color: Colors.white,
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default PinForm;
