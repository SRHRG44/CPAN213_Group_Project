import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SpaceDataScreen from './screens/spaceDataScreen.js';
import RocketDataScreen from './screens/rocketDataScreen.js';
import EventCalendarScreen from './screens/eventCalendarScreen.js';
import DetailsScreen from './screens/detailsScreen.js';
import store from './redux/store';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    //     <Provider store={store}>
    //   <NavigationContainer>
    //     <Stack.Navigator initialRouteName="SpaceData">
    //       <Stack.Screen name="SpaceData" component={SpaceDataScreen} />
    //       <Stack.Screen name="RocketData" component={RocketDataScreen} />
    //       <Stack.Screen name="EventCalendar" component={EventCalendarScreen} />
    //       <Stack.Screen name="Details" component={DetailsScreen} />
    //     </Stack.Navigator>
    //   </NavigationContainer>
    // </Provider>
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Space Data') {
              iconName = focused ? 'planet' : 'planet-outline';
            } else if (route.name === 'Rocket Data') {
              iconName = focused ? 'rocket' : 'rocket-outline';
            } else if (route.name === 'Events') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
          <Tab.Screen name="Space Data" component={SpaceDataScreen} />
          <Tab.Screen name="Rocket Data" component={RocketDataScreen} />
          <Tab.Screen name="Events" component={EventCalendarScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>

  );
};

export default App;