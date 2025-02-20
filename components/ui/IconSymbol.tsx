import React from 'react';
import { Text, StyleSheet } from 'react-native';

export const IconSymbol = ({ name, size, color }) => {
  return (
    <Text style={[styles.icon, { fontSize: size, color }]}>
      {name}
    </Text>
  );
};

const styles = StyleSheet.create({
  icon: {
    fontFamily: 'ionicons', // Use your custom icon font if needed
  },
});