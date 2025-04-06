import React from 'react';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AppNavigator from './nav/AppNavigator';






export default function App() {
  console.log("Store from App.js:", store); // Add this line
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
      <NavigationIndependentTree>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
        </NavigationIndependentTree>
      </Provider>
    </GestureHandlerRootView>
  );
}