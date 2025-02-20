import React from 'react';
import { TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';

export const HapticTab = ({ children, onPress }) => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return <TouchableOpacity onPress={handlePress}>{children}</TouchableOpacity>;
};