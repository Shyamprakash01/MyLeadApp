import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import { AppState, View, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Button, Text } from "react-native-paper";
import { useLeads } from "../context/LeadsContext";
import haversine from "../utils/geo";

export default function Task4_LocationScreen() {
  const [pos, setPos] = useState(null);
  const { leads } = useLeads();
  const [nearest, setNearest] = useState(null);
  const locationWatcher = useRef(null);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    (async () => {
      // Request permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Location permission is required to show your position.");
        return;
      }

      // Ensure services are enabled
      const servicesEnabled = await Location.hasServicesEnabledAsync();
      if (!servicesEnabled) {
        alert("Enable location services in your device settings.");
        return;
      }

      // Start watching location
      locationWatcher.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 10000, // update every 10s
          distanceInterval: 10, // or every 10 meters
        },
        (loc) => {
          handleNewPosition(loc.coords);
        }
      );
    })();

    const sub = AppState.addEventListener("change", (next) => {
      appState.current = next;
    });

    return () => {
      if (locationWatcher.current) {
        locationWatcher.current.remove();
      }
      sub.remove();
    };
  }, []);

  const handleNewPosition = (coords) => {
    setPos(coords);

    // find nearest lead
    let min = Infinity,
      best = null;
    for (const l of leads) {
      const d = haversine(coords.latitude, coords.longitude, l.lat, l.lon);
      if (d < min) {
        min = d;
        best = { ...l, distance: d };
      }
    }
    setNearest(best);
  };

  const fetchLocationOnce = async () => {
    try {
      const servicesEnabled = await Location.hasServicesEnabledAsync();
      if (!servicesEnabled) {
        alert("Enable location services in your device settings.");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      handleNewPosition(loc.coords);
    } catch (e) {
      console.error("Location fetch error:", e);
      alert(
        "Unable to get location. Make sure location is enabled on your device."
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 12 }}>
        <Button mode="contained" onPress={fetchLocationOnce}>
          Refresh Location
        </Button>
        <Text style={{ marginTop: 8 }}>
          Nearest:{" "}
          {nearest
            ? `${nearest.name} (${Math.round(nearest.distance)} m)`
            : "—"}
        </Text>
      </View>

      {pos ? (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: pos.latitude,
            longitude: pos.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          <Marker
            coordinate={{ latitude: pos.latitude, longitude: pos.longitude }}
            title="You"
          />
          {nearest && (
            <Marker
              coordinate={{ latitude: nearest.lat, longitude: nearest.lon }}
              title={nearest.name}
              pinColor="green"
            />
          )}
        </MapView>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Waiting for location…</Text>
        </View>
      )}
    </View>
  );
}
