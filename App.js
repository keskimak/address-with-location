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
  const [coords, setCoords] = useState({latitude: null, longitude: null});
 

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
       if (status !== 'granted') {
         Alert.alert('No permission to get location')
         return; }

        let location = await Location.getCurrentPositionAsync({});    
        setLocation(location);
        setCoords({latitude: location.coords.latitude, longitude: location.coords.longitude})
      
        console.log(location)
        console.log(location.coords.latitude, location.coords.longitude)
       
        })();
      }, []);


      return (
        <View style={styles.container}>
          <MapView
          region={ { latitude: coords.latitude, longitude: coords.longitude, latitudeDelta: 0.0322,longitudeDelta: 0.0221} }
           
            width={styles.map.width}
            height={styles.map.height}
          >
            <Marker
            coordinate={ { latitude: 60.200692,longitude: 24.934302}}
            title='Title'
            />
          


          </MapView>


        </View>


      )
    };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      map: {
        width: Dimensions.get('window').width,
        height: (Dimensions.get('window').height) * 0.91,
        marginBottom: 10
      },
    });
