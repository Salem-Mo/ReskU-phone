import { View, TextInput, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
const COLORS = {
  primary: '#007AFF',
  lightWhite: '#FAFAFA',
  white: '#FFFFFF',
  gray: '#808080',
  gray2: '#D3D3D3',
  red: '#FF0000',
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
export default function HomeScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();
  const handleSubmit = () => {
    // Reset errors
    setErrors({});

    // Validate fields
    let newErrors = {};
    if (!username.trim()) newErrors.username = 'Username is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password.trim()) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If all fields are filled, proceed with form submission
    console.log('Submitted:', { username, email, password });
    // You can add your submission logic here
  };

  return (
           <LinearGradient
              colors={['#006400', '#004d00']}
              style={styles.container}
            >
    <View style={styles.card}>
      <Text style={styles.title}>SIGN UP</Text>
      <TextInput
        placeholder="Username"
        placeholderTextColor="#fff"
        value={username}
        onChangeText={setUsername}
        style={[styles.input, errors.username && styles.inputError]}
        required
      />
      {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
      <TextInput
        placeholder="Email"
        placeholderTextColor="#fff"
        value={email}
        onChangeText={setEmail}
        style={[styles.input, errors.email && styles.inputError]}
        keyboardType="email-address"
        required
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      <TextInput
        placeholder="Password"
        placeholderTextColor="#fff"
        value={password}
        onChangeText={setPassword}
        style={[styles.input, errors.password && styles.inputError]}
        secureTextEntry
        required
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      <TouchableOpacity  onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.backLink}>Already have an account?</Text>
        </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.text}>Submit</Text>
      </TouchableOpacity>
    </View>
    </LinearGradient>
  );
}


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
  errorText: {
    color: COLORS.red,
    marginTop: 5,
    marginBottom: 5,
    fontFamily: FONT.medium,
    fontSize: SIZES.small,  },
  text:{
    fontSize: 16,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  backLink: {
    marginTop: SIZES.small,
    marginBottom: SIZES.small,
    color: COLORS.white,
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    textDecorationLine: "underline",
    textAlign: "center",
  },
});