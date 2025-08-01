import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const UserLocation = () => {
  const [locationPermission, setLocationPermission] = useState('');
  const [position, setPosition] = useState({});

  const apiKey = 'AIzaSyC0dMqdUUP2zIeDHZbiz4iJBqnJNM1pd2w';

  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLocationDetails = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position?.coords?.latitude},${position?.coords?.longitude}&key=${apiKey}`,
        );

        const data = await response.json();
        console.log(data);

        if (data.results.length > 0) {
          const addressComponents = data.results[0].address_components;

          let cityName = '';
          let countryName = '';

          addressComponents.forEach((component: any) => {
            if (component.types.includes('locality')) {
              cityName = component.long_name;
            }
            if (component.types.includes('country')) {
              countryName = component.long_name;
            }
          });

          setCity(cityName);
          setCountry(countryName);
        } else {
          setError('No results found');
        }
      } catch (err) {
        setError('Error fetching location details');
        console.error(err);
      }
    };

    fetchLocationDetails();
  }, [position, apiKey]);

  useEffect(() => {
    const requestLocationPermission = async () => {
      let permission;

      if (Platform.OS === 'android') {
        permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
      } else if (Platform.OS === 'ios') {
        permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
      }

      if (permission) {
        const status = await check(permission);
        if (status === RESULTS.GRANTED) {
          setLocationPermission(status);
          Geolocation.getCurrentPosition(
            position => {
              console.log(position);
              setPosition(position);
            },
            error => {
              console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        } else if (status === RESULTS.DENIED) {
          const requestStatus = await request(permission);
          setLocationPermission(requestStatus);
        } else {
          setLocationPermission(status);
        }
      }
    };

    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Location Permission Status: {locationPermission}</Text>

      <Text>Lattitude : {position?.coords?.latitude}</Text>
      <Text>Lattitude : {position?.coords?.longitude}</Text>
      <Text>Location Name : {city}</Text>
      <Text>Country Name : {country}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default UserLocation;
