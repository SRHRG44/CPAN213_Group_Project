import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { globalStyles } from '../shared/globalStyles'; // Import global styles

const DetailsScreen = () => {
  const route = useRoute();
  const { item } = route.params || {};

  if (!item) {
    return (
      <ImageBackground source={require('../assets/space_background.jpg')} style={globalStyles.backgroundImage}>
        <View style={globalStyles.container}>
          <Text style={[globalStyles.text, { color: 'red' }]}>No details available.</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={require('../assets/space_background.jpg')} style={globalStyles.backgroundImage}>
      <ScrollView style={{ flex: 1 }}>
        <View style={globalStyles.container}>
          <Text style={[globalStyles.text, globalStyles.header]}>{item.title || item.name}</Text>
          {item.description && <Text style={[globalStyles.text, { marginBottom: 15 }]}>{item.description}</Text>}

          <View style={{ marginTop: 10 }}>
            {item.mission_name && <Text style={[globalStyles.text, globalStyles.item]}><Text style={{ fontWeight: 'bold' }}>Mission:</Text> {item.mission_name}</Text>}
            {item.success !== undefined && (
              <Text style={[globalStyles.text, globalStyles.item]}><Text style={{ fontWeight: 'bold' }}>Launch Status:</Text> {item.success ? 'Successful' : 'Failed'}</Text>
            )}
            {item.rocket?.name && <Text style={[globalStyles.text, globalStyles.item]}><Text style={{ fontWeight: 'bold' }}>Rocket:</Text> {item.rocket.name}</Text>}
            {item.launchpad?.full_name && <Text style={[globalStyles.text, globalStyles.item]}><Text style={{ fontWeight: 'bold' }}>Launch Site:</Text> {item.launchpad.full_name}</Text>}
            {item.date_utc && <Text style={[globalStyles.text, globalStyles.item]}><Text style={{ fontWeight: 'bold' }}>Launch Date:</Text> {new Date(item.date_utc).toLocaleDateString()}</Text>}
            {item.agency?.name && <Text style={[globalStyles.text, globalStyles.item]}><Text style={{ fontWeight: 'bold' }}>Agency:</Text> {item.agency.name}</Text>}
            {item.type && <Text style={[globalStyles.text, globalStyles.item]}><Text style={{ fontWeight: 'bold' }}>Type:</Text> {item.type}</Text>}
            {item.date && <Text style={[globalStyles.text, globalStyles.item]}><Text style={{ fontWeight: 'bold' }}>Event Date:</Text> {new Date(item.date).toLocaleDateString()}</Text>}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default DetailsScreen;