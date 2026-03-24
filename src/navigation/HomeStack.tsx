import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { HabitDetailScreen } from '../screens/HabitDetailScreen';
import { AddHabitScreen } from '../screens/AddHabitScreen';
import { HomeStackParamList } from '../types';

const Stack = createStackNavigator<HomeStackParamList>();

export const HomeStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="HabitDetail" component={HabitDetailScreen} />
    <Stack.Screen name="AddHabit" component={AddHabitScreen} options={{ presentation: 'modal' }} />
  </Stack.Navigator>
);
