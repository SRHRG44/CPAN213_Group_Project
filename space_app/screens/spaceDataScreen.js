import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, ActivityIndicator, ImageBackground, Image, Animated, TouchableOpacity } from 'react-native';
import { globalStyles } from '../shared/globalStyles';
import NASA_API_KEY from '../config/ApiKey';

const SpaceDataScreen = () => {
    const [spaceNews, setSpaceNews] = useState([]);
    const [apodData, setApodData] = useState(null);
    const [loading, setLoading] = useState(true);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const NASA_API_KEY = 'YOUR_NASA_API_KEY';

    const fetchApodData = async () => {
      try {
          console.log("Fetching APOD Data...");
          const url = `https://api.nasa.gov/planetary/apod?api_key=PN3Ocg7wHH9qSt4XPELPVW71Zf524b3NWoLF37oj`;;
          console.log("Fetching APOD URL:", url);
          const response = await fetch(url);
          console.log("APOD Data Response Status:", response.status);
          const data = await response.json();
          // console.log("APOD Data:", data);
          setApodData(data);
      } catch (error) {
          console.error("Error fetching APOD data:", error);
      } finally {
          setLoading(false);
      }
  };

    const fetchSpaceNews = async () => {
        try {
            console.log("Fetching Solar System Data...");
            const response = await fetch("https://api.le-systeme-solaire.net/rest/bodies/");
            console.log("Solar System Data Response Status:", response.status);
            const text = await response.text();
            // console.log("Raw Solar System Data Response:", text);
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
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };

    return (
        <ImageBackground source={require('../assets/space2.jpg')} style={globalStyles.backgroundImage}>
            <View style={globalStyles.container}>
                {loading ? (
                    <ActivityIndicator size="large" color="white" />
                ) : (
                    <FlatList
                        data={spaceNews}
                        keyExtractor={(item) => item.id}
                        ListHeaderComponent={() => (
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
                                        {apodData.media_type === 'video' && (
                                            <Text style={globalStyles.text}>Video: {apodData.url}</Text>
                                        )}
                                        {apodData.media_type !== 'image' && apodData.media_type !== 'video' && (
                                            <Text style={globalStyles.text}>Media type not supported</Text>
                                        )}
                                        <Text style={globalStyles.text}>{apodData.explanation}</Text>
                                        <Text style={globalStyles.text}>Date: {apodData.date}</Text>
                                    </View>
                                )}
                                <View style={{ height: 1, backgroundColor: 'white', marginVertical: 20 }} />
                                <Text style={[globalStyles.text, globalStyles.header]}>Object Soraing through our Solar System:</Text>
                            </>
                        )}
                        renderItem={({ item }) => (
                            <View style={globalStyles.item}>
                                <Text style={globalStyles.text}>{item.englishName}</Text>
                                <Text style={globalStyles.text}>Mass: {item.mass ? `${item.mass.massValue} x 10^${item.mass.massExponent} kg` : 'N/A'}</Text>
                            </View>
                        )}
                    />
                )}
            </View>
        </ImageBackground>
    );
};

export default SpaceDataScreen;