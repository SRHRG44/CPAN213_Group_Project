import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, ActivityIndicator, ImageBackground, Image, Animated, TouchableOpacity } from 'react-native';
import { globalStyles } from '../shared/globalStyles';
import { ScrollView } from 'react-native-gesture-handler';


const SpaceDataScreen = () => {
  const [spaceNews, setSpaceNews] = useState([]);
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity 0

  const NASA_API_KEY = '69p4hnb5q7DjKCUQRE129Ahukdn7IZoj2Ifu67vM';

  const fetchApodData = async () => {
      try {
          console.log("Fetching APOD Data...");
          const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`);
          console.log("APOD Data Response Status:", response.status);
          const text = await response.text();
          console.log("Raw APOD Data Response:", text);
          const data = JSON.parse(text);
          setApodData(data);
      } catch (error) {
          console.error("Error fetching APOD data:", error);
      }
  };

  const fetchSpaceNews = async () => {
      try {
          console.log("Fetching Solar System Data...");
          const response = await fetch("https://api.le-systeme-solaire.net/rest/bodies/");
          console.log("Solar System Data Response Status:", response.status);
          const text = await response.text();
          console.log("Raw Solar System Data Response:", text);
          const data = JSON.parse(text);
          if (data && data.bodies) {
              setSpaceNews(data.bodies);
          } else {
              setSpaceNews([]);
          }
      } catch (error) {
          console.error("Error fetching solar system data:", error);
      }
  };

  useEffect(() => {
      const fetchData = async () => {
          await fetchApodData();
          await fetchSpaceNews();
          setLoading(false);
      };
      fetchData();
  }, []);

  const handleImagePress = () => {
      Animated.timing(fadeAnim, {
          toValue: 1, // Fade in
          duration: 1000, // 1 second
          useNativeDriver: true,
      }).start();
  };

  return (
    <ImageBackground source={require('../assets/space2.jpg')} style={globalStyles.backgroundImage}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={globalStyles.container}>
                {loading ? (
                    <ActivityIndicator size="large" color="white" />
                ) : (
                    <>
                        {apodData && (
                            <View>
                                <Text style={[globalStyles.text, globalStyles.header]}>{apodData.title}</Text>
                                {apodData.media_type === 'image' && (
                                    <TouchableOpacity onPress={handleImagePress}>
                                        <Animated.Image
                                            source={{ uri: apodData.url }}
                                            style={{ width: '100%', height: 300, resizeMode: 'contain', opacity: fadeAnim }}
                                        />
                                    </TouchableOpacity>
                                )}
                                <Text style={globalStyles.text}>{apodData.explanation}</Text>
                                <Text style={globalStyles.text}>Date: {apodData.date}</Text>
                            </View>
                        )}

                        <View style={{ height: 1, backgroundColor: 'white', marginVertical: 20 }} />

                        <Text style={[globalStyles.text, globalStyles.header]}>Objects Observed in our Solar System:</Text>
                        <FlatList
                            data={spaceNews}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View style={globalStyles.item}>
                                    <Text style={globalStyles.text}>{item.englishName}</Text>
                                    <Text style={globalStyles.text}>Mass: {item.mass ? `${item.mass.massValue} x 10^${item.mass.massExponent} kg` : 'N/A'}</Text>
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