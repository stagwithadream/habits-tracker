import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CalendarScreen } from '../screens/CalendarScreen';
import { CalendarStackParamList } from '../types';

const Stack = createStackNavigator<CalendarStackParamList>();

export const CalendarStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Calendar" component={CalendarScreen} />
  </Stack.Navigator>
);
