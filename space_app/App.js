import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AppNavigator from './nav/AppNavigator';

export default function App() {
  console.log("Store from App.js:", store); // Add this line
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}