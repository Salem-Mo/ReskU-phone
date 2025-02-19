import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import img from './0.jpg';

const Profilepage = () => {
 
  const [email, setEmail] = useState('salemmohameofficial@gmail.com');
  const [name, setName] = useState('Salem MOX');
  const [country, setCountry] = useState('France');
  const [selectedColor, setSelectedColor] = useState('#8B008B');
  const colors = ['#8B008B', '#DAA520', '#008080', '#4682B4'];
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={['#006400', '#004d00']}
      style={styles.container}
    >
      <StatusBar style="light" />
      <View style={styles.card}>
        <Text style={styles.title}>Complete your Profile</Text>
        
        <View style={styles.profileImageContainer}>
          <Image
            source={img}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>Salem MOX</Text>
        </View>

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#666"
        />

        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Name"
          placeholderTextColor="#fff"
        />

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={country}
            onValueChange={(itemValue) => setCountry(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="France" value="France" />
            <Picker.Item label="Egypt" value="Egypt" />
            {/* Add more countries as needed */}
          </Picker>
        </View>

        <View style={styles.colorPicker}>
          {colors.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorOption, 
                { backgroundColor: color }, 
                selectedColor === color && styles.selectedColor
              ]}
              onPress={() => setSelectedColor(color)}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('Chatpage')}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton}  onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.logoutButtonText}>Logout</Text>
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
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    padding:10,
    marginBottom: 20,
  },
  profileImage: {
    resizeMode: '',
    width: 120,
    height: 120,
    borderRadius: 50,
  },
  profileName: {
    color: '#4CAF50',
    fontSize: 18,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#2C3137',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  pickerContainer: {
    backgroundColor: '#2C3137',
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    color: '#fff',
  },
  colorPicker: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profilepage;