
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

const RocketDataScreen = () => {
  const [latestLaunch, setLatestLaunch] = useState(null);
  const [issLocation, setIssLocation] = useState(null);
  const [astronauts, setAstronauts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLatestLaunch = async () => {
    try {
      console.log("Fetching Latest Launch...");
      const response = await fetch("https://api.spacexdata.com/v5/launches/latest");
      console.log("Latest Launch Response Status:", response.status);
      const text = await response.text();
      console.log("Raw Latest Launch Response:", text);
      setLatestLaunch(JSON.parse(text));
    } catch (error) {
      console.error("Error fetching latest launch:", error);
    }
  };

  const fetchIssLocation = async () => {
    try {
      console.log("Fetching ISS Location...");
      const response = await fetch("http://api.open-notify.org/iss-now.json");
      console.log("ISS Location Response Status:", response.status);
      const text = await response.text();
      console.log("Raw ISS Location Response:", text);
      setIssLocation(JSON.parse(text).iss_position);
    } catch (error) {
      console.error("Error fetching ISS location:", error);
    }
  };

  const fetchAstronauts = async () => {
    try {
      console.log("Fetching Astronauts...");
      const response = await fetch("http://api.open-notify.org/astros.json");
      console.log("Astronauts Response Status:", response.status);
      const text = await response.text();
      console.log("Raw Astronauts Response:", text);
      setAstronauts(JSON.parse(text).people);
    } catch (error) {
      console.error("Error fetching astronauts:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchLatestLaunch();
      await fetchIssLocation();
      await fetchAstronauts();
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          {latestLaunch && (
            <View>
              <Text>Mission: {latestLaunch.name}</Text>
              <Text>Date: {latestLaunch.date_utc}</Text>
              <Text>Success: {latestLaunch.success ? "Yes" : "No"}</Text>
            </View>
          )}
          {issLocation && (
            <View>
              <Text>ISS Location:</Text>
              <Text>Latitude: {issLocation.latitude}</Text>
              <Text>Longitude: {issLocation.longitude}</Text>
            </View>
          )}
          <Text>Astronauts in Space:</Text>
          {astronauts.map((astronaut, index) => (
            <View key={index}>
              <Text>{astronaut.name} - {astronaut.craft}</Text>
            </View>
          ))}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#222" },
  header: { fontSize: 20, fontWeight: "bold", color: "#fff", marginBottom: 10 },
  item: { color: "#ddd", padding: 5, borderBottomWidth: 1, borderBottomColor: "#555" },
});

export default RocketDataScreen;
