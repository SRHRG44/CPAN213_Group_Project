
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image, ImageBackground, ScrollView } from 'react-native';
import { globalStyles } from '../shared/globalStyles';

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
      // console.log("Raw Sun Times Response:", text);
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
      // console.log("Raw Space Events Response:", text);
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
    <ImageBackground source={require('../assets/night-moon-galaxy-space.jpg')} style={globalStyles.backgroundImage}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={globalStyles.container}>
                {loading ? (
                    <ActivityIndicator size="large" color="white" />
                ) : (
                    <>
                        {sunTimes && (
                            <View style={{ alignItems: 'center', marginBottom: 20 }}>
                                <View style={{ alignItems: 'center', marginBottom: 10 }}>
                                    <Image source={require('../assets/icons/sunrise.png')} style={{ width: 200, height: 200 }} />
                                    <Text style={globalStyles.text}>Sunrise: {sunTimes.sunrise}</Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Image source={require('../assets/icons/sunset.png')} style={{ width: 200, height: 200 }} />
                                    <Text style={globalStyles.text}>Sunset: {sunTimes.sunset}</Text>
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