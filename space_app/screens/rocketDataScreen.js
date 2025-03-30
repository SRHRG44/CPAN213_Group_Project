
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ImageBackground, ScrollView } from 'react-native';
import { globalStyles } from '../shared/globalStyles';

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
    <ImageBackground source={require('../assets/rocket.jpg')} style={globalStyles.backgroundImage}>
         <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
         <View style={globalStyles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="white" />
            ) : (
                <>
                    {latestLaunch && (
                        <View style={globalStyles.item}>
                            <Text style={globalStyles.text}>Mission: {latestLaunch.name}</Text>
                            <Text style={globalStyles.text}>Date: {latestLaunch.date_utc}</Text>
                            <Text style={globalStyles.text}>Success: {latestLaunch.success ? 'Yes' : 'No'}</Text>
                        </View>
                    )}
                    {issLocation && (
                        <View style={globalStyles.item}>
                            <Text style={[globalStyles.text, globalStyles.header]}>ISS Location:</Text>
                            <Text style={globalStyles.text}>Latitude: {issLocation.latitude}</Text>
                            <Text style={globalStyles.text}>Longitude: {issLocation.longitude}</Text>
                        </View>
                    )}
                    <Text style={[globalStyles.text, globalStyles.header]}>Astronauts in Space:</Text>
                    {astronauts.map((astronaut, index) => (
                        <View key={index} style={globalStyles.item}>
                            <Text style={globalStyles.text}>{astronaut.name} - {astronaut.craft}</Text>
                        </View>
                    ))}
                </>
            )}
       </View>
            </ScrollView>
        </ImageBackground>
);
};

export default RocketDataScreen;