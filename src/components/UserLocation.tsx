import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Header from '../baseComponents/Header';

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
}

interface AddressData {
  city: string;
  country: string;
  address: string;
}

const UserLocation = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [address, setAddress] = useState<AddressData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reverseGeocode = async (
    lat: number,
    lng: number,
  ): Promise<AddressData> => {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
      );

      if (!response.ok) {
        throw new Error('Failed to fetch address');
      }

      const data = await response.json();

      console.log('Reverse geocode data:', data);

      return {
        city: data.city || data.locality || 'Unknown City',
        country: data.countryName || 'Unknown Country',
        address:
          data.locality +
          ', ' +
          (data.principalSubdivision || '') +
          ', ' +
          data.countryName,
      };
    } catch (err) {
      console.error('Reverse geocoding error:', err);
      return {
        city: 'Unable to fetch',
        country: 'Unable to fetch',
        address: 'Unable to fetch address',
      };
    }
  };

  const getCurrentLocation = () => {
    setLoading(true);
    setError(null);

    Geolocation.getCurrentPosition(
      async position => {
        const {latitude, longitude, accuracy} = position.coords;

        const locationData: LocationData = {
          latitude,
          longitude,
          accuracy,
        };

        setLocation(locationData);

        const addressData = await reverseGeocode(latitude, longitude);
        setAddress(addressData);
        setLoading(false);
      },
      error => {
        setLoading(false);
        let errorMessage = 'Failed to get location';

        switch (error.code) {
          case 1:
            errorMessage = 'Location permission denied';
            break;
          case 2:
            errorMessage = 'Position unavailable';
            break;
          case 3:
            errorMessage = 'Location request timeout';
            break;
        }

        setError(errorMessage);
        Alert.alert('Location Error', errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const renderComponent = () => {
    return (
      <>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#212121" />
            <Text style={styles.loadingText}>Getting your location...</Text>
          </View>
        )}

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>❌ {error}</Text>
          </View>
        )}

        {location && !loading && (
          <>
            <View style={styles.locationContainer}>
              <Text style={styles.sectionTitle}>Coordinates</Text>
              <Text style={styles.coordinateText}>
                Latitude: {location.latitude.toFixed(6)}
              </Text>
              <Text style={styles.coordinateText}>
                Longitude: {location.longitude.toFixed(6)}
              </Text>
              <Text style={styles.accuracyText}>
                Accuracy: ±{Math.round(location.accuracy)}m
              </Text>

              {address && (
                <View style={styles.addressContainer}>
                  <Text style={styles.sectionTitle}>Address Details</Text>
                  <Text style={styles.addressText}>City: {address.city}</Text>
                  <Text style={styles.addressText}>
                    Country: {address.country}
                  </Text>
                  <Text style={styles.fullAddressText}>{address.address}</Text>
                </View>
              )}
            </View>
            <TouchableOpacity
              style={styles.refreshButton}
              onPress={getCurrentLocation}
              disabled={loading}>
              <Text style={styles.refreshButtonText}>Refresh Location</Text>
            </TouchableOpacity>
          </>
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="User Location" isBackVisible />
      {renderComponent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    marginTop: 16,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    marginTop: 10,
    color: '#666',
  },
  errorContainer: {
    backgroundColor: '#ffe6e6',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ffcccc',
  },
  errorText: {
    fontSize: 16,
    color: '#cc0000',
    textAlign: 'center',
  },
  locationContainer: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  coordinateText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
    fontFamily: 'Courier',
  },
  accuracyText: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
  },
  addressContainer: {
    marginTop: 16,
    paddingTop: 16,
  },
  addressText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  fullAddressText: {
    fontSize: 14,
    color: '#777',
    fontStyle: 'italic',
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
  },
  refreshButton: {
    backgroundColor: '#212121',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  refreshButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserLocation;
