import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image, ImageBackground, ScrollView } from 'react-native';
import { globalStyles } from '../shared/globalStyles';
import moment from 'moment-timezone';

const EventCalendarScreen = () => {
  const [sunTimes, setSunTimes] = useState(null);
  const [spaceEvents, setSpaceEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);

  const fetchLocation = async () => {
    try {
      console.log("Fetching Location...");
      const response = await fetch("https://get.geojs.io/v1/ip/geo.json");
      console.log("Location Response Status:", response.status);
      const data = await response.json();
      setLocation(data);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const fetchSunTimes = async () => {
    try {
        if (location) {
            console.log("Fetching Sunrise/Sunset Times...");
            const response = await fetch(
                `https://api.sunrisesunset.io/json?lat=${location.latitude}&lng=${location.longitude}&timezone=UTC&date=today`
            );
            console.log("Sun Times Response Status:", response.status);
            const data = await response.json();
            const sunriseUTC = data.results.sunrise;
            const sunsetUTC = data.results.sunset;
            const sunriseLocal = moment.utc(sunriseUTC, 'hh:mm:ss A').tz(location.timezone).format('hh:mm:ss A');
            const sunsetLocal = moment.utc(sunsetUTC, 'hh:mm:ss A').tz(location.timezone).format('hh:mm:ss A');

            setSunTimes({
                sunrise: sunriseLocal,
                sunset: sunsetLocal,
            });
        }
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
      setSpaceEvents(JSON.parse(text).results);
    } catch (error) {
      console.error("Error fetching space events:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchLocation();
      await fetchSpaceEvents();
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (location) {
      fetchSunTimes();
    }
  }, [location]);

  return (
    <ImageBackground source={require('../assets/night-moon-galaxy-space.jpg')} style={globalStyles.backgroundImage}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={globalStyles.container}>
          {loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <>
              {sunTimes && location && (
                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                  <View style={{ alignItems: 'center', marginBottom: 10 }}>
                    <Image source={require('../assets/icons/sunrise.png')} style={{ width: 200, height: 200 }} />
                    <Text style={globalStyles.text}>Sunrise: {sunTimes.sunrise}</Text>
                    <Text style={globalStyles.text}>
                      Location: {location.city}, {location.country}
                    </Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Image source={require('../assets/icons/sunset.png')} style={{ width: 200, height: 200 }} />
                    <Text style={globalStyles.text}>Sunset: {sunTimes.sunset}</Text>
                    <Text style={globalStyles.text}>
                      Location: {location.city}, {location.country}
                    </Text>
                  </View>
                </View>
              )}
              <Text style={[globalStyles.text, globalStyles.header]}>Space Events:</Text>
              {spaceEvents.map((event, index) => (
                <View key={index} style={globalStyles.item}>
                  <Text style={globalStyles.text}>{event.name}</Text>
                  <Text style={globalStyles.text}>{event.description}</Text>
                </View>
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default EventCalendarScreen;