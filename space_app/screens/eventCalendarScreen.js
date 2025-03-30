
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Image } from "react-native";

const EventCalendarScreen = () => {
  const [sunTimes, setSunTimes] = useState(null);
  const [spaceEvents, setSpaceEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSunTimes = async () => {
    try {
      console.log("Fetching Sunrise/Sunset Times...");
      const response = await fetch("https://api.sunrisesunset.io/json?lat=38.907192&lng=-77.036873&timezone=UTC&date=today");
      console.log("Sun Times Response Status:", response.status);
      const text = await response.text();
      console.log("Raw Sun Times Response:", text);
      setSunTimes(JSON.parse(text).results);
    } catch (error) {
      console.error("Error fetching sun times:", error);
    }
  };

  const fetchSpaceEvents = async () => {
    try {
      console.log("Fetching Space Events...");
      const response = await fetch("https://ll.thespacedevs.com/2.2.0/agencies/?limit=10");
      console.log("Space Events Response Status:", response.status);
      const text = await response.text();
      console.log("Raw Space Events Response:", text);
      setSpaceEvents(JSON.parse(text).results);
    } catch (error) {
      console.error("Error fetching space events:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchSunTimes();
      await fetchSpaceEvents();
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
          {sunTimes && (
            <View style={styles.sunTimesContainer}>
              <View style={styles.sunTimeItem}>
                <Image source={require('../assets/icons/sunrise.png')} style={styles.icon} />
                <Text>Sunrise: {sunTimes.sunrise}</Text>
              </View>
              <View style={styles.sunTimeItem}>
                <Image source={require('../assets/icons/sunset.png')} style={styles.icon} />
                <Text>Sunset: {sunTimes.sunset}</Text>
              </View>
            </View>
          )}
          <Text>Space Events:</Text>
          {spaceEvents.map((event, index) => (
            <View key={index}>
              <Text>{event.name}</Text>
              <Text>{event.description}</Text>
            </View>
          ))}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#333" },
  header: { fontSize: 20, fontWeight: "bold", color: "#fff", marginBottom: 10 },
  item: { color: "#ddd", padding: 5, borderBottomWidth: 1, borderBottomColor: "#666" },
  sunTimesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  sunTimeItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30, // Adjust the size as needed
    height: 30, // Adjust the size as needed
    marginRight: 5,
  },
});

export default EventCalendarScreen;