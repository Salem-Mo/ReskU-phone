import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/context/AuthContext';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import CountryPicker from 'react-native-country-picker-modal';

const Profilepage = () => {
  const { user, checkAuth, updateProfile, addProfileImg, delProfileImg, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isChanged, setIsChanged] = useState(false);
  const navigation = useNavigation();
  const colors = ['#8B008B', '#DAA520', '#008080', '#4682B4'];

  useEffect(() => {
    const loadUserData = async () => {
      await checkAuth();
    };
  
    loadUserData();
  }, []);
  
  useEffect(() => {
    if (user) {
      setEmail(user.email || '');
      setName(user.name || '');
      setCountry(user.country || 'FR');
      setSelectedColor(user.color || '#8B008B');
      setUserImage(user.userImage || null);
    }
    setLoading(false);
  }, [user]);

  const handleSave = async () => {
    if (!name.trim()) {
      Toast.show({ type: 'error', text1: 'Name cannot be empty' });
      return;
    }

    if (isChanged) {
      const color = selectedColor
      const userID= user._id
      const supplies = ["1","2"]
      try {
        await updateProfile(userID, name, country, color, userImage ,supplies);
        Toast.show({ type: 'success', text1: 'Profile updated successfully' });
        setIsChanged(false);
      } catch (error) {
        Toast.show({ type: 'error', text1: 'Error updating profile', text2: error.message });
        console.log(error)
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUserImage(result.uri);
      await addProfileImg(user._id, result.uri);
      Toast.show({ type: 'success', text1: 'Image updated successfully' });
    }
  };

  const handleDeleteImage = async () => {
    setUserImage(null);
    await delProfileImg(user._id);
    Toast.show({ type: 'success', text1: 'Image removed successfully' });
  };

  const handleLogout = async () => {
    await logout();
    navigation.navigate('LoginScreen');
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#4CAF50" />;
  }

  return (
    <LinearGradient colors={['#006400', '#004d00']} style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.card}>
        <Text style={styles.title}>Edit Your Profile</Text>

        <View style={styles.profileImageContainer}>
          <TouchableOpacity onPress={pickImage}>
            <Image source={userImage ? { uri: userImage } : require('@/assets/images/profile1.jpg')} style={styles.profileImage} />
          </TouchableOpacity>
          {userImage && <TouchableOpacity onPress={handleDeleteImage}><Text style={styles.deleteText}>Remove Image</Text></TouchableOpacity>}
        </View>

        <TextInput 
          style={styles.input} 
          value={email} 
          onChangeText={(text) => {
            setEmail(text);
            setIsChanged(true);
          }}
          editable={false} // Set to `true` if you want to allow email editing
          placeholder="Email"
          placeholderTextColor="#666" 
        />

        <TextInput 
          style={styles.input} 
          value={name} 
          onChangeText={(text) => {
            setName(text);
            setIsChanged(true);
          }}
          placeholder="Name" 
          placeholderTextColor="#fff" 
        />

        <CountryPicker
          withFlag
          withFilter
          countryCode={country}
          withCountryNameButton
          onSelect={(selected) => {
            setCountry(selected.cca2);
            setIsChanged(true);
          }}
        />

        <View style={styles.colorPicker}>
          {colors.map((color) => (
            <TouchableOpacity 
              key={color} 
              style={[
                styles.colorOption, 
                { backgroundColor: color }, 
                selectedColor === color && styles.selectedColor
              ]}
              onPress={() => {
                setSelectedColor(color);
                setIsChanged(true);
              }} 
            />
          ))}
        </View>

        <TouchableOpacity style={[styles.saveButton, !isChanged && styles.disabledButton]} onPress={handleSave} disabled={!isChanged}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  card: { backgroundColor: '#1E2329', borderRadius: 10, padding: 20, width: '90%', maxWidth: 400 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#4CAF50', textAlign: 'center', marginBottom: 20 },
  profileImageContainer: { alignItems: 'center', padding: 10, marginBottom: 20 },
  profileImage: { width: 120, height: 120, borderRadius: 60 },
  deleteText: { color: 'red', marginTop: 5 },
  input: { backgroundColor: '#2C3137', color: '#fff', padding: 10, borderRadius: 5, marginBottom: 10 },
  colorPicker: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  colorOption: { width: 30, height: 30, borderRadius: 15 },
  selectedColor: { borderWidth: 2, borderColor: '#fff' },
  saveButton: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 15, alignItems: 'center', marginBottom: 10 },
  disabledButton: { backgroundColor: '#6C757D' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  logoutButton: { backgroundColor: '#f0f0f0', padding: 15, borderRadius: 5, alignItems: 'center' },
  logoutButtonText: { color: '#333', fontSize: 16, fontWeight: 'bold' },
});

export default Profilepage;