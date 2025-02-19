import React, { useEffect, useState, useRef } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons'; // For icons
import * as Location from 'expo-location'; // For Expo projects
import { useNavigation } from '@react-navigation/native';

export default function MapPage() {
  const mapRef = useRef(null); // Reference to the map
  const [userLocation, setUserLocation] = useState(null); // State to store user location
  const [mapType, setMapType] = useState('standard'); // State to manage map type
  const [isLoading, setIsLoading] = useState(true); // State to manage loading indicator
  const [isMapTypeModalVisible, setIsMapTypeModalVisible] = useState(false); // State to manage map type modal
  const [dangerButtonOpacity, setDangerButtonOpacity] = useState(0.5);
  const navigation = useNavigation();

  // Get the user's current location
  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      setIsLoading(false);
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    setUserLocation({ latitude, longitude });
    focusOnUserLocation(latitude, longitude);
    setIsLoading(false);
  };

  // Focus the map on the user's location
  const focusOnUserLocation = (latitude, longitude) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01, // Zoom level
        longitudeDelta: 0.01,
      });
    }
  };

  // Get location when the component mounts
  useEffect(() => {
    getUserLocation();
  }, []);

  // Handle map type change
  const handleMapTypeChange = (type) => {
    setMapType(type);
    setIsMapTypeModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Map View</Text>
        <TouchableOpacity
          style={styles.mapTypeButton}
          onPress={() => setIsMapTypeModalVisible(true)}
        >
          <MaterialIcons name="layers" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Map */}
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE} // Use Google Maps as the provider
          showsUserLocation={true} // Show the user's location
          followsUserLocation={true} // Follow the user's location
          showsMyLocationButton={false} // Hide default my location button
          showsCompass={true} // Show the compass
          compassOffset={{ x: -20, y: 40 }} // Adjust compass position (optional)
          mapType={mapType} // Set the map type (standard, satellite, hybrid, terrain)
          showsTraffic={true} // Enable traffic layer
          showsBuildings={true} // Enable 3D buildings
          showsIndoors={true} // Enable indoor maps
          initialRegion={
            userLocation
              ? {
                  latitude: userLocation.latitude,
                  longitude: userLocation.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }
              : undefined
          }
        >
          {/* Custom green circle marker for user location */}
          {userLocation && (
            <Marker coordinate={userLocation} tracksViewChanges={false}>
              <View style={styles.userLocationMarker}>
                <View style={styles.greenCircle} />
              </View>
            </Marker>
          )}
        </MapView>

        {/* Floating Action Buttons */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => {
            if (userLocation) {
              focusOnUserLocation(userLocation.latitude, userLocation.longitude);
            }
          }}
        >
          <MaterialIcons name="my-location" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Loading Indicator */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      {/* Map Type Modal */}
      <Modal
        visible={isMapTypeModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsMapTypeModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Map Type</Text>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleMapTypeChange('standard')}
            >
              <Text>Standard</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleMapTypeChange('satellite')}
            >
              <Text>Satellite</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleMapTypeChange('hybrid')}
            >
              <Text>Hybrid</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleMapTypeChange('terrain')}
            >
              <Text>Terrain</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setIsMapTypeModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Danger Button */}
<TouchableOpacity
  style={[
    styles.dangerButton,
    { opacity: dangerButtonOpacity }
  ]}
  onPress={() => navigation.navigate('ReportPage')}
  onPressIn={() => setDangerButtonOpacity(1)}
  onPressOut={() => setDangerButtonOpacity(0.5)}
  activeOpacity={1}
>
  <Text style={styles.dangerButtonText}>DANGER</Text>
</TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  mapTypeButton: {
    padding: 8,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  userLocationMarker: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'green',
    borderWidth: 2,
    borderColor: 'white',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#6200ee',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalCloseButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#6200ee',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  dangerButton: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    backgroundColor: 'red',
    padding:8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dangerButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});