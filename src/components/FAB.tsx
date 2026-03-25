import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';

export const FAB: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        bottom: 32,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
      }}
      onPress={onPress}
      accessibilityLabel="Add new habit"
      activeOpacity={0.8}
    >
      <MaterialCommunityIcons name="plus" size={28} color="#fff" />
    </TouchableOpacity>
  );
};
