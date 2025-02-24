import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/context/AuthContext';
import Toast from 'react-native-toast-message';

const SignupPage = () => {
  const { signup, error, isLoading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  const handleSubmit = async () => {
    setErrors({});
    let newErrors = {};
    if (!name.trim()) newErrors.name = 'Full Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password.trim()) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await signup(email, password, name);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Account created successfully!',
      });
      navigation.navigate('LoginScreen');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Signup Failed',
        text2: error.message || 'An error occurred',
      });
    }
  };

  return (
    <LinearGradient colors={['#006400', '#004d00']} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>SIGN UP</Text>
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#fff"
          value={name}
          onChangeText={setName}
          style={[styles.input, errors.name && styles.inputError]}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        <TextInput
          placeholder="Email"
          placeholderTextColor="#fff"
          value={email}
          onChangeText={setEmail}
          style={[styles.input, errors.email && styles.inputError]}
          keyboardType="email-address"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        <TextInput
          placeholder="Password"
          placeholderTextColor="#fff"
          value={password}
          onChangeText={setPassword}
          style={[styles.input, errors.password && styles.inputError]}
          secureTextEntry
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.backLink}>Already have an account?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isLoading}>
          <Text style={styles.text}>{isLoading ? 'Signing Up...' : 'Submit'}</Text>
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
    backgroundColor: '#1E2329',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    color: '#4CAF50',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#2C3137',
    color: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: '#FFFFFF',
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
    marginTop: 10,
    color: '#FFFFFF',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

export default SignupPage;
