
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";

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
    <View>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Text>Space News:</Text>
          <FlatList
            data={spaceNews}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View>
                <Text>{item.title}</Text>
                <Text>{item.summary}</Text>
              </View>
            )}
          />
          <Text>Astronomy Activities:</Text>
          <FlatList
            data={astronomyData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View>
                <Text>{item.name}</Text>
                <Text>{item.description}</Text>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#111" },
  header: { fontSize: 20, fontWeight: "bold", color: "#fff", marginBottom: 10 },
  item: { color: "#ddd", padding: 5, borderBottomWidth: 1, borderBottomColor: "#333" },
});

export default SpaceDataScreen;