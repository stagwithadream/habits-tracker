import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';

export const EmptyState: React.FC = () => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 80 }}>
      <View style={{
        width: 80, height: 80, borderRadius: 24,
        backgroundColor: colors.primary + '15',
        alignItems: 'center', justifyContent: 'center',
        marginBottom: 20,
      }}>
        <MaterialCommunityIcons name="sprout" size={40} color={colors.primary} />
      </View>
      <Text style={{ fontSize: 20, fontWeight: '700', color: colors.text, marginBottom: 8 }}>
        Start a new habit
      </Text>
      <Text style={{ fontSize: 14, color: colors.textSecondary, textAlign: 'center', lineHeight: 20, paddingHorizontal: 40 }}>
        Tap the + button to create your first habit and begin tracking your progress
      </Text>
    </View>
  );
};
