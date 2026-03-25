import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { GalleryScreen } from '../screens/GalleryScreen';

const Stack = createStackNavigator();

export const GalleryStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Gallery" component={GalleryScreen} />
  </Stack.Navigator>
);
