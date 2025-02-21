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
  Dimensions, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator, 
  Modal, 
  TextInput,
  ScrollView,
  Image
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location';
import axios from 'axios';
import Slider from '@react-native-community/slider';
import { useAuth } from '@/context/AuthContext'; // Adjust your auth context path

const ServerUrl = 'https://resku-backend-production.up.railway.app';

export default function MapPage() {
  const { user } = useAuth();
  const mapRef = useRef(null);
  const [state, setState] = useState({
    userLocation: null,
    pins: [],
    services: [],
    newPlace: null,
    selectedPin: null,
    selectedService: null,
    showActionSheet: false,
    showPinForm: false,
    showServicesOptions: false,
    servicesType: 'hospital',
    dangerRating: 1,
    type: 'report',
    title: '',
    description: '',
    isLoading: true,
  });

  const amenityIcons = {
    hospital: require('../../assets/hospital.png'),
    clinic: require('../../assets/clinic.png'),
    fuel: require('../../assets/fuel.png'),
    police: require('../../assets/police.png'),
    fire_station: require('../../assets/fire_station.png'),
    telephone: require('../../assets/telephone.png'),
    vehicle_inspection: require('../../assets/vehicle_inspection.png'),
    pharmacy: require('../../assets/pharmacy.png'),
  };

  useEffect(() => {
    getLocationAndPins();
  }, []);

  const getLocationAndPins = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission denied');
      setState(prev => ({ ...prev, isLoading: false }));
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    
    setState(prev => ({
      ...prev,
      userLocation: { latitude, longitude },
      isLoading: false
    }));
    
    focusOnLocation(latitude, longitude);
    fetchPins();
  };

  const fetchPins = async () => {
    try {
      const res = await axios.get(`${ServerUrl}/api/pins`);
      setState(prev => ({ ...prev, pins: res.data }));
    } catch (err) {
      console.log(err);
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

  const handleMapLongPress = (e) => {
    setState(prev => ({
      ...prev,
      newPlace: e.nativeEvent.coordinate,
      showPinForm: true
    }));
  };

  const submitPin = async () => {
    try {
      const newPin = {
        userName: user.name,
        userEmail: user.email,
        title: state.title,
        description: state.description,
        dangerRate: state.dangerRating,
        type: state.type,
        lat: state.newPlace.latitude,
        long: state.newPlace.longitude,
      };

      await axios.post(`${ServerUrl}/api/pins`, newPin);
      fetchPins();
      closeModals();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchServices = async () => {
    try {
      const { latitude, longitude } = state.userLocation;
      const response = await axios.get(
        `https://overpass-api.de/api/interpreter?data=[out:json];node["amenity"=${state.servicesType}](${latitude-0.3},${longitude-0.3},${latitude+0.3},${longitude+0.3});out body;`
      );
      setState(prev => ({ ...prev, services: response.data.elements }));
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const openGoogleMaps = (lat, lng) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    Linking.openURL(url).catch(err => console.error("Error opening maps:", err));
  };

  const closeModals = () => {
    setState(prev => ({
      ...prev,
      showPinForm: false,
      selectedPin: null,
      selectedService: null,
      showServicesOptions: false,
      newPlace: null,
      title: '',
      description: '',
    }));
  };

  const renderMarkerIcon = (type, userEmail) => {
    const isCurrentUser = user?.email === userEmail;
    if (isCurrentUser) return 'green';
    return type === 'report' ? 'red' : 'blue';
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        onLongPress={handleMapLongPress}
        initialRegion={state.userLocation ? {
          ...state.userLocation,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        } : null}
      >
        {state.pins.map((pin, index) => (
          <Marker
            key={`pin-${index}`}
            coordinate={{ latitude: pin.lat, longitude: pin.long }}
            onPress={() => setState(prev => ({ ...prev, selectedPin: pin }))}
          >
            <MaterialIcons 
              name="location-on" 
              size={30} 
              color={renderMarkerIcon(pin.type, pin.userEmail)} 
            />
          </Marker>
        ))}

        {state.services.map((service, index) => (
          <Marker
            key={`service-${index}`}
            coordinate={{ latitude: service.lat, longitude: service.lon }}
            onPress={() => setState(prev => ({ ...prev, selectedService: service }))}
          >
            <Image
              source={amenityIcons[service.tags.amenity]}
              style={styles.serviceIcon}
            />
          </Marker>
        ))}
      </MapView>

      {/* Action Buttons */}
      <View style={styles.actionBar}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => setState(prev => ({ ...prev, showActionSheet: !prev.showActionSheet }))}
        >
          <MaterialIcons name="menu" size={24} color="white" />
        </TouchableOpacity>

        {state.showActionSheet && (
          <View style={styles.actionSheet}>
            <TouchableOpacity
              style={styles.actionItem}
              onPress={() => {
                setState(prev => ({ ...prev, showServicesOptions: true }));
                fetchServices();
              }}
            >
              <MaterialIcons name="local-hospital" size={24} color="black" />
              <Text>Find Services</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionItem}
              onPress={() => focusOnLocation(state.userLocation.latitude, state.userLocation.longitude)}
            >
              <MaterialIcons name="my-location" size={24} color="black" />
              <Text>My Location</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Modals */}
      <Modal visible={state.showPinForm} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Pin</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={state.title}
            onChangeText={text => setState(prev => ({ ...prev, title: text }))}
          />
          
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Description"
            multiline
            value={state.description}
            onChangeText={text => setState(prev => ({ ...prev, description: text }))}
          />

          <Text>Type:</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={[styles.radioButton, state.type === 'report' && styles.radioSelected]}
              onPress={() => setState(prev => ({ ...prev, type: 'report' }))}
            >
              <Text>Report</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, state.type === 'request' && styles.radioSelected]}
              onPress={() => setState(prev => ({ ...prev, type: 'request' }))}
            >
              <Text>Request</Text>
            </TouchableOpacity>
          </View>

          <Text>Danger Rating: {state.dangerRating}</Text>
          <Slider
            minimumValue={1}
            maximumValue={5}
            step={1}
            value={state.dangerRating}
            onValueChange={value => setState(prev => ({ ...prev, dangerRating: value }))}
          />

          <TouchableOpacity style={styles.submitButton} onPress={submitPin}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.closeButton} onPress={closeModals}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Selected Pin Modal */}
      {state.selectedPin && (
        <View style={styles.bottomSheet}>
          <Text style={styles.sheetTitle}>{state.selectedPin.title}</Text>
          <Text>{state.selectedPin.description}</Text>
          <TouchableOpacity 
            style={styles.navigateButton}
            onPress={() => openGoogleMaps(state.selectedPin.lat, state.selectedPin.long)}
          >
            <Text>Navigate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={closeModals}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Services Options Modal */}
      <Modal visible={state.showServicesOptions} animationType="slide">
        <ScrollView contentContainerStyle={styles.servicesModal}>
          {Object.keys(amenityIcons).map((serviceType) => (
            <TouchableOpacity
              key={serviceType}
              style={styles.serviceOption}
              onPress={() => {
                setState(prev => ({ ...prev, servicesType: serviceType }));
                fetchServices();
              }}
            >
              <Image source={amenityIcons[serviceType]} style={styles.serviceOptionIcon} />
              <Text>{serviceType.replace('_', ' ').toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.closeButton} onPress={closeModals}>
            <Text>Close</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>

      {state.isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </SafeAreaView>
  );
}

// Add appropriate styles for the new components
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  actionBar: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  actionButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 30,
  },
  actionSheet: {
    position: 'absolute',
    right: 0,
    top: 60,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  multilineInput: {
    height: 100,
  },
  radioGroup: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  radioButton: {
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  radioSelected: {
    backgroundColor: '#e0e0e0',
  },
  submitButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  serviceIcon: {
    width: 25,
    height: 25,
  },
  // Add more styles as needed
});
