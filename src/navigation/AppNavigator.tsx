import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HomeStack } from './HomeStack';
import { GalleryStack } from './GalleryStack';
import { CalendarStack } from './CalendarStack';
import { SettingsStack } from './SettingsStack';
import { useTheme } from '../constants/ThemeContext';
import { RootStackParamList } from '../types';

const Tab = createBottomTabNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const { colors } = useTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            borderTopWidth: StyleSheet.hairlineWidth,
            paddingTop: 8,
            height: 88,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textTertiary,
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
            marginTop: 4,
          },
        }}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name="home" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="GalleryTab"
          component={GalleryStack}
          options={{
            tabBarLabel: 'Discover',
            tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name="compass-outline" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="CalendarTab"
          component={CalendarStack}
          options={{
            tabBarLabel: 'Calendar',
            tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name="calendar-month" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="SettingsTab"
          component={SettingsStack}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name="cog-outline" size={size} color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
