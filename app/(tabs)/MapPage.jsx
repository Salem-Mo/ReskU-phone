// import React, { useEffect, useState, useRef } from 'react';
// import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
// import { StyleSheet, View, Dimensions, Text, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { MaterialIcons } from '@expo/vector-icons'; // For icons
// import * as Location from 'expo-location'; // For Expo projects
// import axios from 'axios';
// export default function MapPage() {
//   const mapRef = useRef(null); // Reference to the map
//   const [userLocation, setUserLocation] = useState(null); // State to store user location
//   const [mapType, setMapType] = useState('standard'); // State to manage map type
//   const [isLoading, setIsLoading] = useState(true); // State to manage loading indicator
//   const [isMapTypeModalVisible, setIsMapTypeModalVisible] = useState(false); // State to manage map type modal

//   const [pins, setPins] = useState([]);

// const ServerUrl='https://resku-backend-production.up.railway.app'

// useEffect(() => {
//   const getPins = async () => {
//     try {
//       const res = await axios.get(`${ServerUrl}/api/pins`);
//       console.log("frontend connected to backend");
//       setPins(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   getPins();
// }, []);


//   const getUserLocation = async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== 'granted') {
//       console.log('Permission to access location was denied');
//       setIsLoading(false);
//       return;
//     }

//     let location = await Location.getCurrentPositionAsync({});
//     const { latitude, longitude } = location.coords;
//     setUserLocation({ latitude, longitude });
//     focusOnUserLocation(latitude, longitude);
//     setIsLoading(false);
//   };

//   const focusOnUserLocation = (latitude, longitude) => {
//     if (mapRef.current) {
//       mapRef.current.animateToRegion({
//         latitude,
//         longitude,
//         latitudeDelta: 0.01, // Zoom level
//         longitudeDelta: 0.01,
//       });
//     }
//   };

//   useEffect(() => {
//     getUserLocation();
//   }, []);
//   const handleMapTypeChange = (type) => {
//     setMapType(type);
//     setIsMapTypeModalVisible(false);
//   };

//   return (
//     <SafeAreaView style={styles.safeAreaContainer}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Map View</Text>
//         <TouchableOpacity
//           style={styles.mapTypeButton}
//           onPress={() => setIsMapTypeModalVisible(true)}
//         >
//           <MaterialIcons name="layers" size={24} color="black" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.container}>
//         <MapView
//           ref={mapRef}
//           style={styles.map}
//           provider={PROVIDER_GOOGLE} // Use Google Maps as the provider
//           showsUserLocation={true} // Show the user's location
//           followsUserLocation={true} // Follow the user's location
//           showsMyLocationButton={false} // Hide default my location button
//           showsCompass={true} // Show the compass
//           compassOffset={{ x: -20, y: 40 }} // Adjust compass position (optional)
//           mapType={mapType} // Set the map type (standard, satellite, hybrid, terrain)
//           showsTraffic={true} // Enable traffic layer
//           showsBuildings={true} // Enable 3D buildings
//           showsIndoors={true} // Enable indoor maps
//           initialRegion={
//             userLocation
//               ? {
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                   latitudeDelta: 0.01,
//                   longitudeDelta: 0.01,
//                 }
//               : undefined
//           }
//         >
//             {pins.map((pin, index) => (
//     <Marker
//       key={index}
//       coordinate={{
//         latitude: pin.lat,
//         longitude: pin.long,
//       }}
//       title={pin.title} // Assuming pins have a name field
//       description={pin.description} // Assuming pins have a description field
//     />
//   ))}
//           {userLocation && (
//             <Marker coordinate={userLocation} tracksViewChanges={false}>
//               <View style={styles.userLocationMarker}>
//                 <View style={styles.greenCircle} />
//               </View>
//             </Marker>
//           )}
//         </MapView>

//         <TouchableOpacity
//           style={styles.fab}
//           onPress={() => {
//             if (userLocation) {
//               focusOnUserLocation(userLocation.latitude, userLocation.longitude);
//             }
//           }}
//         >
//           <MaterialIcons name="my-location" size={24} color="white" />
//         </TouchableOpacity>
//       </View>

//       {isLoading && (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#0000ff" />
//         </View>
//       )}
//       <Modal
//         visible={isMapTypeModalVisible}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setIsMapTypeModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Select Map Type</Text>
//             <TouchableOpacity
//               style={styles.modalOption}
//               onPress={() => handleMapTypeChange('standard')}
//             >
//               <Text>Standard</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.modalOption}
//               onPress={() => handleMapTypeChange('satellite')}
//             >
//               <Text>Satellite</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.modalOption}
//               onPress={() => handleMapTypeChange('hybrid')}
//             >
//               <Text>Hybrid</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.modalOption}
//               onPress={() => handleMapTypeChange('terrain')}
//             >
//               <Text>Terrain</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.modalCloseButton}
//               onPress={() => setIsMapTypeModalVisible(false)}
//             >
//               <Text style={styles.modalCloseButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeAreaContainer: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: 'white',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   mapTypeButton: {
//     padding: 8,
//   },
//   container: {
//     flex: 1,
//     position: 'relative',
//   },
//   map: {
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//   },
//   userLocationMarker: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   greenCircle: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     backgroundColor: 'green',
//     borderWidth: 2,
//     borderColor: 'white',
//   },
//   fab: {
//     position: 'absolute',
//     bottom: 24,
//     right: 24,
//     backgroundColor: '#6200ee',
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 4,
//   },
//   loadingContainer: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     width: '80%',
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: 16,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   modalOption: {
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   modalCloseButton: {
//     marginTop: 16,
//     padding: 12,
//     backgroundColor: '#6200ee',
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   modalCloseButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });




import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  TextInput,
  ScrollView,
  Dimensions,
  Image,
  Linking,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location';
import axios from 'axios';
import Slider from '@react-native-community/slider';
import { useAuth } from '@/context/AuthContext';

const ServerUrl = 'https://resku-backend-production.up.railway.app';
const { width, height } = Dimensions.get('window');

// Color palette
const COLORS = {
  primary: '#6200ee',
  secondary: '#03dac6',
  background: '#ffffff',
  text: '#2d3436',
  error: '#dc3545',
  success: '#28a745',
  warning: '#ffc107',
};

const amenityIcons = {
  hospital: require('@/assets/hospital.png'),
  clinic: require('../../assets/clinic.png'),
  fuel: require('../../assets/fuel.png'),
  police: require('../../assets/police.png'),
  fire_station: require('../../assets/fire_station.png'),
  telephone: require('../../assets/telephone.png'),
  vehicle_inspection: require('../../assets/vehicle_inspection.png'),
  pharmacy: require('../../assets/pharmacy.png'),
};

const MapPage = () => {
  const { user } = useAuth();
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [pins, setPins] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedPin, setSelectedPin] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showPinForm, setShowPinForm] = useState(false);
  const [showServicesOptions, setShowServicesOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newPlace, setNewPlace] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'report',
    dangerRating: 1,
    servicesType: 'hospital',
  });
  const [showServiceDetails, setShowServiceDetails] = useState(false);

  useEffect(() => {
    initializeMap();
  }, []);

  const initializeMap = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') throw new Error('Permission denied');

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
      focusOnLocation(location.coords.latitude, location.coords.longitude);
      await fetchPins();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPins = async () => {
    try {
      const { data } = await axios.get(`${ServerUrl}/api/pins`);
      setPins(data);
    } catch (error) {
      console.error('Failed to fetch pins:', error);
    }
  };

  const focusOnLocation = (lat, lng) => {
    mapRef.current?.animateToRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  const handleMapLongPress = ({ nativeEvent }) => {
    setNewPlace(nativeEvent.coordinate);
    setShowPinForm(true);
  };

  const submitPin = async () => {
    try {
      await axios.post(`${ServerUrl}/api/pins`, {
        ...formData,
        userName: user.name,
        userEmail: user.email,
        lat: newPlace.latitude,
        long: newPlace.longitude,
      });
      await fetchPins();
      closeModals();
    } catch (error) {
      console.error('Failed to submit pin:', error);
    }
  };

  const fetchServices = async () => {
    if (!userLocation) return;

    try {
      const { data } = await axios.get(
        `https://overpass-api.de/api/interpreter?data=[out:json];node["amenity"=${formData.servicesType}](${userLocation.latitude - 0.3},${userLocation.longitude - 0.3},${userLocation.latitude + 0.3},${userLocation.longitude + 0.3});out body;`
      );
      setServices(data.elements);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const openGoogleMaps = (lat, lng) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    Linking.openURL(url);
  };

  const closeModals = () => {
    setShowPinForm(false);
    setShowServicesOptions(false);
    setSelectedPin(null);
    setSelectedService(null);
    setNewPlace(null);
    setShowServiceDetails(false);
    setFormData({
      title: '',
      description: '',
      type: 'report',
      dangerRating: 1,
      servicesType: 'hospital',
    });
  };

  const renderMarkerColor = (type, userEmail) => {
    return user?.email === userEmail
      ? COLORS.success
      : type === 'report'
      ? COLORS.error
      : COLORS.primary;
  };

  const ServiceOption = ({ type }) => (
    <TouchableOpacity
      style={[
        styles.serviceOption,
        formData.servicesType === type && styles.selectedService,
      ]}
      onPress={() => {
        setFormData((p) => ({ ...p, servicesType: type }));
        fetchServices();
        setShowServicesOptions(false); // Close the menu after selection
      }}
    >
      <Image source={amenityIcons[type]} style={styles.serviceIcon} />
      <Text style={styles.serviceLabel}>
        {type.replace('_', ' ').toLowerCase()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        onLongPress={handleMapLongPress}
        initialRegion={userLocation}
        mapType='hybrid'
      >
        {pins.map((pin, index) => (
          <Marker
            key={`pin-${index}`}
            coordinate={{ latitude: pin.lat, longitude: pin.long }}
            onPress={() => setSelectedPin(pin)}
          >
            <MaterialIcons
              name="location-on"
              size={34}
              color={renderMarkerColor(pin.type, pin.userEmail)}
            />
          </Marker>
        ))}

        {services.map((service, index) => (
          <Marker
            key={`service-${index}`}
            coordinate={{ latitude: service.lat, longitude: service.lon }}
            onPress={() => {
              setSelectedService(service);
              setShowServiceDetails(true);
            }}
          >
            <Image
              source={amenityIcons[service.tags.amenity]}
              style={styles.serviceIcon}
            />
          </Marker>
        ))}

        {newPlace && (
          <Marker coordinate={newPlace}>
            <MaterialIcons name="location-pin" size={40} color={COLORS.warning} />
          </Marker>
        )}
      </MapView>

      {/* Action Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.mainButton}
          onPress={() => setShowActionSheet(!showActionSheet)}
        >
          <MaterialIcons
            name={showActionSheet ? 'close' : 'menu'}
            size={24}
            color="white"
          />
        </TouchableOpacity>

        {showActionSheet && (
          <View style={styles.actionSheet}>
            <TouchableOpacity
              style={styles.actionItem}
              onPress={() => {
                setShowServicesOptions(true);
                fetchServices();
                setShowActionSheet(false);
              }}
            >
              <MaterialIcons name="local-hospital" size={24} color={COLORS.primary} />
              <Text style={styles.actionText}>Find Services</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Pin Form Modal */}
      <Modal visible={showPinForm} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Create New Marker</Text>

          <TextInput
            style={styles.input}
            placeholder="Title *"
            placeholderTextColor="#666"
            value={formData.title}
            onChangeText={(text) => setFormData((p) => ({ ...p, title: text }))}
          />

          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Description"
            placeholderTextColor="#666"
            multiline
            value={formData.description}
            onChangeText={(text) => setFormData((p) => ({ ...p, description: text }))}
          />

          <View style={styles.typeSelector}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                formData.type === 'report' && styles.activeType,
              ]}
              onPress={() => setFormData((p) => ({ ...p, type: 'report' }))}
            >
              <Text style={styles.typeText}>🚨 Report</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                formData.type === 'request' && styles.activeType,
              ]}
              onPress={() => setFormData((p) => ({ ...p, type: 'request' }))}
            >
              <Text style={styles.typeText}>🆘 Request</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>
              Priority Level: {Array(formData.dangerRating).fill('⭐').join('')}
            </Text>
            <Slider
              minimumValue={1}
              maximumValue={5}
              step={1}
              value={formData.dangerRating}
              onValueChange={(value) =>
                setFormData((p) => ({ ...p, dangerRating: value }))
              }
              minimumTrackTintColor={COLORS.warning}
              maximumTrackTintColor="#d3d3d3"
              thumbTintColor={COLORS.warning}
            />
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.cancelButton} onPress={closeModals}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={submitPin}>
              <Text style={styles.buttonText}>Create Marker</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Service Selection Modal */}
      <Modal visible={showServicesOptions} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Service Type</Text>
            <ScrollView contentContainerStyle={styles.servicesGrid}>
              {Object.keys(amenityIcons).map((type) => (
                <ServiceOption key={type} type={type} />
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.closeButton} onPress={closeModals}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Selected Pin Details */}
      {selectedPin && (
        <View style={styles.detailsSheet}>
          <Text style={styles.sheetTitle}>{selectedPin.title}</Text>
          <Text style={styles.sheetDescription}>{selectedPin.description}</Text>
          <View style={styles.sheetActions}>
            <TouchableOpacity
              style={styles.navigateButton}
              onPress={() => openGoogleMaps(selectedPin.lat, selectedPin.long)}
            >
              <Text style={styles.navigateText}>🗺️ Get Directions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeDetails} onPress={closeModals}>
              <MaterialIcons name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Service Details Modal */}
      <Modal visible={showServiceDetails} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedService?.tags?.name || 'Service Details'}</Text>
            <Text style={styles.sheetDescription}>
              {selectedService?.tags?.amenity || 'No additional information available.'}
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeModals}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Initializing Map...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  controls: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  mainButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  actionSheet: {
    left:0,
    top: 10,
    padding:10,
    backgroundColor: COLORS.background,
    borderRadius: 15,
    elevation: 5,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    margin:10,
    padding: 3,
  },
  actionText: {
    color: COLORS.text,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: COLORS.background,
    borderRadius: 20,
    padding: 25,
    width: '90%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  typeSelector: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 15,
  },
  typeButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#e9ecef',
    alignItems: 'center',
  },
  activeType: {
    backgroundColor: COLORS.primary,
  },
  typeText: {
    fontSize: 16,
    fontWeight: '500',
  },
  sliderContainer: {
    marginVertical: 15,
  },
  sliderLabel: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  submitButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: COLORS.error,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: '600',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
    padding: 20,
  },
  serviceOption: {
    width: '45%',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#f8f9fa',
    borderWidth: 2,
    borderColor: 'transparent',
    margin: 8,
  },
  selectedService: {
    borderColor: COLORS.primary,
    backgroundColor: '#e3f2fd',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  serviceIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  serviceLabel: {
    color: COLORS.text,
    fontSize: 14,
    textTransform: 'capitalize',
    textAlign: 'center',
    fontWeight: '500',
  },
  closeButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  detailsSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    padding: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 10,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  sheetDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  sheetActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navigateButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  navigateText: {
    color: COLORS.text,
    fontWeight: '600',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  loadingText: {
    fontSize: 18,
    color: COLORS.text,
  },
});

export default MapPage;