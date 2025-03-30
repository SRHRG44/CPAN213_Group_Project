
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, ImageBackground, ScrollView } from 'react-native';
import { globalStyles } from '../shared/globalStyles';

const SpaceDataScreen = () => {
  const [spaceNews, setSpaceNews] = useState([]);
  const [astronomyData, setAstronomyData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSpaceNews = async () => {
    try {
      console.log("Fetching Space News...");
      const response = await fetch("https://api.spaceflightnewsapi.net/v3/articles");
      console.log("Space News Response Status:", response.status);
      const text = await response.text();
      console.log("Raw Space News Response:", text);
      setSpaceNews(JSON.parse(text));
    } catch (error) {
      console.error("Error fetching space news:", error);
    }
  };

  const fetchAstronomyData = async () => {
    try {
      console.log("Fetching Astronomy Data...");
      const response = await fetch("https://api.arcsecond.io/activities/");
      console.log("Astronomy Data Response Status:", response.status);
      const text = await response.text();
      console.log("Raw Astronomy Data Response:", text);
      setAstronomyData(JSON.parse(text).results);
    } catch (error) {
      console.error("Error fetching astronomy data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchSpaceNews();
      await fetchAstronomyData();
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <ImageBackground source={require('../assets/space2.jpg')} style={globalStyles.backgroundImage}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={globalStyles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="white" />
            ) : (
                <>
                    <Text style={[globalStyles.text, globalStyles.header]}>Space News:</Text>
                    <FlatList
                        data={spaceNews}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={globalStyles.item}>
                                <Text style={globalStyles.text}>{item.title}</Text>
                                <Text style={globalStyles.text}>{item.summary}</Text>
                            </View>
                        )}
                    />
                    <Text style={[globalStyles.text, globalStyles.header]}>Astronomy Activities:</Text>
                    <FlatList
                        data={astronomyData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={globalStyles.item}>
                                <Text style={globalStyles.text}>{item.name}</Text>
                                <Text style={globalStyles.text}>{item.description}</Text>
                            </View>
                        )}
                    />
                </>
            )}
        </View>
        </ScrollView>
    </ImageBackground>
);
};

export default SpaceDataScreen;