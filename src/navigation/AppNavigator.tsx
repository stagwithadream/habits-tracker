import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { HomeStack } from './HomeStack';
import { CalendarStack } from './CalendarStack';
import { useTheme } from '../constants/ThemeContext';
import { RootStackParamList } from '../types';

const Tab = createBottomTabNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const { colors, borderRadius } = useTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            borderTopWidth: 1,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
        }}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => <Text style={{ fontSize: size, color }}>🏠</Text>,
          }}
        />
        <Tab.Screen
          name="CalendarTab"
          component={CalendarStack}
          options={{
            tabBarLabel: 'Calendar',
            tabBarIcon: ({ color, size }) => <Text style={{ fontSize: size, color }}>📅</Text>,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
