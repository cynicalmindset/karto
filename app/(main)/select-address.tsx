import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";

import MapView, { Marker } from "react-native-maps";

import * as Location from "expo-location";

import { useRouter } from "expo-router";

import { supabase } from "@/lib/supabase";

import { updateprofile } from "@/services/profileservice";

import { theme } from "@/theme";


export default function SelectAddress() {

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [region, setRegion] = useState({
    latitude: 20.2961,
    longitude: 85.8245,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [address, setAddress] = useState("Tap on map to select address");


  // Get user current location
  useEffect(() => {

    async function getLocation() {

      try {

        const { status } =
          await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setLoading(false);
          return;
        }

        const location =
          await Location.getCurrentPositionAsync({});

        const newRegion = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };

        setRegion(newRegion);

        await reverseGeocode(newRegion.latitude, newRegion.longitude);

        setLoading(false);

      } catch (error) {

        console.log(error);
        setLoading(false);

      }

    }

    getLocation();

  }, []);


  // Convert coordinates to address
  async function reverseGeocode(latitude: number, longitude: number) {

    try {

      const result = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (result.length > 0) {

        const place = result[0];

        const formatted = [
          place.name,
          place.street,
          place.city,
          place.region,
          place.country,
        ]
          .filter(Boolean)
          .join(", ");

        setAddress(formatted);

      }

    } catch (error) {

      console.log("Geocode error:", error);

    }

  }


  // When user taps map
  async function handleSelect(e: any) {

    const { latitude, longitude } = e.nativeEvent.coordinate;

    const newRegion = {
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    setRegion(newRegion);

    await reverseGeocode(latitude, longitude);

  }


  // Save address to Supabase
  async function saveAddress() {

    try {

      const user =
        (await supabase.auth.getUser()).data.user;

      if (!user) return;

      await updateprofile(user.id, {
        address: address,
      });

      router.back();

    } catch (error) {

      console.log(error);

    }

  }


  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }


  return (
    <View style={styles.container}>

      <MapView
        style={styles.map}
        region={region}
        onPress={handleSelect}
        showsUserLocation={true}
      >

        <Marker
          coordinate={region}
          draggable
          onDragEnd={handleSelect}
        />

      </MapView>


      <View style={styles.bottom}>

        <Text style={styles.addressText}>
          {address}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={saveAddress}
        >
          <Text style={styles.buttonText}>
            Save Address
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  map: {
    flex: 1,
  },

  bottom: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    elevation: 5,
  },

  addressText: {
    color: "#000",
    marginBottom: 10,
    fontSize: 14,
  },

  button: {
    backgroundColor: theme.colors.secondary,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

});
