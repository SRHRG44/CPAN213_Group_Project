import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SpaceDataScreen from '../screens/spaceDataScreen';
import RocketDataScreen from '../screens/rocketDataScreen';
import EventCalendarScreen from '../screens/eventCalendarScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
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
    );
};

export default AppNavigator;