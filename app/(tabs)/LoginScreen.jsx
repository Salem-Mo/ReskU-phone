import React from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity ,Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const COLORS = {
  primary: '#007AFF',
  lightWhite: '#FAFAFA',
  white: '#FFFFFF',
  gray: '#808080',
  gray2: '#D3D3D3',
  // ... other color definitions
};

const FONT = {
  regular: 'System',
  medium: 'System-Medium',
  bold: 'System-Bold',
  // ... other font definitions
};

const SIZES = {
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  // ... other size definitions
};
const LoginScreen = () => {
  const navigation = useNavigation();
  const handleLogin = () => {
    // Add your login logic here
    // For example, you can simulate a successful login by navigating back to the "HomeScreen"
    navigation.navigate('Profilepage');
  };

  return (
       <LinearGradient
          colors={['#006400', '#004d00']}
          style={styles.container}
        >
          
    <View style={styles.card}>
      <Text style={styles.title}>LOGIN</Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#fff"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#fff"
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity 
      onPress={() => navigation.navigate('ForgetPass')}>       
      <Text style={styles.backLink}>Forget ur Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogin} style ={styles.button}>
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
    </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: "#1E2329",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    maxWidth: 400,
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color:"#4CAF50",
    marginBottom: SIZES.small,
  },
  input: {
    backgroundColor: '#2C3137',
    color: COLORS.white, 
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 10,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text:{
    fontSize: 16,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  backLink: {
    marginTop: SIZES.small,
    marginBottom: SIZES.small,
    color: COLORS.white,
    fontFamily: FONT.medium,
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: "underline",
    textAlign: "center",
  },
});

export default LoginScreen;