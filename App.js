import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';

import {
  StyleSheet, Text, View, TextInput, Button, Dimensions, TouchableOpacity, Alert,
  TouchableWithoutFeedback, FlatList, Keyboard, KeyboardAvoidingView, Platform
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';


export default function App() {

  const [location, setLocation] = useState(null);  
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  const key = 'i9L5uAR2tSmhFNEKwpOL1V3kpaOjyjGJ';
  const url = `https://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${location}`;

  const buttonPressed = () => {
    fetch(url)
      .then(response => response.json())
      .then(data => setCoords(
        {
          latitude: data.results[0].locations[0].latLng.lat,
          longitude: data.results[0].locations[0].latLng.lng          
        }))
      .catch(error => Alert(error))
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('No permission to get location')
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setCoords({ latitude: location.coords.latitude, longitude: location.coords.longitude })
    })();
  }, []);


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "height"}
      style={styles.container} >
      <MapView style={styles.map}
        region={{ latitude: coords.latitude, longitude: coords.longitude, latitudeDelta: 0.05, longitudeDelta: 0.02 }}
        width={styles.map.width}
        height={styles.map.height}>
        <Marker
          coordinate={{ latitude: coords.latitude, longitude: coords.longitude }}
          title='Title' />
      </MapView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <View>
          <TextInput
            style={{ width: Dimensions.get('window').width, height: 40, marginBottom: 2, textAlign: 'center' }}
            onChangeText={location => setLocation(location)}
            value={location}
            placeholder='street, city'
          />
          <View style={{ height: 150 }}>
            <Button title='show' onPress={buttonPressed} />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  map: {
    width: Dimensions.get('window').width,
    height: (Dimensions.get('window').height)    
  },
});
